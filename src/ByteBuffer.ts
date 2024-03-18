export default class ByteBuffer {
	private buffer: Buffer = Buffer.alloc(0);

	put(buffer: Buffer) {
		this.buffer = Buffer.concat([this.buffer, buffer]);
	}

	putInt(number: number) {
		const buffer = Buffer.alloc(4);
		buffer.writeUInt32LE(number, 0);
		this.buffer = Buffer.concat([this.buffer, buffer]);
	}

	putLong(number: bigint) {
		const buffer = Buffer.alloc(8);
		buffer.writeBigInt64LE(number, 0);
		this.buffer = Buffer.concat([this.buffer, buffer]);
	}

	putBoolean(boolean: boolean) {
		const buffer = Buffer.alloc(1);
		buffer.writeUInt8(boolean ? 1 : 0, 0);
		this.buffer = Buffer.concat([this.buffer, buffer]);
	}

	putString(string: string, charset: BufferEncoding = "utf-8") {
		this.buffer = Buffer.concat([
			this.buffer,
			Buffer.from(string, charset),
		]);
	}

	putFloat(number: number) {
		const buffer = Buffer.alloc(4);
		buffer.writeFloatLE(number, 0);
		this.buffer = Buffer.concat([this.buffer, buffer]);
	}
}
