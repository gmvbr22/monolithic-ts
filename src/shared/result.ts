/**
 * Resultado: da operação
 */
export class Result<R, E> {
  private _result?: R
  private _error?: E

  constructor (result?: R, error?: E) {
    this._result = result
    this._error = error
  }

  static ok <R> (result: R): Result<R, any> {
    return new Result(result, null)
  }

  static error <E> (error: E): Result<any, E> {
    return new Result(null, error)
  }

  public get result () :R|undefined {
    return this._result
  }

  public get error () :E|undefined {
    return this._error
  }

  public get isError () : boolean {
    return this._error != null
  }

  public get isResult () : boolean {
    return this._result != null
  }
}

export type ResultAsync<R, E> = Promise<Result<R, E>>
