import dotenv from 'dotenv';
import CryptoJS from 'crypto-js';

dotenv.config();

// Function to encrypt a password using AES
const encryptBeiAES = (message) => {
    return CryptoJS.AES.encrypt(message, process.env.ENCRYPTIONKEY).toString();
};

const decryptBeiAES = (encryptedMessage) => {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, process.env.ENCRYPTIONKEY);
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
};

export { encryptBeiAES, decryptBeiAES };
