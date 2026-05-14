const fs = require('fs');
const path = require('path');

// Simple SVG icon untuk Timer PS
const svg192 = `<svg width="192" height="192" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="192" height="192" fill="url(#grad)" rx="32"/>
  <text x="96" y="120" font-size="96" text-anchor="middle" fill="white">🎮</text>
  <text x="96" y="165" font-size="28" text-anchor="middle" fill="white" font-weight="bold">TIMER</text>
</svg>`;

const svg512 = `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#grad)" rx="85"/>
  <text x="256" y="320" font-size="256" text-anchor="middle" fill="white">🎮</text>
  <text x="256" y="440" font-size="76" text-anchor="middle" fill="white" font-weight="bold">TIMER</text>
</svg>`;

// Save SVG files
fs.writeFileSync(path.join(__dirname, 'public', 'icon-192.svg'), svg192);
fs.writeFileSync(path.join(__dirname, 'public', 'icon-512.svg'), svg512);

console.log('✅ SVG icons created!');
console.log('📝 For production PWA, convert these SVG to PNG using:');
console.log('   - https://cloudconvert.com/svg-to-png');
console.log('   - https://convertio.co/svg-png/');
console.log('   - Or use ImageMagick: convert icon-192.svg icon-192.png');
