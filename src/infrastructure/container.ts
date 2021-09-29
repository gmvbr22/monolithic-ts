import { BcryptAdapter, JWTAdapter } from './adapter'
import { Config } from './config'

/**
 * Inicio da infrastructure
 */
export async function initContainer () {
  const config = new Config()

  const bcryptAdapter = new BcryptAdapter(config.passwordRounds)
  const jwtAdapter = new JWTAdapter(config.tokenSecret, config.tokenExpire)
}
