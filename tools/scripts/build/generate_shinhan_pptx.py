#!/usr/bin/env python3
"""
신한형 이력서 생성 - Thin wrapper for pptx_engine

Usage: python generate_shinhan_pptx.py
"""

from pptx_engine import generate
from pptx_templates import TEMPLATES

if __name__ == "__main__":
    generate(TEMPLATES["shinhan"])
