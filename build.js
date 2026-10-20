/**
 * src/page.html (Artifact 본문) → index.html (독립 실행 HTML 문서)
 *
 * Artifact 플랫폼은 <!doctype>·<head>·charset·viewport·기본 리셋을 자동으로
 * 감싸 주지만, GitHub Pages는 파일을 그대로 서빙한다. 그래서 같은 본문에
 * 동일한 스켈레톤을 입혀 두 곳에서 똑같이 보이게 만든다.
 *
 * 사용법:  node build.js
 */
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "src", "page.html");
const OUT = path.join(__dirname, "index.html");

const body = fs.readFileSync(SRC, "utf8");

const titleMatch = body.match(/<title>([^<]*)<\/title>/i);
const title = titleMatch ? titleMatch[1].trim() : "안전한 첫 출근";

const doc = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="고등학교 특수학급 지적장애 학생을 위한 현장실습 사전교육 10차시(차시당 50분). 수업 흐름, 영상 링크, 안전표지·보호구 안전교육 자료, 읽기자료, 인쇄용 학습지 10종.">
<meta name="author" content="혜화학교 특수학급">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="현장실습 사전교육 10차시 · 50분 수업 · 안전교육 자료 · 학습지 인쇄">
<meta name="color-scheme" content="light dark">
<style>
:root{
  padding-top:env(safe-area-inset-top,0px);
  padding-bottom:env(safe-area-inset-bottom,0px);
  color-scheme:light dark;
}
html,body{margin:0}
body{font:14px/1.5 system-ui,-apple-system,"Malgun Gothic",sans-serif;background:#FAF7F0}
img{max-width:100%}
[hidden]{display:none!important}
</style>
</head>
<body>
${body}
</body>
</html>
`;

fs.writeFileSync(OUT, doc, "utf8");
console.log(
  "built index.html  (" + title + ", " + Math.round(doc.length / 1024) + "KB)"
);
