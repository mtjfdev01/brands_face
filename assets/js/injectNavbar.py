#!/usr/bin/env python3
"""
Navbar/Footer Injection Script for Static Site Generator
Injects navbar and footer HTML into template files
"""

import os
import re
from pathlib import Path

NAVBAR_TEMPLATE = '''
<nav>
  <div class="nav-left">
    <a href="/index.html" class="logo">Box Studio</a>
  </div>
  <div class="nav-center"></div>
  <div class="nav-right">
    <a href="/index.html">Home</a>
    <a href="/about-us.html">About</a>
    <a href="/index.html#contact">Quote</a>
  </div>
</nav>
'''

FOOTER_TEMPLATE = '''
<footer>
  <div class="footer-content">
    <div>
      <h4>Company</h4>
      <ul>
        <li><a href="/about-us.html">About Us</a></li>
        <li><a href="/lab.html">Box Studio</a></li>
      </ul>
    </div>
    <div>
      <h4>Products</h4>
      <ul>
        <li><a href="/products/rigid-boxes.html">Rigid Boxes</a></li>
        <li><a href="/products/custom-pouches.html">Custom Pouches</a></li>
      </ul>
    </div>
  </div>
</footer>
'''

def inject_navbar_footer(html_file):
    """Inject navbar and footer into HTML files"""
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if navbar exists, if not inject it
        if '<nav' not in content:
            content = NAVBAR_TEMPLATE + content
        
        # Check if footer exists, if not inject it
        if '<footer' not in content:
            content = content + FOOTER_TEMPLATE
        
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✓ Processed: {html_file}")
        return True
    except Exception as e:
        print(f"✗ Error processing {html_file}: {str(e)}")
        return False

def process_directory(directory):
    """Process all HTML files in directory"""
    html_files = Path(directory).glob('**/*.html')
    count = 0
    
    for html_file in html_files:
        if inject_navbar_footer(str(html_file)):
            count += 1
    
    print(f"\nProcessed {count} HTML files")

if __name__ == '__main__':
    import sys
    
    if len(sys.argv) > 1:
        target = sys.argv[1]
    else:
        target = os.getcwd()
    
    if os.path.isfile(target):
        inject_navbar_footer(target)
    elif os.path.isdir(target):
        process_directory(target)
    else:
        print(f"Invalid path: {target}")
