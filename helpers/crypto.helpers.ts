import crypto from "crypto";

export interface EncrptInterface {
	data: Buffer;
	key: string;
}
export interface DecryptInterface {
	data: string;
	key: string;
	vector: string;
}

export default class Crypto {
	static encrypt(config: EncrptInterface) {
		const key = crypto.createHash("sha256").update(config.key).digest();
		const vector = crypto.randomBytes(16);

		const cipher = crypto.createCipheriv("aes-256-cbc", key, vector);
		const encrypt = Buffer.concat([cipher.update(config.data), cipher.final()]);

		return {
			vector: vector.toString("hex"),
			data: encrypt.toString("hex"),
		};
	}
	static decrypt(config: DecryptInterface) {
		const key = crypto.createHash("sha256").update(config.key).digest();

		const decryptVector = Buffer.from(config.vector, "hex");
		const decryptData = Buffer.from(config.data, "hex");

		let decipher = crypto.createDecipheriv("aes-256-cbc", key, decryptVector);

		const decrypt = Buffer.concat([
			decipher.update(decryptData),
			decipher.final(),
		]);

		return decrypt.toString();
	}
}
