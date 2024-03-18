/**
 * Easings from <a href="https://easings.net/">easings.net</a><br>
 * + constant + linear
 */

export class Easing {
	static inSine(f: number): number {
		return 1 - Math.cos(f * (Math.PI / 2));
	}
	static outSine(f: number): number {
		return Math.sin(f * (Math.PI / 2));
	}
	static inOutSine(f: number): number {
		return -0.5 * (Math.cos(Math.PI * f) - 1);
	}
	static inCubic(f: number): number {
		return f * f * f;
	}
	static outCubic(f: number): number {
		return --f * f * f + 1;
	}
	static inOutCubic(f: number): number {
		return f < 0.5
			? 4 * f * f * f
			: (f - 1) * (2 * f - 2) * (2 * f - 2) + 1;
	}
	static inQuad(f: number): number {
		return f * f;
	}
	static outQuad(f: number): number {
		return f * (2 - f);
	}
	static inOutQuad(f: number): number {
		return f < 0.5 ? 2 * f * f : -1 + (4 - 2 * f) * f;
	}
	static inQuart(f: number): number {
		return f * f * f * f;
	}
	static outQuart(f: number): number {
		return 1 - --f * f * f * f;
	}
	static inOutQuart(f: number): number {
		return f < 0.5 ? 8 * f * f * f * f : 1 - 8 * --f * f * f * f;
	}
	static inQuint(f: number): number {
		return f * f * f * f * f;
	}
	static outQuint(f: number): number {
		return 1 + --f * f * f * f * f;
	}
	static inOutQuint(f: number): number {
		return f < 0.5 ? 16 * f * f * f * f * f : 1 + 16 * --f * f * f * f * f;
	}
	static inExpo(f: number): number {
		return f === 0 ? 0 : Math.pow(2, 10 * (f - 1));
	}
	static outExpo(f: number): number {
		return f === 1 ? 1 : -Math.pow(2, -10 * f) + 1;
	}
	static inOutExpo(f: number): number {
		return f === 0
			? 0
			: f === 1
				? 1
				: f < 0.5
					? Math.pow(2, 20 * f - 10) / 2
					: (2 - Math.pow(2, -20 * f + 10)) / 2;
	}
	static inCirc(f: number): number {
		return 1 - Math.sqrt(1 - f * f);
	}
	static outCirc(f: number): number {
		return Math.sqrt(1 - --f * f);
	}
	static inOutCirc(f: number): number {
		return f < 0.5
			? (1 - Math.sqrt(1 - 4 * f * f)) / 2
			: (Math.sqrt(-(2 * f - 3) * (2 * f - 1)) + 1) / 2;
	}
	static inBack(f: number): number {
		const s = 1.70158;
		return f * f * ((s + 1) * f - s);
	}
	static outBack(f: number): number {
		const s = 1.70158;
		return --f * f * ((s + 1) * f + s) + 1;
	}
	static inOutBack(f: number): number {
		const s = 1.70158 * 1.525;
		if ((f *= 2) < 1) return 0.5 * (f * f * ((s + 1) * f - s));
		return 0.5 * ((f -= 2) * f * ((s + 1) * f + s) + 2);
	}
	static inElastic(f: number): number {
		if (f === 0 || f === 1) return f;
		const p = 0.3;
		const s = p / 4;
		return (
			-Math.pow(2, 10 * (f -= 1)) *
			Math.sin(((f - s) * (2 * Math.PI)) / p)
		);
	}
	static outElastic(f: number): number {
		if (f === 0 || f === 1) return f;
		const p = 0.3;
		const s = p / 4;
		return (
			Math.pow(2, -10 * f) * Math.sin(((f - s) * (2 * Math.PI)) / p) + 1
		);
	}
	static inOutElastic(f: number): number {
		const p = 0.3 * 1.5;
		const s = p / 4;
		if (f === 0 || f === 1) return f;
		if ((f *= 2) < 1)
			return (
				-0.5 *
				(Math.pow(2, 10 * (f -= 1)) *
					Math.sin(((f - s) * (2 * Math.PI)) / p))
			);
		return (
			Math.pow(2, -10 * (f -= 1)) *
				Math.sin(((f - s) * (2 * Math.PI)) / p) *
				0.5 +
			1
		);
	}
	static inBounce(f: number): number {
		return 1 - Easing.outBounce(1 - f);
	}
	static outBounce(f: number): number {
		if (f < 1 / 2.75) {
			return 7.5625 * f * f;
		} else if (f < 2 / 2.75) {
			return 7.5625 * (f -= 1.5 / 2.75) * f + 0.75;
		} else if (f < 2.5 / 2.75) {
			return 7.5625 * (f -= 2.25 / 2.75) * f + 0.9375;
		} else {
			return 7.5625 * (f -= 2.625 / 2.75) * f + 0.984375;
		}
	}
	static inOutBounce(f: number): number {
		return f < 0.5
			? Easing.inBounce(f * 2) * 0.5
			: Easing.outBounce(f * 2 - 1) * 0.5 + 0.5;
	}

