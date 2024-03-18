import Ease from "./util/Ease";

export default class KeyFrame {
	public readonly tick;
	public readonly value;
	public readonly ease;

	constructor(tick: number, value: number, ease: Ease) {
		this.tick = tick;
		this.value = value;
		this.ease = ease;
	}
}
