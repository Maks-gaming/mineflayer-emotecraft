export default class Utils {
	static UUIDfromString(name: string): UUID {
		let components = name.split("-");

		if (components.length !== 5) {
			throw new Error(`Invalid UUID string: ${name}`);
		}

		for (let index = 0; index < 5; index++) {
			components[index] = `0x${components[index]}`;
		}

		let mostSignificantBits = BigInt(Number.parseInt(components[0], 16));
		mostSignificantBits <<= 16n;
		mostSignificantBits |= BigInt(Number.parseInt(components[1], 16));
		mostSignificantBits <<= 16n;
		mostSignificantBits |= BigInt(Number.parseInt(components[2], 16));

		let leastSignificantBits = BigInt(Number.parseInt(components[3], 16));
		leastSignificantBits <<= 48n;
		leastSignificantBits |= BigInt(Number.parseInt(components[4], 16));

		return {
			leastSignificantBits,
			mostSignificantBits,
		};
	}
}
