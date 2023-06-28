import * as openpgp from "openpgp";

const decryptPasswordWithPrivateKey = async (message, privateKeyArmored, publicKeyArmored,email) => {
    try {
        const {keys: [privateKey]} = await openpgp.key.readArmored(privateKeyArmored);
        await privateKey.decrypt(email);
        const {data: decrypted} = await openpgp.decrypt({
            message: await openpgp.message.readArmored(message),              // parse armored message
            publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys, // for verification (optional)
            privateKeys: [privateKey]                                           // for decryption
        });
        return decrypted;
    } catch (error) {
        console.error('Error decrypting the message:', error);
        throw new Error('Failed to decrypt the message');
    }
};

const verifyMessageWithPublicKey = async (cleartextMessage, detachedSignature, publicKeyArmored) => {
    const verified = await openpgp.verify({
        message: openpgp.cleartext.fromText(cleartextMessage),              // CleartextMessage or Message object
        signature: await openpgp.signature.readArmored(detachedSignature), // parse detached signature
        publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys // for verification
    });
    const {valid} = verified.signatures[0];
    return valid;
}


export {decryptPasswordWithPrivateKey, verifyMessageWithPublicKey}
