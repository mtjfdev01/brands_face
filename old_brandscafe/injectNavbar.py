import os
import re
from pathlib import Path

products_dir = Path('d:\\Main Website file\\Website- setup\\products')

# Files that already have navbar.js
files_with_navbar = {
    'products\\rigid-boxes.html',
    'products\\kraft-paper.html',
    'products\\art-card.html',
    'products\\rigid-boxes\\magnetic-snap-box.html',
    'products\\corrugated-boxes.html'
}

# Get all HTML files
all_html_files = []
for root, dirs, files in os.walk(products_dir):
    for file in files:
        if file.endswith('.html'):
            full_path = os.path.join(root, file)
            all_html_files.append(full_path)

total_files = len(all_html_files)
print(f'Total HTML files found: {total_files}\n')

# Separate files with and without navbar.js
files_to_update = []
already_has_navbar = []

for file_path in all_html_files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if 'navbar.js' in content:
            already_has_navbar.append(file_path)
        else:
            files_to_update.append(file_path)
    except Exception as e:
        print(f'Error reading {file_path}: {e}')

print(f'Files with navbar.js: {len(already_has_navbar)}')
print(f'Files without navbar.js: {len(files_to_update)}\n')

# Update files
successful_updates = 0
errors = []
updated_files = []

for file_path in files_to_update:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find the </body> tag
        body_tag_pos = content.rfind('</body>')
        
        if body_tag_pos == -1:
            errors.append(f'{file_path}: No </body> tag found')
            continue
        
        # Determine the correct path based on file depth
        relative_path = os.path.relpath(file_path, products_dir)
        
        # Count the depth: if it contains a slash, it's in a subdirectory
        if '\\' in relative_path:
            # File is in a subdirectory (e.g., art-card/gable-box.html)
            script_src = '../navbar.js'
        else:
            # File is directly in products folder (e.g., premium-finish.html)
            script_src = './navbar.js'
        
        # Create the script tag
        script_tag = f'\n\t<script src="{script_src}"></script>'
        
        # Insert before </body>
        new_content = content[:body_tag_pos] + script_tag + '\n' + content[body_tag_pos:]
        
        # Write the updated content
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        successful_updates += 1
        rel_path = os.path.relpath(file_path, products_dir)
        updated_files.append(rel_path)
        
    except Exception as e:
        errors.append(f'{file_path}: {str(e)}')

# Print summary
print('========== SUMMARY ==========\n')
print(f'Total files found: {total_files}')
print(f'Files with navbar.js: {len(already_has_navbar)}')
print(f'Files missing navbar.js: {len(files_to_update)}')
print(f'Successfully updated: {successful_updates}')

if updated_files:
    print('\n========== UPDATED FILES ==========\n')
    for file in sorted(updated_files):
        print(f'✓ {file}')

if errors:
    print('\n========== ERRORS ==========\n')
    for error in errors:
        print(f'✗ {error}')

print('\n========== END SUMMARY ==========\n')
