const path = require('path');
const fs = require('fs-extra');


const jsonFilePath = path.resolve(__dirname, './json/loadoutData.json');

const loadoutData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

function searchVariations(searchTerm) {
    let results = [];
    function recursiveSearch(obj, childOfSearch = false) {
        if (obj.name && obj.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            if (Array.isArray(obj.data.variations)) {
                obj.data.variations.forEach(variation => {
                    if (typeof variation === 'string') {
                        results.push(variation);
                    } else if (typeof variation === 'object') {
                        recursiveSearch(variation, true);
                        childOfSearch = true;
                    }
                });
            }
        }
        if (obj.data && Array.isArray(obj.data.variations)) {
            obj.data.variations.forEach(variation => {
                if (typeof variation === 'string' && childOfSearch) {
                    results.push(variation);
                }
                if (typeof variation === 'object') {
                    recursiveSearch(variation, childOfSearch);
                }
            });
        }
        if (Array.isArray(obj.variations)) {
            obj.variations.forEach(variation => {
                if (typeof variation === 'string' && childOfSearch) {
                    results.push(variation);
                } else if (typeof variation === 'object') {
                    recursiveSearch(variation);
                }
            });
        }
    }

    // Start the recursive search from the top-level variations array
    if (Array.isArray(loadoutData.variations)) {
        loadoutData.variations.forEach(item => recursiveSearch(item));
    } else {
        recursiveSearch(loadoutData, childOfSearch);
    }

    return results;
}


module.exports = searchVariations;
