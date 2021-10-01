import { Result, ResultAsync } from '../../shared/result'
import { FindUserByEmail, FindUserByEmailS } from '@app/repository'
import { HashComparator, HashComparatorS, Token, TokenResult, TokenS } from '@app/protocols'
import { inject, injectable } from 'inversify'

@injectable()
export class AuthCase {
  private user: FindUserByEmail
  private hasher: HashComparator
  private token: Token

  constructor (
    @inject(TokenS) token: Token,
    @inject(FindUserByEmailS) user: FindUserByEmail,
    @inject(HashComparatorS) comparator: HashComparator
  ) {
    this.user = user
    this.hasher = comparator
    this.token = token
  }

  public async login (email: string, password: string): ResultAsync<TokenResult, string> {
    const user = await this.user.findUserByEmail(email)
    if (user == null) {
      return Result.error('Invalid User')
    }
    const isValidPassword = await this.hasher.compare(password, user.password)
    if (!isValidPassword) {
      return Result.error('Invalid User')
    }
    const tokenResult = await this.token.create({
      sub: user.id,
      role: user.role
    })
    return Result.ok(tokenResult)
  }
}
