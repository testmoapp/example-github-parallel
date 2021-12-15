const glob = require('glob');

if (!process.env.CI_TOTAL) {
    console.error('No envrionment variable CI_TOTAL defined');
    process.exit(1);
}

if (!process.env.CI_INDEX) {
    console.error('No envrionment variable CI_INDEX defined');
    process.exit(1);
}

function splitChunks(items, total) {
    let chunks = [];

    let currentChunk = 0;
    for (let currentItem = 0; currentItem < items.length; currentItem++) {
        if (!chunks[currentChunk]) {
            chunks[currentChunk] = [];
        }

        chunks[currentChunk].push(items[currentItem]);

        currentChunk++;
        if (currentChunk >= total) {
            currentChunk = 0;
        }
    }

    return chunks;
}

const files = glob.sync('tests/**/*.js');
const chunks = splitChunks(files, process.env.CI_TOTAL);

if (chunks[process.env.CI_INDEX]) {
    for (file of chunks[process.env.CI_INDEX]) {
        process.stdout.write(file + "\n");
    }
}
