import 'reflect-metadata'
import { Container } from 'inversify'
import { SecretSymbol } from './application'
import { BcryptAdapter } from './infrastructure'

/**
 * Injeção de dependências
 */
export async function initContainer () {
  const container = new Container()
  //
  // application/services
  //
  container.bind(SecretSymbol)
    .toConstantValue(new BcryptAdapter(11))
}
