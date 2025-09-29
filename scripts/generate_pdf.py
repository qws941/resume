#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PDF Generator for Resume
Converts Markdown resumes to PDF format
"""

import os
import sys
from pathlib import Path

def install_dependencies():
    """Install required packages"""
    import subprocess
    packages = ['markdown', 'weasyprint', 'beautifulsoup4']

    for package in packages:
        try:
            __import__(package)
        except ImportError:
            print(f"Installing {package}...")
            subprocess.check_call([sys.executable, "-m", "pip", "install", package])

def markdown_to_pdf(md_file, pdf_file):
    """Convert Markdown to PDF"""
    import markdown
    from weasyprint import HTML, CSS

    # Read markdown file
    with open(md_file, 'r', encoding='utf-8') as f:
        md_content = f.read()

    # Convert to HTML
    html_content = markdown.markdown(
        md_content,
        extensions=['extra', 'codehilite', 'tables']
    )

    # CSS for styling
    css = CSS(string='''
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;700&display=swap');

        body {
            font-family: 'Noto Sans KR', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
        }

        h1 {
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }

        h2 {
            color: #34495e;
            margin-top: 30px;
            margin-bottom: 15px;
            border-bottom: 1px solid #ecf0f1;
            padding-bottom: 5px;
        }

        h3 {
            color: #555;
            margin-top: 20px;
        }

        strong {
            color: #2c3e50;
        }

        ul {
            padding-left: 20px;
        }

        li {
            margin-bottom: 5px;
        }

        blockquote {
            border-left: 4px solid #3498db;
            padding-left: 15px;
            color: #555;
            font-style: italic;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }

        table th {
            background-color: #3498db;
            color: white;
            padding: 10px;
            text-align: left;
        }

        table td {
            border: 1px solid #ddd;
            padding: 8px;
        }

        code {
            background-color: #f4f4f4;
            padding: 2px 4px;
            border-radius: 3px;
        }

        hr {
            border: none;
            border-top: 1px solid #ecf0f1;
            margin: 30px 0;
        }

        a {
            color: #3498db;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        @page {
            margin: 1cm;
            size: A4;
        }

        @media print {
            body {
                font-size: 11pt;
            }

            h1 {
                font-size: 18pt;
            }

            h2 {
                font-size: 14pt;
                page-break-after: avoid;
            }

            h3 {
                font-size: 12pt;
                page-break-after: avoid;
            }

            ul, ol {
                page-break-inside: avoid;
            }
        }
    ''')

    # Full HTML document
    full_html = f'''
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>이재철 이력서</title>
    </head>
    <body>
        {html_content}
    </body>
    </html>
    '''

    # Generate PDF
    HTML(string=full_html).write_pdf(pdf_file, stylesheets=[css])
    print(f"✅ PDF generated: {pdf_file}")

def main():
    """Main function"""
    # Install dependencies if needed
    install_dependencies()

    # Paths
    base_dir = Path(__file__).parent.parent
    master_md = base_dir / "master" / "이재철_이력서_마스터.md"
    master_pdf = base_dir / "master" / "이재철_이력서_마스터.pdf"

    if not master_md.exists():
        print(f"❌ Master resume not found: {master_md}")
        return

    print(f"📄 Converting {master_md.name} to PDF...")
    markdown_to_pdf(master_md, master_pdf)

    # Convert company-specific resumes if they exist
    company_dir = base_dir / "company-specific"
    if company_dir.exists():
        for md_file in company_dir.glob("*.md"):
            pdf_file = md_file.with_suffix('.pdf')
            print(f"📄 Converting {md_file.name} to PDF...")
            markdown_to_pdf(md_file, pdf_file)

    print("\n✨ All PDFs generated successfully!")

if __name__ == "__main__":
    main()