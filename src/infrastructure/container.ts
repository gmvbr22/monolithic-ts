import { BcryptAdapter } from './adapter'
import { JWTAdapter } from './adapter/jwt-token'

/**
 * Injeção de dependências
 */
export async function initContainer () {
  const bcryptAdapter = new BcryptAdapter(11)
  const jwtAdapter = new JWTAdapter()
}
