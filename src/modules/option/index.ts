export type Option<A> = Some<A> | None

export interface Some<A> {
  kind: 'some'
  value: A
}

export interface None {
  kind: 'none'
}

export function Some<A>(value: A): Option<A> {
  return { kind: 'some', value }
}

export function None<A>(): Option<A> {
  return { kind: 'none' }
}

export function map<A, B>(fn: (value: A) => B, option: Option<A>): Option<B> {
  switch (option.kind) {
    case 'some':
      return Some(fn(option.value))
    case 'none':
      return None()
  }
}

export function fold<A, B>(ifSome: (value: A) => B, ifNone: () => B, option: Option<A>): B {
  switch (option.kind) {
    case 'some':
      return ifSome(option.value)
    case 'none':
      return ifNone()
  }
}

export function unpack<A>(orElse: A, option: Option<A>): A {
  switch (option.kind) {
    case 'some':
      return option.value
    case 'none':
      return orElse
  }
}

export function when<A>(condition: boolean, value: A): Option<A> {
  if (condition) {
    return Some(value);
  }
  return None();
}

export function fromNullable<A>(value: A | null | undefined): Option<A> {
  if (value !== undefined && value !== null) {
    return Some(value)
  }
  return None();
}

export function isNone<A>(option: Option<A>): option is None {
  return option.kind === 'none';
}

export function isSome<A>(option: Option<A>): option is Some<A> {
  return option.kind === 'some';
}