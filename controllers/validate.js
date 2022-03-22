let path = require('path')

function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);

    }
    catch (err) {
      return false;
    }
    return true;
}

function validPath(string){
    const imgPath = path.extname(string)
    const validExtNames = ['.png', '.jpg', '.jpeg'];

    return validExtNames.some(extName => extName === imgPath);
}

module.exports = {isValidHttpUrl, validPath}
