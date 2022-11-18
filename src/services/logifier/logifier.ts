const logifier = <F extends (...args: any) => any>(f: F) => (...args: Parameters<F>): ReturnType<F> => {
  console.log(`calling ${f.name}`)
  return f(args)
}

export default logifier