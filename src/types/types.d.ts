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
	return { mostSignificantBits, lessSignificantBits };
}
