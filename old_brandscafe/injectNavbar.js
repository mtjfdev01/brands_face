const fs = require('fs');
const path = require('path');

const productsDir = path.join(__dirname, 'products');

let totalFiles = 0;
let filesWithNavbar = 0;
let filesWithoutNavbar = 0;
let successfulUpdates = 0;
let errors = [];
let updatedFiles = [];

// Recursive function to get all HTML files
function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            getAllHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

console.log('Scanning for HTML files...\n');

// Get all HTML files
const allHtmlFiles = getAllHtmlFiles(productsDir);
totalFiles = allHtmlFiles.length;

console.log(`Total HTML files found: ${totalFiles}\n`);

// Process each file
allHtmlFiles.forEach(filePath => {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check if navbar.js is already present
        if (content.includes('navbar.js')) {
            filesWithNavbar++;
            return;
        }
        
        filesWithoutNavbar++;
        
        // Find the </body> tag
        const bodyTagIndex = content.lastIndexOf('</body>');
        
        if (bodyTagIndex === -1) {
            errors.push(`${filePath}: No </body> tag found`);
            return;
        }
        
        // Determine the correct path based on file depth
        let relativePath = path.relative(productsDir, filePath);
        let scriptSrc;
        
        // Count the depth: if it contains a slash, it's in a subdirectory
        if (relativePath.includes(path.sep)) {
            // File is in a subdirectory (e.g., art-card/gable-box.html)
            scriptSrc = '../navbar.js';
        } else {
            // File is directly in products folder (e.g., corrugated-boxes.html)
            scriptSrc = './navbar.js';
        }
        
        // Insert the script tag
        const scriptTag = `\n\t<script src="${scriptSrc}"></script>`;
        const newContent = content.substring(0, bodyTagIndex) + scriptTag + '\n' + content.substring(bodyTagIndex);
        
        // Write the updated content
        fs.writeFileSync(filePath, newContent, 'utf8');
        
        successfulUpdates++;
        updatedFiles.push(filePath.replace(productsDir, 'products'));
        
    } catch (err) {
        errors.push(`${filePath}: ${err.message}`);
    }
});

// Print summary
console.log('\n========== SUMMARY ==========\n');
console.log(`Total files found: ${totalFiles}`);
console.log(`Files with navbar.js: ${filesWithNavbar}`);
console.log(`Files missing navbar.js: ${filesWithoutNavbar}`);
console.log(`Successfully updated: ${successfulUpdates}`);

if (updatedFiles.length > 0) {
    console.log('\n========== UPDATED FILES ==========\n');
    updatedFiles.forEach(file => {
        console.log(`✓ ${file}`);
    });
}

if (errors.length > 0) {
    console.log('\n========== ERRORS ==========\n');
    errors.forEach(err => {
        console.log(`✗ ${err}`);
    });
}

console.log('\n========== END SUMMARY ==========\n');
