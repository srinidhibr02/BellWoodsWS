const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const password = 'bf3c199c2470cb477d907b1e0917c17b';
const iv = crypto.randomBytes(16);

let encryption = {};

encryption.encrypt = (text) => {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(password), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

encryption.decrypt = (text) => {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(password), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

module.exports = encryption;
