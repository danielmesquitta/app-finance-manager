interface BuildLinePathParams {
	y: number[];
	getXCoord: (i: number) => number;
	getYCoord: (i: number) => number;
}

interface BuildAreaPathParams extends BuildLinePathParams {
	marginTop: number;
	chartInnerHeight: number;
}

export function formatNumber(value: number): string {
	if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;

	if (value >= 1e3) return `${(value / 1e3).toFixed(0)}k`;

	return value.toFixed(0);
}

export function buildLinePath({
	y,
	getXCoord,
	getYCoord,
}: BuildLinePathParams) {
	let path = "";

	for (let i = 0; i < y.length; i++) {
		const xData = getXCoord(i);
		const yData = getYCoord(y[i]);

		if (i === 0) {
			path = `M ${xData} ${yData}`;
		} else {
			path += ` L ${xData} ${yData}`;
		}
	}

	return path;
}

export function buildAreaPath({
	y,
	getXCoord,
	getYCoord,
	marginTop,
	chartInnerHeight,
}: BuildAreaPathParams) {
	let path = "";

	for (let i = 0; i < y.length; i++) {
		const x = getXCoord(i);
		const yData = getYCoord(y[i]);

		if (i === 0) {
			path = `M ${x} ${yData}`;
		} else {
			path += ` L ${x} ${yData}`;
		}
	}

	path += ` L ${getXCoord(y.length - 1)} ${marginTop + chartInnerHeight}`;
	path += ` L ${getXCoord(0)} ${marginTop + chartInnerHeight} Z`;

	return path;
}
