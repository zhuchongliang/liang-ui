"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bound = bound;
exports.rubberbandIfOutOfBounds = rubberbandIfOutOfBounds;

function bound(min, max, position) {
  if (position < min) {
    return min;
  }

  if (position > max) {
    return max;
  }

  return position;
}

function rubberband(distance, dimension, constant) {
  return distance * dimension * constant / (dimension + distance * constant);
}

function rubberbandIfOutOfBounds(constant, dimension, max, min, position) {
  if (constant === 0) return bound(min, max, position);

  if (position > max) {
    return rubberband(position - max, dimension, constant) + max;
  }

  if (position < min) {
    return -rubberband(min - position, dimension, constant) + min;
  }

  return position;
}