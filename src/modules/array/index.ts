export function shuffle<A>(array: A[]) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export function isKindedListEqual<A extends { kind: string }>(
  thisArray: A[], 
  thatArray: A[],
  equalityFunction: (thisItem: A, thatItem: A) => boolean,
) {
  for (let i = 0; i < thisArray.length; i++) {
    const thisItem = thisArray[i]
    const thatItem = thatArray[i]

    const isItemEqual = equalityFunction(thisItem, thatItem)
    const isKindDifferent = thisItem.kind !== thatItem.kind
    
    if (!isItemEqual && isKindDifferent) {
      return false
    }
  }

  return true
}