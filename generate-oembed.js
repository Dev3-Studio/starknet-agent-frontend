const fs = require('fs');
const path = require('path');

const { SetMetadata } = require('./src/metadata.ts');

// Create the oembed data structure
const oembedData = {
    title: SetMetadata.title,
    author_name: SetMetadata.author,
    author_url: SetMetadata.author_url,
    provider_name: SetMetadata.siteName,
    provider_url: SetMetadata.url
};

// Ensure the public directory exists
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Write the oembed.json file
const oembedPath = path.join(publicDir, 'oembed.json');
fs.writeFileSync(
    oembedPath,
    JSON.stringify(oembedData, null, 2),
    'utf8'
);

console.log(`oembed.json has been created at ${oembedPath}`);