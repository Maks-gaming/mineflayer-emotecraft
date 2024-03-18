interface UUID {
	mostSignificantBits: bigint;
	lessSignificantBits: bigint;
}

function generateUUID(): UUID {
	const mostSignificantBits = BigInt(
		Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
	);
	const lessSignificantBits = BigInt(
		Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
	);
	return { lessSignificantBits, mostSignificantBits };
}

function UUIDfromString(name): UUID {
	let components = name.split("-");

	if (components.length !== 5) {
		throw new Error(`Invalid UUID string: ${name}`);
	}

	for (let index = 0; index < 5; index++) {
		components[index] = `0x${components[index]}`;
	}

	let mostSigBits = BigInt(Number.parseInt(components[0], 16));
	mostSigBits <<= 16n;
	mostSigBits |= BigInt(Number.parseInt(components[1], 16));
	mostSigBits <<= 16n;
	mostSigBits |= BigInt(Number.parseInt(components[2], 16));

	let leastSigBits = BigInt(Number.parseInt(components[3], 16));
	leastSigBits <<= 48n;
	leastSigBits |= BigInt(Number.parseInt(components[4], 16));

	return {
		leastSigBits,
		mostSigBits,
	};
}
