const fs = require('fs');
const path = require('path');

/**
 * Validator for Landing Asesora MS
 * Checks for common pitfalls like nested script tags, missing dependencies, etc.
 */

const FILES_TO_CHECK = [
    'index.html',
    'joyas/index.html',
    'maquillaje/index.html',
    'asesoria-imagen/index.html',
    'talleres-experiencias/index.html',
    'productos-belleza/index.html'
];

const MANDATORY_SCRIPTS = [
    'js/cart.js',
    'sweetalert2'
];

function validateFile(filePath) {
    console.log(`\n🔍 Checking: ${filePath}`);
    const fullPath = path.join(__dirname, '..', filePath);
    
    if (!fs.existsSync(fullPath)) {
        console.error(`  ❌ File not found: ${filePath}`);
        return false;
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    let errors = 0;

    // 1. Check for nested <script> tags
    // Valid: <script>...</script> <script>...</script>
    // Invalid: <script>...<script>...</script>
    const nestedScriptRegex = /<script\b[^>]*>(?:(?!<\/script>)[\s\S])*<script\b[^>]*>/gi;
    if (nestedScriptRegex.test(content)) {
        console.error('  ❌ ERROR: Nested <script> tags detected! This will crash the page.');
        errors++;
    }

    // 2. Check for mandatory scripts
    MANDATORY_SCRIPTS.forEach(script => {
        if (!content.toLowerCase().includes(script.toLowerCase())) {
            console.error(`  ❌ ERROR: Missing mandatory script/dependency: ${script}`);
            errors++;
        }
    });

    // 3. Check for unclosed <script> tags (basic check)
    const openTags = (content.match(/<script\b/gi) || []).length;
    const closeTags = (content.match(/<\/script>/gi) || []).length;
    if (openTags !== closeTags) {
        console.error(`  ❌ ERROR: Mismatched script tags. Open: ${openTags}, Closed: ${closeTags}`);
        errors++;
    }

    // 4. Check for duplicated SB_Cart in the same file
    const cartMatches = (content.match(/SB_Cart\s*=\s*{/g) || []).length;
    if (cartMatches > 0 && filePath === 'index.html') {
        // index.html should use the external script, not an inline object anymore
        console.warn('  ⚠️ WARNING: Inline SB_Cart detected in index.html. It should use js/cart.js.');
    }

    if (errors === 0) {
        console.log('  ✅ No critical errors found.');
        return true;
    } else {
        console.log(`  ❌ Found ${errors} error(s).`);
        return false;
    }
}

console.log('🚀 Starting Integrity Validation...');
let totalErrors = 0;

FILES_TO_CHECK.forEach(file => {
    if (!validateFile(file)) totalErrors++;
});

if (totalErrors > 0) {
    console.error(`\n💥 Validation FAILED with ${totalErrors} file(s) having issues.`);
    process.exit(1);
} else {
    console.log('\n✨ All checks passed! The site is stable.');
    process.exit(0);
}
