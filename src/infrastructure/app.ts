import { Config } from '@infra/config'
import { MongoConnection, UserRepository } from '@infra/db'
import { BcryptAdapter, JWTAdapter, PinoAdapter } from '@infra/adapter'

export class Application {
  private config: Config

  constructor () {
    this.config = new Config()
  }

  public async initialize () {
    const bcryptAdapter = new BcryptAdapter(this.config.passwordRounds)
    const jwtAdapter = new JWTAdapter(this.config.tokenSecret, this.config.tokenExpire)

    const logger = new PinoAdapter()

    const mongodb = new MongoConnection(this.config.mongoUrl)
    await mongodb.connect()

    const userRepository = new UserRepository(mongodb, logger, 'user')
  }
}
