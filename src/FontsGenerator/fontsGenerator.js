const fs = require('fs');

let cssContent = '';

for (let i = 1; i <= 604; i++) {
    cssContent += `
@font-face {
    font-family: 'p${i}';
    src: url('../../public/fonts/p${i}.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}
`;
}

fs.writeFileSync('fonts.css', cssContent);

console.log('fonts.css generated successfully!');