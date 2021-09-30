import { Config } from './config'
import { BcryptAdapter, JWTAdapter } from './adapter'
import { MongoConnection } from './db'

export class Application {
  private config: Config

  constructor () {
    this.config = new Config()
  }

  public async initialize () {
    const bcryptAdapter = new BcryptAdapter(this.config.passwordRounds)
    const jwtAdapter = new JWTAdapter(this.config.tokenSecret, this.config.tokenExpire)

    const mongodb = new MongoConnection(this.config.mongoUrl)
    await mongodb.connect()
  }
}
