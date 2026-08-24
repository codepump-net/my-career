/*
 * 포트폴리오 영상 렌더 — spec.json → ffmpeg
 *
 *   node tools/video/render.js                  spec.json 의 모든 영상을 만든다
 *   node tools/video/render.js --only tfr-gameplay
 *   node tools/video/render.js --dry-run        ffmpeg 를 실행하지 않고 명령만 출력
 *   node tools/video/render.js --spec other.json
 *
 * 하는 일 — 원본 여러 개를 한 규격으로 맞춰 잇고, 앞뒤에 카드를 붙이고, 자막을 굽는다.
 *   · 각 컷: trim → 1920x1080 안에 맞춤(비율 유지, 여백 패딩) → 30fps → 자막(있으면) → 배속(있으면)
 *   · 타이틀/엔드 카드: 단색 배경 + 텍스트
 *   · concat → H.264 CRF 20 → faststart
 *   · 기본 무음. music 이 있으면 전체에 깔고 끝에서 자른다.
 *
 * 텍스트는 파일로 넘긴다(drawtext=textfile=). 콜론·따옴표 이스케이프 문제를 피하기 위해서다.
 * 명령은 배열로 만들어 spawnSync 에 넘긴다 — 셸 인용 문제가 없다.
 *
 * 안내: docs/applications/overdare-portfolio-video.md 5절
 */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..', '..');
const args = process.argv.slice(2);
const DRY = args.includes('--dry-run');
const only = valueOf('--only');
const specPath = path.resolve(ROOT, valueOf('--spec') || 'tools/video/spec.json');

function valueOf(flag) {
    const i = args.indexOf(flag);
    return i !== -1 ? args[i + 1] : null;
}

/* ------------------------------------------------------------ 기본값 */

const DEFAULTS = {
    width: 1920,
    height: 1080,
    fps: 30,
    crf: 20,
    background: '#14171b',
    fontfile: 'C:/Windows/Fonts/malgun.ttf',
    intro: { seconds: 2.5, titleSize: 72, subtitleSize: 36 },
    outro: { seconds: 2, titleSize: 44 },
    caption: { size: 40, marginBottom: 120 }
};

/* -------------------------------------------------------------- 유틸 */

/* '12', '1:03', '0:01:03' → 초 */
function toSeconds(value) {
    if (typeof value === 'number') return value;
    const parts = String(value).split(':').map(Number);
    if (parts.some(Number.isNaN)) throw new Error(`시간 형식이 아니다: ${value}`);
    return parts.reduce((acc, part) => acc * 60 + part, 0);
}

/* ffmpeg 필터 안에서 경로의 콜론과 백슬래시를 이스케이프한다. */
function filterPath(p) {
    return p.replace(/\\/g, '/').replace(/:/g, '\\:');
}

let tmpDir = null;
let tmpCount = 0;

/* drawtext 에 넘길 텍스트 파일. 이스케이프 없이 어떤 문자든 쓸 수 있다. */
function textFile(text) {
    if (!tmpDir) tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cv-video-'));
    const file = path.join(tmpDir, `t${++tmpCount}.txt`);
    fs.writeFileSync(file, text, 'utf8');
    return filterPath(file);
}

function drawtext(text, options) {
    const parts = [
        `fontfile='${filterPath(options.fontfile)}'`,
        `textfile='${textFile(text)}'`,
        `fontsize=${options.size}`,
        `fontcolor=${options.color || 'white'}`,
        `x=${options.x || '(w-text_w)/2'}`,
        `y=${options.y}`
    ];
    if (options.box) parts.push('box=1', `boxcolor=${options.box}`, `boxborderw=${options.boxPad || 18}`);
    return 'drawtext=' + parts.join(':');
}

/* ----------------------------------------------------- 필터 체인 조립 */

/* 단색 카드. 입력 없이 필터 안에서 생성한다. */
function cardChain(label, card, kind, cfg) {
    const d = DEFAULTS[kind];
    const seconds = card.seconds || d.seconds;
    const chain = [`color=c=${cfg.background}:s=${cfg.width}x${cfg.height}:d=${seconds}:r=${cfg.fps}`];

    if (kind === 'intro') {
        const hasSub = !!card.subtitle;
        chain.push(drawtext(card.title, {
            fontfile: cfg.fontfile, size: card.titleSize || d.titleSize,
            y: hasSub ? '(h-text_h)/2-50' : '(h-text_h)/2'
        }));
        if (hasSub) {
            chain.push(drawtext(card.subtitle, {
                fontfile: cfg.fontfile, size: card.subtitleSize || d.subtitleSize,
                color: '#a8b0ba', y: '(h-text_h)/2+50'
            }));
        }
    } else {
        chain.push(drawtext(card.title, {
            fontfile: cfg.fontfile, size: card.titleSize || d.titleSize,
            color: '#a8b0ba', y: '(h-text_h)/2'
        }));
    }
    return chain.join(',') + `[${label}]`;
}

