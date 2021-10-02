import { Config } from '@infra/config'
import { MongoConnection, UserRepository } from '@infra/db'
import { BcryptAdapter, JWTAdapter, PinoAdapter } from '@infra/adapter'
import { AuthCase } from '@app'
import { AuthController } from '@interface'
import { AuthRoutes } from '@interface/routes/auth'
import { FastifyServer } from './adapter/fastify'

export class Application {
  private config: Config

  constructor () {
    this.config = new Config()
  }

  public async initialize () {
    const logger = new PinoAdapter()

    const mongodb = new MongoConnection(this.config.mongoUrl)
    await mongodb.connect()

    const bcrypt = new BcryptAdapter(this.config.passwordRounds)
    const jwt = new JWTAdapter(this.config.tokenSecret, this.config.tokenExpire)

    const userRepository = new UserRepository(mongodb, logger, 'User')
    const authUseCase = new AuthCase(jwt, userRepository, bcrypt)
    const authController = new AuthController(authUseCase)
    const authRouter = new AuthRoutes(authController)

    const fastify = new FastifyServer()
    fastify.registry(authRouter.initialize())

    await fastify.listen(this.config.serverPort, this.config.serverHost)
  }
}
