import { Config } from '@infra/config'
import { MongoConnection, UserRepository } from '@infra/db'
import { BcryptAdapter, JWTAdapter, PinoAdapter } from '@infra/adapter'
import { AuthCase, FindUserByEmailS, HashComparatorS, HasherS, LoggerS, TokenS, TokenValidationS } from '@app'
import { Container } from 'inversify'

export class Application {
  private config: Config

  constructor () {
    this.config = new Config()
  }

  public async initializeAdapters (container: Container) {
    const mongodb = new MongoConnection(this.config.mongoUrl)
    await mongodb.connect()

    container.bind(MongoConnection).toConstantValue(mongodb)

    container.bind(BcryptAdapter).toConstantValue(new BcryptAdapter(this.config.passwordRounds))
    container.bind(HasherS).toService(BcryptAdapter)
    container.bind(HashComparatorS).toService(BcryptAdapter)

    container.bind(JWTAdapter).toConstantValue(new JWTAdapter(
      this.config.tokenSecret, this.config.tokenExpire
    ))
    container.bind(TokenS).toService(JWTAdapter)
    container.bind(TokenValidationS).toService(JWTAdapter)

    container.bind(LoggerS).to(PinoAdapter)
  }

  public async initializeRepository (container: Container) {
    container.bind(UserRepository).toConstantValue(
      new UserRepository(
        container.get(MongoConnection),
        container.get(LoggerS),
        'user'
      )
    )
    container.bind(FindUserByEmailS).toService(UserRepository)
  }

  public async initializeCases (container: Container) {
    container.bind(AuthCase).toSelf()
  }

  public async initialize () {
    const container = new Container()
    await this.initializeAdapters(container)
    await this.initializeRepository(container)
    await this.initializeCases(container)
  }
}
