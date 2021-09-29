import { BcryptAdapter } from './infrastructure'

/**
 * Injeção de dependências
 */
export async function initContainer () {
  const bcryptAdapter = new BcryptAdapter(11)
}
