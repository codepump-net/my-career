<#
    PDF 추출 회귀 확인 (Windows / Chrome)

        powershell -ExecutionPolicy Bypass -File tools\print-pages.ps1

    브라우저 UI 없이 세 페이지를 PDF 로 뽑고 용지 크기를 기대값과 대조한다.

    기본판(default 버전)만 확인한다. 다른 버전은 브라우저에서 직접 본다.

      /cv/default/           A4 세로  595 x 842 pt  (210 x 297 mm)   페이지 수는 내용에 따라 달라짐
      /coverletter/default/  A4 세로  595 x 842 pt                   페이지 수는 내용에 따라 달라짐
      /portfolio/default/    16:9     960 x 540 pt  (1280 x 720 px)  슬라이드 1장 = 1페이지 (현재 8)

    문서(A4)는 브라우저가 내용 길이에 맞춰 페이지를 나누므로 장수를 고정값으로 보지 않는다.
    용지 크기가 틀어졌다면 인쇄 CSS 가 깨진 것이다.
    덱은 슬라이드 수와 페이지 수가 반드시 같아야 한다.

    결과 PDF 는 -OutDir 에 남으므로 눈으로도 확인한다.
    실제 배포용 PDF 는 브라우저에서 상단 PDF 버튼으로 뽑는다. 이 스크립트는 점검용이다.
#>
param(
    [string]$OutDir = "$env:TEMP\cv-portfolio-pdf",
    [string]$ChromePath = "$env:ProgramFiles\Google\Chrome\Application\chrome.exe"
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path $ChromePath)) {
    Write-Error "Chrome 을 찾지 못했다: $ChromePath  (-ChromePath 로 경로를 지정한다)"
}

$root = Split-Path -Parent $PSScriptRoot
if (-not (Test-Path $OutDir)) { New-Item -ItemType Directory -Path $OutDir -Force | Out-Null }
$profileDir = Join-Path $OutDir 'chrome-profile'

# expectPages 가 0 이면 장수를 검사하지 않는다(내용 길이에 따라 달라지는 문서).
$targets = @(
    @{ name = 'cv'; box = '594.95996 841.91998'; label = 'A4 세로'; expectPages = 0 },
    @{ name = 'coverletter'; box = '594.95996 841.91998'; label = 'A4 세로'; expectPages = 0 },
    @{ name = 'portfolio'; box = '960 540'; label = '16:9'; expectPages = 8 }
)

$failed = 0

foreach ($t in $targets) {
    $name = $t.name
    $pdf = Join-Path $OutDir "$name.pdf"
    $url = 'file:///' + (Join-Path $root "$name\default\index.html").Replace('\', '/')

    # 확장/기본앱/백그라운드 통신을 끈다 — 없으면 Chrome 이 무관한 오류 로그를 쏟아 낸다.
    & $ChromePath --headless=new --disable-gpu --no-first-run `
        --user-data-dir="$profileDir" --no-pdf-header-footer `
        --disable-extensions --disable-default-apps --disable-background-networking `
        --virtual-time-budget=8000 --print-to-pdf="$pdf" $url | Out-Null

    if (-not (Test-Path $pdf)) {
        Write-Host "  [FAIL] $name : PDF 가 생성되지 않았다"
        $failed++
        continue
    }

    # PDF 를 파싱하지 않고 객체 표기만 센다. 점검 목적에는 이 정도로 충분하다.
    $text = [System.Text.Encoding]::GetEncoding(28591).GetString([System.IO.File]::ReadAllBytes($pdf))
    $pages = ([regex]::Matches($text, '/Type\s*/Page[^sR]')).Count
    $box = ([regex]::Match($text, '/MediaBox\s*\[[^\]]*\]')).Value
    $size = [math]::Round((Get-Item $pdf).Length / 1KB, 1)

    $boxOk = $box -match [regex]::Escape($t.box)
    $pagesOk = ($t.expectPages -eq 0) -or ($pages -eq $t.expectPages)

    if ($boxOk -and $pagesOk) {
        Write-Host "  [ok]   $name : $($t.label) / $pages 페이지 / $box / $size KB"
    }
    else {
        $want = if ($t.expectPages -eq 0) { '내용에 따름' } else { "$($t.expectPages) 페이지" }
        Write-Host "  [FAIL] $name : $pages 페이지 (기대 $want) / $box (기대 $($t.box)) / $size KB"
        $failed++
    }
}

Write-Host ""
if ($failed) { Write-Host "실패 $failed 건 — 결과: $OutDir"; exit 1 }
Write-Host "전부 통과 — 결과: $OutDir"
