import assert from 'assert'
import { sign, verify } from 'jsonwebtoken'
import { Token, TokenResult, TokenValidation } from '@app'
import { injectable } from 'inversify'

@injectable()
export class JWTAdapter implements Token, TokenValidation {
  private secret: string
  private expire: number

  constructor (secret: string, expire: number) {
    this.secret = secret
    this.expire = expire

    assert(typeof this.secret === 'string')
    assert(typeof this.expire === 'number')
  }

  public async create (payload: any): Promise<TokenResult> {
    const expireIn = Math.floor(Date.now() / 1000) + this.expire
    const data = Object.assign(payload, { exp: expireIn })
    const token = sign(data, this.secret)
    return {
      expire: expireIn,
      token
    }
  }

  public async validate<T> (token: string): Promise<T|null> {
    try {
      return verify(token, this.secret) as T
    } catch (err) {
      return null
    }
  }
}
