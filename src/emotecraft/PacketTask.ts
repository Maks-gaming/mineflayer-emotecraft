export default class PacketTask {
	static UNKNOWN = new PacketTask(0, false, false, false);
	static STREAM = new PacketTask(1, true, false, true);
	static CONFIG = new PacketTask(8, false, false, false);
	static STOP = new PacketTask(10, true, false, true);
	static FILE = new PacketTask(0x10, true, true, false);

	private readonly id;
	private readonly isEmoteStream;
	private readonly exchangeHeader;
	private readonly playerBound;

	constructor(
		id: number,
		isEmoteStream: boolean,
		exchangeHeader: boolean,
		playerBound: boolean,
	) {
		const idBuffer = Buffer.alloc(1);
		idBuffer.writeUint8(id, 0);

		this.id = idBuffer;
		this.isEmoteStream = isEmoteStream;
		this.exchangeHeader = exchangeHeader;
		this.playerBound = playerBound;
	}
}
