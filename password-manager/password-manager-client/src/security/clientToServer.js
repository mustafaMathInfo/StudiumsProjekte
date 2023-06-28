import * as openpgp from "openpgp";
import generateKeyPair from "./generateKeyPair.js";

const encryptPasswordWithPublicKey = async (password, publicKeyServerArmored) => {
    const {data: encrypted} = await openpgp.encrypt({
        message: openpgp.message.fromText(password),                 // input as Message object
        publicKeys: (await openpgp.key.readArmored(publicKeyServerArmored)).keys, // for encryption
    });
    return encrypted
}

const signMessageWithKeyPair = async (message, email) => {
    try {
        const passphrase = email;
        const {privateKeyArmored, publicKeyArmored} = await generateKeyPair(email);
        const {keys: [privateKey]} = await openpgp.key.readArmored(privateKeyArmored);
        await privateKey.decrypt(passphrase);
        const {signature: detachedSignature} = await openpgp.sign({
            message: openpgp.cleartext.fromText(message), // CleartextMessage or Message object
            privateKeys: [privateKey],                            // for signing
            detached: true
        });
        return {detachedSignature, publicKeyArmoredSign: publicKeyArmored}
    } catch (error) {
        console.error('Error Sign Message:', error);
        throw new Error('Error Sign Message');
    }
}


export {encryptPasswordWithPublicKey, signMessageWithKeyPair}
