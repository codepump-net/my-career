/*
 * 정적 사이트 정합성 점검
 *
 *   node tools/check.js
 *
 * 빌드 단계가 없는 프로젝트라 컴파일러가 잡아 주는 실수가 없다. 그 자리를 이 스크립트가
 * 메운다.
 *
 * 이 사이트에는 두 가지 페이지 체계가 있다.
 *   덱  (16:9 발표용)  — /portfolio          · slides/shared/deck.js
 *   문서 (A4 세로 인쇄) — /cv, /coverletter  · paper/shared/{render,paper}.js
 *
 * 버전 하나가 폴더 하나다 — <문서>/<버전>/{index.html, version.js}. 데이터 파일들은
 * 정규식으로 훑지 않고 가짜 window 에 실제로 실행해 객체를 들여다본다 —
 * 자료 구조가 바뀌어도 점검이 같이 깨지지 않는다.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DECKS = ['portfolio'];
const PAPERS = ['cv', 'coverletter'];
const DOCS = [...DECKS, ...PAPERS];

/* <문서>/<버전>/ 폴더를 찾는다. index.html 과 version.js 를 함께 가진 폴더만 버전으로 본다. */
function versionDirs(doc) {
    const base = path.join(ROOT, doc);
    if (!fs.existsSync(base)) return [];
    return fs.readdirSync(base, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .filter((name) => fs.existsSync(path.join(base, name, 'version.js')))
        .sort();
}

const VERSION_PAGES = DOCS.flatMap((doc) => versionDirs(doc).map((v) => `${doc}/${v}/index.html`));
const PAGES = ['index.html', ...DOCS.map((dir) => `${dir}/index.html`), ...VERSION_PAGES];

let failures = 0;
const fail = (message) => { failures++; console.log(`  [FAIL] ${message}`); };
const pass = (message) => console.log(`  [ok]   ${message}`);
const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
// Archived versions use a frozen local data source.
function dataFile(doc, version) {
    const local = `${doc}/${version}/data.js`;
    return fs.existsSync(path.join(ROOT, local)) ? local : `${doc}/data.js`;
}
const matchAll = (text, pattern) => [...text.matchAll(pattern)].map((m) => m[1]);

/* HTML 주석에는 작성 안내용 예시 마크업이 들어 있다. 실제 사용으로 세면 안 된다. */
const readHtml = (file) => read(file).replace(/<!--[\s\S]*?-->/g, '');

/* 데이터/버전 파일을 가짜 window 에 실행한다. 브라우저 API 는 쓰지 않는 파일들이다. */
function runInto(win, file) {
    // eslint-disable-next-line no-new-func
    new Function('window', read(file))(win);
    return win;
}

/* 1. 로컬 자원 참조 --------------------------------------------------- */

console.log('\n[1] 로컬 자원 참조');
for (const page of PAGES) {
    const html = readHtml(page);
    const dir = path.dirname(path.join(ROOT, page));
    const refs = matchAll(html, /(?:href|src)="([^"#]+?)"/g)
        .filter((url) => !/^(https?:|mailto:|\/\/)/.test(url));

    const broken = refs.filter((ref) => {
        const target = path.resolve(dir, ref);
        return !fs.existsSync(target) && !fs.existsSync(path.join(target, 'index.html'));
    });

    broken.length
        ? fail(`${page}: 대상 없음 -> ${broken.join(', ')}`)
        : pass(`${page}: 참조 ${refs.length}건 모두 존재`);
}

/* 2. 덱 슬라이드 id 대조 ----------------------------------------------- */

console.log('\n[2] 덱 슬라이드 id 대조 (마크업 <-> DECK_VERSION.slides)');
for (const deck of DECKS) {
    const names = versionDirs(deck);

    if (!names.includes('default')) fail(`${deck}: default/ 버전이 없다`);

    const report = [];
    for (const name of names) {
        const file = `${name}/version.js`;
        const win = {};
        try {
            runInto(win, dataFile(deck, name));
            runInto(win, `${deck}/${file}`);
        } catch (error) {
            report.push(`${file} 실행 실패 -> ${error.message}`);
            continue;
        }
        const version = win.DECK_VERSION;
        if (!version) { report.push(`${file}: DECK_VERSION 이 정의되지 않았다`); continue; }

        if (version.id !== name) report.push(`${file}: id '${version.id}' 가 폴더명과 다르다`);

        const listed = (version.slides || []).map((slide) => slide.id);
        if (!listed.length) report.push(`${file}: slides 가 비었다`);

        const deckMarkup = matchAll(readHtml(`${deck}/${name}/index.html`), /data-slide="([^"]+)"/g);
        const missing = listed.filter((id) => !deckMarkup.includes(id));
        if (missing.length) report.push(`${file}: 마크업에 없는 id -> ${missing.join(', ')}`);
    }

    report.length
        ? report.forEach((line) => fail(`${deck}: ${line}`))
        : pass(`${deck}: 버전 ${names.length}개, 슬라이드 id 모두 마크업에 존재`);
}

/* 3. 덱 i18n 키 -------------------------------------------------------- */

console.log('\n[3] 덱 i18n 키');
const deckJs = read('slides/shared/deck.js');

function dictKeys(source, marker, nextMarker, indent) {
    const start = source.indexOf(marker);
    if (start === -1) return [];
    const end = nextMarker ? source.indexOf(nextMarker) : source.length;
    return matchAll(source.slice(start, end === -1 ? source.length : end),
        new RegExp(`^ {${indent}}(\\w+):`, 'gm'));
}

const deckUiBlock = deckJs.slice(deckJs.indexOf('var UI_I18N'), deckJs.indexOf('var slidesData'));
const deckUiKeys = dictKeys(deckUiBlock, 'ko: {', 'en: {', 12);

for (const deck of DECKS) {
    // 덱 마크업은 각 버전 폴더에 있다. 문구 사용처는 모든 버전을 합쳐서 본다.
    const html = versionDirs(deck).map((v) => readHtml(`${deck}/${v}/index.html`)).join('\n');
    const js = read(`${deck}/data.js`);

    const used = [...new Set(matchAll(html, /data-deck-key(?:-alt|-aria-label)?="([^"]+)"/g))];
    for (const name of versionDirs(deck)) {
        const win = {};
        runInto(win, dataFile(deck, name));
        const usedHere = matchAll(readHtml(`${deck}/${name}/index.html`), /data-deck-key(?:-alt|-aria-label)?="([^"]+)"/g);
        for (const key of usedHere) {
            if (deckUiKeys.includes(key)) continue;
            if (!win.DECK_I18N.ko[key] || !win.DECK_I18N.en[key]) {
                fail(`${deck}/${name}: loaded dictionary missing ${key}`);
            }
        }
    }

    const koKeys = dictKeys(js, '    ko: {', '    en: {', 8);
    const enKeys = dictKeys(js, '    en: {', null, 8);

    const undefinedKeys = used.filter((k) => !koKeys.includes(k) && !deckUiKeys.includes(k));
    const missingEn = koKeys.filter((k) => !enKeys.includes(k));
    const unused = koKeys.filter((k) => !used.includes(k));

    if (undefinedKeys.length) fail(`${deck}: 마크업에 쓰였으나 사전에 없음 -> ${undefinedKeys.join(', ')}`);
    if (missingEn.length) fail(`${deck}: en 번역 누락 -> ${missingEn.join(', ')}`);
    if (unused.length) fail(`${deck}: 쓰이지 않는 키 -> ${unused.join(', ')}`);
    if (!undefinedKeys.length && !missingEn.length && !unused.length) {
        pass(`${deck}: 사용 ${used.length} / ko ${koKeys.length} = en ${enKeys.length}`);
    }
}

/* 4. 문서 셸 UI 키 ----------------------------------------------------- */

console.log('\n[4] 문서 셸 UI 키 (마크업 <-> paper.js UI_I18N)');
const paperJs = read('paper/shared/paper.js');
const paperUiBlock = paperJs.slice(paperJs.indexOf('var UI_I18N'), paperJs.indexOf('var host'));
const paperUiKo = dictKeys(paperUiBlock, 'ko: {', 'en: {', 12);
const paperUiEn = dictKeys(paperUiBlock, 'en: {', null, 12);

{
    const missingEn = paperUiKo.filter((k) => !paperUiEn.includes(k));
    if (missingEn.length) fail(`paper.js UI_I18N: en 번역 누락 -> ${missingEn.join(', ')}`);
    else pass(`paper.js UI_I18N: ko ${paperUiKo.length} = en ${paperUiEn.length}`);

    for (const paper of PAPERS) {
        const html = versionDirs(paper).map((v) => readHtml(`${paper}/${v}/index.html`)).join('\n');
        const used = [...new Set(matchAll(html, /data-doc-key(?:-aria-label|-title)?="([^"]+)"/g))];
        const undefinedKeys = used.filter((k) => !paperUiKo.includes(k));
        undefinedKeys.length
            ? fail(`${paper}: UI_I18N 에 없는 키 -> ${undefinedKeys.join(', ')}`)
            : pass(`${paper}: 셸 키 ${used.length}개 모두 정의됨`);
    }
}

/* 5~6. 문서 데이터와 버전 정의 ------------------------------------------ */

/* { ko, en } 형태를 만나면 잎으로 보고 양쪽이 채워졌는지 확인한다. */
function checkI18n(node, where, report) {
    if (node === null || typeof node !== 'object') return;

    if (Array.isArray(node)) {
        node.forEach((item, i) => checkI18n(item, `${where}[${i}]`, report));
        return;
    }

    const keys = Object.keys(node);
    if (keys.includes('ko') || keys.includes('en')) {
        if (!node.ko) report.push(`${where}: ko 없음`);
        else if (!node.en) report.push(`${where}: en 없음`);
        return;
    }

    keys.forEach((key) => checkI18n(node[key], where ? `${where}.${key}` : key, report));
}

/* 아직 { guide: … } 로 남아 있는 자리 수 — 실패가 아니라 진행 상황 표시다. */
function countGuides(node) {
    if (node === null || typeof node !== 'object') return 0;
    if (Array.isArray(node)) return node.reduce((sum, item) => sum + countGuides(item), 0);
    if (node.guide !== undefined) return 1;
    return Object.keys(node).reduce((sum, key) => sum + countGuides(node[key]), 0);
}

const INLINE_BY_TYPE = { text: 'content', prose: 'paragraphs', list: 'items', cite: 'items' };

function checkVersion(data, version, where, report) {
    (version.sections || []).forEach((section, i) => {
        const at = `${where}.sections[${i}](${section.type || '?'})`;

        if (section.type === 'experience') {
            const entries = data[section.key || 'experience'] || [];
            const ids = entries.map((entry) => entry.id);

            (section.include || []).forEach((item) => {
                const spec = typeof item === 'string' ? { id: item } : item;
                if (!ids.includes(spec.id)) {
                    report.push(`${at}: data 에 없는 경력 id '${spec.id}'`);
                    return;
                }
                const entry = entries.find((e) => e.id === spec.id);
                const pointIds = (entry.points || []).map((p) => p.id);
                (spec.points || []).forEach((id) => {
                    if (!pointIds.includes(id)) {
                        report.push(`${at}: '${spec.id}' 에 없는 성과 id '${id}'`);
                    }
                });
            });
            return;
        }

        const inline = INLINE_BY_TYPE[section.type];
        if (section.type === 'closing' || !inline) return;
        if (section[inline] !== undefined) return;
        // 아직 문장을 쓰지 않고 작성 안내만 둔 절
        if (section.guide !== undefined) return;

        if (!section.key) report.push(`${at}: key 도 ${inline} 도 없다`);
        else if (data[section.key] === undefined) report.push(`${at}: data 에 없는 key '${section.key}'`);
    });
}

console.log('\n[5] 문서 데이터 다국어 (ko/en 짝)');
const loaded = {};

for (const paper of PAPERS) {
    const win = {};
    try {
        runInto(win, `${paper}/data.js`);
    } catch (error) {
        fail(`${paper}/data.js 실행 실패 -> ${error.message}`);
        continue;
    }

    const report = [];
    checkI18n(win.DOC_DATA, 'DOC_DATA', report);

    const versionFiles = versionDirs(paper);

    if (!versionFiles.includes('default')) fail(`${paper}: default/ 버전이 없다`);

    const versions = {};
    for (const file of versionFiles) {
        const scoped = Object.assign({}, win);
        try {
            runInto(scoped, dataFile(paper, file));
            checkI18n(scoped.DOC_DATA, `${file}.DOC_DATA`, report);
            runInto(scoped, `${paper}/${file}/version.js`);
        } catch (error) {
            fail(`${paper}/${file}/version.js 실행 실패 -> ${error.message}`);
            continue;
        }
        if (!scoped.DOC_VERSION) {
            fail(`${paper}/${file}/version.js: DOC_VERSION 이 정의되지 않았다`);
            continue;
        }
        versions[file] = scoped.DOC_VERSION;
        checkI18n(scoped.DOC_VERSION, `${file}`, report);
    }

    loaded[paper] = { data: win.DOC_DATA, versions };

    report.length
        ? report.forEach((line) => fail(`${paper}: ${line}`))
        : pass(`${paper}: data.js + 버전 ${versionFiles.length}개 다국어 짝 맞음`);
}

console.log('\n[6] 문서 버전 정의 정합성');
for (const paper of PAPERS) {
    const entry = loaded[paper];
    if (!entry) continue;

    const report = [];
    const ids = new Set();
    let guides = 0;

    Object.keys(entry.versions).forEach((file) => {
        const version = entry.versions[file];
        const name = file;

        // paper.js 가 id 로 기본판 여부를 판단해 noindex 를 붙인다. 폴더명과 어긋나면 안 된다.
        if (version.id !== name) report.push(`${file}/: id '${version.id}' 가 폴더명과 다르다`);
        if (ids.has(version.id)) report.push(`${file}: id '${version.id}' 중복`);
        ids.add(version.id);

        if (!version.title) report.push(`${file}: title 이 없다`);
        if (!version.sections || !version.sections.length) report.push(`${file}: sections 이 비었다`);

        const scoped = {};
        runInto(scoped, dataFile(paper, file));
        checkVersion(scoped.DOC_DATA, version, file, report);
        guides += countGuides(version);
    });

    report.length
        ? report.forEach((line) => fail(`${paper}: ${line}`))
        : pass(`${paper}: 버전 ${Object.keys(entry.versions).length}개 참조 모두 유효`);
    if (guides) console.log(`  [note] ${paper}: 아직 문장을 쓰지 않은 안내 블록 ${guides}곳`);
}

/* 6.5 지원 버전 목록 ---------------------------------------------------- */

console.log('\n[6.5] 지원 버전 목록 (applications.js -> 버전 파일)');
{
    const win = {};
    try {
        runInto(win, 'applications.js');
    } catch (error) {
        fail(`applications.js 실행 실패 -> ${error.message}`);
    }

    const apps = win.APPLICATIONS || [];
    const report = [];
    const seen = new Set();

    apps.forEach((app, i) => {
        const at = `APPLICATIONS[${i}](${app.id || '?'})`;
        if (!app.id) report.push(`${at}: id 가 없다`);
        if (seen.has(app.id)) report.push(`${at}: id 중복`);
        seen.add(app.id);
        if (!app.label) report.push(`${at}: label 이 없다`);

        [['cv', 'cv'], ['coverletter', 'coverletter'], ['portfolio', 'portfolio']].forEach(([field, dir]) => {
            const version = app[field];
            if (!version) return;
            const folder = path.join(ROOT, dir, version);
            if (!fs.existsSync(path.join(folder, 'index.html')) || !fs.existsSync(path.join(folder, 'version.js'))) {
                report.push(`${at}: ${dir}/${version}/ 에 index.html 또는 version.js 가 없다`);
            }
        });
    });

    report.length
        ? report.forEach((line) => fail(line))
        : pass(`지원 ${apps.length}건, 가리키는 버전 파일 모두 존재`);
}

/* 6.6 고아 버전 폴더 ---------------------------------------------------- */

console.log('\n[6.6] 지원 목록에 없는 버전 폴더');
{
    const win = {};
    try {
        runInto(win, 'applications.js');
    } catch (error) { /* 위에서 이미 보고했다 */ }

    const apps = win.APPLICATIONS || [];
    let orphans = 0;

    for (const doc of DOCS) {
        const used = new Set(apps.map((app) => app[doc]).filter(Boolean));
        const found = versionDirs(doc);
        const extra = found.filter((name) => !used.has(name));

        // 목록에 없는 버전은 어디서도 링크되지 않아 방치되기 쉽다.
        if (extra.length) {
            orphans++;
            fail(`${doc}: applications.js 에서 쓰이지 않는 버전 폴더 -> ${extra.join(', ')}`);
        }
    }
    if (!orphans) pass('모든 버전 폴더가 지원 목록에서 쓰인다');
}

/* 7. 메인 페이지 i18n 키 ---------------------------------------------- */

console.log('\n[7] 메인 페이지 i18n 키');
{
    // 사이트 셸(js/i18n.js)을 쓰는 페이지는 메인과 문서별 버전 목록이다.
    const html = ['index.html', ...DOCS.map((d) => `${d}/index.html`)].map(readHtml).join('\n');
    const js = read('js/i18n.js');
    const used = [...new Set(matchAll(html, /data-key(?:-aria-label|-title)?="([^"]+)"/g))];
    const koKeys = dictKeys(js, '        ko: {', '        en: {', 12);
    const enKeys = dictKeys(js, '        en: {', null, 12);

    const undefinedKeys = used.filter((k) => !koKeys.includes(k));
    const missingEn = koKeys.filter((k) => !enKeys.includes(k));
    // page_title 은 마크업이 아니라 document.title 로 직접 쓰인다.
    // *_page_title 은 마크업이 아니라 body[data-title-key] 로 지정된다.
    const titleKeys = [...new Set(matchAll(html, /data-title-key="([^"]+)"/g))];

    // 카드 렌더러는 마크업이 아니라 t('키') 로 문구를 가져간다.
    const fromJs = ['js/applications.js', 'js/version-list.js']
        .flatMap((file) => matchAll(read(file), /\bt\('([^']+)'\)/g));

    const known = [...used, ...titleKeys, ...fromJs];
    const unused = koKeys.filter((k) => !known.includes(k));

    if (undefinedKeys.length) fail(`마크업에 쓰였으나 사전에 없음 -> ${undefinedKeys.join(', ')}`);
    if (missingEn.length) fail(`en 번역 누락 -> ${missingEn.join(', ')}`);
    if (unused.length) fail(`쓰이지 않는 키 -> ${unused.join(', ')}`);
    if (!undefinedKeys.length && !missingEn.length && !unused.length) {
        pass(`메인: 사용 ${used.length} / ko ${koKeys.length} = en ${enKeys.length}`);
    }
}

/* 8. 필수 DOM id ------------------------------------------------------- */

console.log('\n[8] 공용 컨트롤러가 요구하는 DOM id');
{
    const check = (controller, dirs, label) => {
        const required = [...new Set(matchAll(controller, /getElementById\('([^']+)'\)/g))];
        for (const dir of dirs) {
            // 컨트롤러가 붙는 곳은 각 버전 폴더의 index.html 이다.
            for (const name of versionDirs(dir)) {
                const html = readHtml(`${dir}/${name}/index.html`);
                const missing = required.filter((id) => !html.includes(`id="${id}"`));
                if (missing.length) fail(`${dir}/${name}: 누락 -> ${missing.join(', ')}`);
            }
            pass(`${dir}: ${label} 필수 id ${required.length}개 — 버전 ${versionDirs(dir).length}개 확인`);
        }
    };
    check(deckJs, DECKS, '덱');
    check(paperJs, PAPERS, '문서');
}

console.log(failures ? `\n실패 ${failures}건\n` : '\n전부 통과\n');
process.exit(failures ? 1 : 0);
