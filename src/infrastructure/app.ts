import { Config } from './config'
import { BcryptAdapter, JWTAdapter } from './adapter'

export class Application {
  private config: Config

  constructor () {
    this.config = new Config()
  }

  public initialize () {
    const bcryptAdapter = new BcryptAdapter(this.config.passwordRounds)
    const jwtAdapter = new JWTAdapter(this.config.tokenSecret, this.config.tokenExpire)
  }
}
