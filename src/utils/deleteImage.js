const path = require("path");
const fs = require('fs')

async function deleteImage (filename) {
    if(filename !== 'no_image.jpeg') {
        const filepath = path.resolve(__dirname, '..', 'static', filename)
        await fs.unlink(filepath, function(err) {
            if(err) console.log(err)
        })
    }
}

module.exports = deleteImage