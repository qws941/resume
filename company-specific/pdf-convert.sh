#!/bin/bash
# PDF 변환 스크립트

echo "🔄 PDF 변환 시작..."

# Pandoc 설치 확인
if ! command -v pandoc &> /dev/null; then
    echo "⚠️  Pandoc이 설치되어 있지 않습니다."
    echo ""
    echo "설치 명령어:"
    echo "sudo apt update && sudo apt install -y pandoc texlive-xetex texlive-fonts-recommended texlive-lang-korean"
    echo ""
    echo "또는 온라인 변환기 사용:"
    echo "https://www.markdowntopdf.com/"
    exit 1
fi

# PDF 변환
cd /home/jclee/app/resume/company-specific

pandoc "토스커머스_Server_Developer_Platform_이재철.md" \
  -o "이재철_토스커머스_이력서.pdf" \
  --pdf-engine=xelatex \
  -V mainfont="NanumGothic" \
  -V geometry:margin=2cm \
  -V fontsize=11pt \
  -V linestretch=1.3 \
  2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ PDF 변환 완료!"
    echo ""
    ls -lh "이재철_토스커머스_이력서.pdf"
    echo ""
    echo "파일 위치: $(pwd)/이재철_토스커머스_이력서.pdf"
else
    echo "❌ 변환 실패"
    echo ""
    echo "온라인 변환기를 사용하세요:"
    echo "https://www.markdowntopdf.com/"
fi
