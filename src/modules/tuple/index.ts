export type Tuple2<A, B> = [A, B];

export const tuple2 = <A, B>(a: A, b: B): Tuple2<A, B> => [a, b];
export const first = <A, B>(tuple2: Tuple2<A, B>) => tuple2[0];
export const second = <A, B>(tuple2: Tuple2<A, B>) => tuple2[1];