	/**
	 * @param string ease name
	 * @return ease
	 */
	public static easeFromString(string: string): Ease {
		try {
			if (string == "step") return Ease.CONSTANT;
			if (string.substring(0, 4).toUpperCase() == "EASE") {
				string = string.substring(4);
			}

			// @ts-ignore
			// TODO: Fix this shitcoding (c) Maks_gaming
			return Ease[string.toUpperCase()];
		} catch {
			return Ease.LINEAR;
		}
	}
}

export default class Ease {
	static LINEAR = new Ease(0, (f) => f);
	static CONSTANT = new Ease(1, (f) => 0);
	static INSINE = new Ease(6, Easing.inSine);
	static OUTSINE = new Ease(7, Easing.outSine);
	static INOUTSINE = new Ease(8, Easing.inOutSine);
	static INCUBIC = new Ease(9, Easing.inCubic);
	static OUTCUBIC = new Ease(10, Easing.outCubic);
	static INOUTCUBIC = new Ease(11, Easing.inOutCubic);
	static INQUAD = new Ease(12, Easing.inQuad);
	static OUTQUAD = new Ease(13, Easing.outQuad);
	static INOUTQUAD = new Ease(14, Easing.inOutQuad);
	static INQUART = new Ease(15, Easing.inQuart);
	static OUTQUART = new Ease(16, Easing.outQuart);
	static INOUTQUART = new Ease(17, Easing.inOutQuart);
	static INQUINT = new Ease(18, Easing.inQuint);
	static OUTQUINT = new Ease(19, Easing.outQuint);
	static INOUTQUINT = new Ease(20, Easing.inOutQuint);
	static INEXPO = new Ease(21, Easing.inExpo);
	static OUTEXPO = new Ease(22, Easing.outExpo);
	static INOUTEXPO = new Ease(23, Easing.inOutExpo);
	static INCIRC = new Ease(24, Easing.inCirc);
	static OUTCIRC = new Ease(25, Easing.outCirc);
	static INOUTCIRC = new Ease(26, Easing.inOutCirc);
	static INBACK = new Ease(27, Easing.inBack);
	static OUTBACK = new Ease(28, Easing.outBack);
	static INOUTBACK = new Ease(29, Easing.inOutBack);
	static INELASTIC = new Ease(30, Easing.inElastic);
	static OUTELASTIC = new Ease(31, Easing.outElastic);
	static INOUTELASTIC = new Ease(32, Easing.inOutElastic);
	static INBOUNCE = new Ease(33, Easing.inBounce);
	static OUTBOUNCE = new Ease(34, Easing.outBounce);
	static INOUTBOUNCE = new Ease(35, Easing.inOutBounce);

	private readonly id;
	private readonly callback;

	constructor(id: number, callback: (value: number) => number) {
		this.id = id;
		this.callback = callback;
	}

	getId() {
		return this.id;
	}
}
