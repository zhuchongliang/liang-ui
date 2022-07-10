function bound(min: number, max: number, position: number): number {
	if (position < min) {
		return min;
	}
	if (position > max) {
		return max;
	}
	return position;
}
function rubberband(
	distance: number,
	dimension: number,
	constant: number
): number {
	return (distance * dimension * constant) / (dimension + distance * constant);
}
function rubberbandIfOutOfBounds(
	constant: number,
	dimension: number,
	max: number,
	min: number,
	position: number
): number {
	if (constant === 0) return bound(min, max, position);
	if (position > max) {
		return rubberband(position - max, dimension, constant) + max;
	}
	if (position < min) {
		return -rubberband(min - position, dimension, constant) + min;
	}
	return position;
}
export {
	bound,
	rubberbandIfOutOfBounds
};