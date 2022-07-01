// A wrapper around JS arrays that allows you to access elements by any index,
// but instead of returning `undefined`, we compute the modulo and return the
// "looped" element.
//
// As an example, if you have an array of length 3, and access the element
// at index 4, we'll return the element at index 1. If you access index 3, we'll
// return the element at index 0.
export class LoopedList<T> {
  constructor(readonly items: readonly T[]) {}

  get(index: number) {
    return this.items[this.#computeLoopedIndex(index)];
  }

  #computeLoopedIndex(index: number) {
    const indexOffset = index % this.items.length;
    // Make sure this isn't a negative index and support negative indices
    // by treating it as going back from the end of the array.
    return indexOffset < 0 ? indexOffset + this.items.length : indexOffset;
  }
}
