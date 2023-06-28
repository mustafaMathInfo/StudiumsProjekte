import * as openpgp from "openpgp";

const generateKeyPair = async (email) => {
    try {
        const result = await openpgp.generateKey({
            userIds: [{email: email}], // you can pass multiple user IDs
            curve: 'ed25519',                                           // ECC curve name
            passphrase: email          // protects the private key
        });
        const privateKeyArmored = result.privateKeyArmored;
        const publicKeyArmored = result.publicKeyArmored;
        return {privateKeyArmored, publicKeyArmored}
    } catch (error) {
        console.error('Error generating key pair:', error);
        throw new Error('Failed to generate key pair');
    }
};

export default generateKeyPair;
