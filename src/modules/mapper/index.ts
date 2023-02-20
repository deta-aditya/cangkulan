import type { Dispatch, SetStateAction } from "react"

export const mapInitializer = <TState, TArgs extends any[]>(
  initializer: (...args: TArgs) => TState,
  setter: Dispatch<SetStateAction<TState>>
) => {
  return (...args: TArgs) => setter(initializer(...args))
}

export const mapCommand = <TState, TArgs extends any[]>(
  command: (current: TState, ...args: TArgs) => TState, 
  setter: Dispatch<SetStateAction<TState>>
) => {
  return (...args: TArgs) => setter(current => command(current, ...args))
}

// export const mapCommand0 = <TState>(
//   command: (current: TState) => TState, 
//   setter: Dispatch<SetStateAction<TState>>
// ) => {
//   return () => setter(command)
// }

// export const mapCommand1 = <TState, TArg1>(
//   command: (current: TState, a1: TArg1) => TState, 
//   setter: Dispatch<SetStateAction<TState>>
// ) => {
//   return (a1: TArg1) => setter(current => command(current, a1))
// }

// export const mapCommand2 = <TState, A2>(
//   command: (current: TState, a1: A1, a2: A2) => TState, 
//   setter: Dispatch<SetStateAction<TState>>
// ) => {
//   return (a1: A1, a2: A2) => setter(current => command(current, a1, a2))
// }