/* 원본 한 컷. 입력 인덱스 i 의 영상 스트림을 규격에 맞춘다. */
function clipChain(i, label, clip, cfg) {
    const start = toSeconds(clip.in || 0);
    const end = clip.out !== undefined ? toSeconds(clip.out) : null;
    const trim = end !== null ? `trim=start=${start}:end=${end}` : `trim=start=${start}`;

    const chain = [
        `[${i}:v]${trim}`,
        'setpts=PTS-STARTPTS',
        `scale=${cfg.width}:${cfg.height}:force_original_aspect_ratio=decrease`,
        `pad=${cfg.width}:${cfg.height}:(ow-iw)/2:(oh-ih)/2:color=${cfg.background}`,
        `fps=${cfg.fps}`,
        'setsar=1'
    ];

    // 배속은 잘라낸 뒤에 — 워크스루의 에이전트 작업 구간용. 1이면 생략.
    if (clip.speed && clip.speed !== 1) chain.push(`setpts=PTS/${clip.speed}`);

    if (clip.caption) {
        chain.push(drawtext(clip.caption, {
            fontfile: cfg.fontfile, size: cfg.caption.size,
            y: `h-${cfg.caption.marginBottom}-text_h`,
            box: 'black@0.55', boxPad: 18
        }));
    }
    return chain.join(',') + `[${label}]`;
}

/* ------------------------------------------------------- 명령 조립 */

function buildCommand(item) {
    const cfg = Object.assign({}, DEFAULTS, item, {
        caption: Object.assign({}, DEFAULTS.caption, item.captionStyle || {})
    });

    if (!item.output) throw new Error('output 이 없다');
    if (!Array.isArray(item.clips) || !item.clips.length) throw new Error(`${item.output}: clips 가 비었다`);

    const inputs = [];
    const filters = [];
    const order = [];

    item.clips.forEach((clip, i) => {
        const src = path.resolve(ROOT, clip.src);
        if (!DRY && !fs.existsSync(src)) throw new Error(`${item.output}: 원본 없음 ${clip.src}`);
        inputs.push('-i', src);
    });

    if (item.intro) {
        filters.push(cardChain('intro', item.intro, 'intro', cfg));
        order.push('intro');
    }
    item.clips.forEach((clip, i) => {
        filters.push(clipChain(i, `c${i}`, clip, cfg));
        order.push(`c${i}`);
    });
    if (item.outro) {
        filters.push(cardChain('outro', item.outro, 'outro', cfg));
        order.push('outro');
    }

    filters.push(order.map((l) => `[${l}]`).join('') + `concat=n=${order.length}:v=1:a=0[out]`);

    const cmd = ['-y', ...inputs];
    let mapAudio = [];

    if (item.music) {
        const music = path.resolve(ROOT, item.music);
        if (!DRY && !fs.existsSync(music)) throw new Error(`${item.output}: 음악 없음 ${item.music}`);
        // 음악은 마지막 입력. 영상 길이에 맞춰 반복하고 끝에서 자른다.
        cmd.push('-stream_loop', '-1', '-i', music);
        mapAudio = ['-map', `${item.clips.length}:a`, '-c:a', 'aac', '-b:a', '160k', '-shortest'];
    } else {
        mapAudio = ['-an'];
    }

    cmd.push(
        '-filter_complex', filters.join(';'),
        '-map', '[out]',
        ...mapAudio,
        '-c:v', 'libx264', '-preset', 'medium', '-crf', String(cfg.crf),
        '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
        path.resolve(ROOT, item.output)
    );
    return cmd;
}

/* ---------------------------------------------------------------- 실행 */

function hasFfmpeg() {
    const r = spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' });
    return !r.error && r.status === 0;
}

function main() {
    if (!fs.existsSync(specPath)) {
        console.error(`spec 이 없다: ${path.relative(ROOT, specPath)}\n` +
            'tools/video/spec.example.json 을 복사해 spec.json 으로 만든다.');
        process.exit(1);
    }

    const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
    const items = (Array.isArray(spec) ? spec : spec.videos || [])
        .filter((item) => !only || path.basename(item.output, '.mp4') === only);

    if (!items.length) {
        console.error(only ? `--only ${only} 에 해당하는 항목이 없다` : 'spec 에 항목이 없다');
        process.exit(1);
    }

    if (!DRY && !hasFfmpeg()) {
        console.error('ffmpeg 가 PATH 에 없다.  winget install Gyan.FFmpeg  후 새 터미널에서 다시.');
        process.exit(1);
    }

    let failed = 0;

    for (const item of items) {
        const name = path.relative(ROOT, path.resolve(ROOT, item.output));
        let cmd;
        try {
            cmd = buildCommand(item);
        } catch (error) {
            console.log(`  [FAIL] ${name}: ${error.message}`);
            failed++;
            continue;
        }

        if (DRY) {
            console.log(`\n# ${name}`);
            console.log('ffmpeg ' + cmd.map((a) => (/[\s;\[\]]/.test(a) ? `"${a}"` : a)).join(' '));
            continue;
        }

        fs.mkdirSync(path.dirname(path.resolve(ROOT, item.output)), { recursive: true });
        process.stdout.write(`  ${name} ... `);
        const r = spawnSync('ffmpeg', cmd, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
        if (r.status === 0) {
            const kb = Math.round(fs.statSync(path.resolve(ROOT, item.output)).size / 1024);
            console.log(`ok (${kb} KB)`);
        } else {
            console.log('FAIL');
            console.log((r.stderr || '').split('\n').slice(-12).join('\n'));
            failed++;
        }
    }

    if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true });
    if (failed) { console.log(`\n실패 ${failed}건`); process.exit(1); }
    if (!DRY) console.log(`\n${items.length}건 완료`);
}

main();
