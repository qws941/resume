#!/usr/bin/env python3
"""
CLI wrapper for PPTX generation.

Usage:
    python generate_pptx.py ta              # Generate TA resume
    python generate_pptx.py shinhan         # Generate Shinhan resume
    python generate_pptx.py ta --output custom.pptx
    python generate_pptx.py --list          # Show available templates
"""

import argparse
import sys
from pathlib import Path

from pptx_engine import generate_from_cli
from pptx_templates import TEMPLATES


def main():
    parser = argparse.ArgumentParser(
        description="Generate PPTX resume from JSON data"
    )
    parser.add_argument(
        "template",
        nargs="?",
        choices=list(TEMPLATES.keys()),
        help="Template type to generate",
    )
    parser.add_argument(
        "--list", "-l",
        action="store_true",
        help="List available templates",
    )
    parser.add_argument(
        "--data", "-d",
        type=Path,
        help="Override source data path",
    )
    parser.add_argument(
        "--output", "-o",
        type=Path,
        help="Override output path",
    )
    
    args = parser.parse_args()
    
    if args.list:
        print("Available templates:")
        for name, spec in TEMPLATES.items():
            print(f"  {name:10} - {spec.name}")
            print(f"             Source:   {spec.source_path}")
            print(f"             Template: {spec.template_path}")
            print(f"             Output:   {spec.output_path}")
        return 0
    
    if not args.template:
        parser.print_help()
        return 1
    
    try:
        output = generate_from_cli(
            template_name=args.template,
            source_path=args.data,
            output_path=args.output,
        )
        return 0
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
