const uuid = require("uuid");
const path = require("path");

async function isImageLoaded(req, filename) {
    const allowed_formats = ['image/png', 'image/jpeg', 'image/jpg']
    if(req.files !== null && req.files !== undefined) {
        const data = req.files
        const image = data[filename]
        if(allowed_formats.includes(image.mimetype)) {
            const filename = uuid.v4() + Date.now() + '.jpg'
            await image.mv(path.resolve(__dirname, '..', 'static', filename))
            return filename
        }
    }
}

module.exports = isImageLoaded