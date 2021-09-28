import { Secret } from '../../application'
import { compareSync, hashSync } from 'bcrypt'
import { injectable } from 'inversify'

/**
 * Adapter: Bcrypt
 * Implementa: application/services/secret
 */
@injectable()
export class BcryptAdapter implements Secret {
  private saltOrRounds: string | number

  constructor (saltOrRounds: string | number) {
    this.saltOrRounds = saltOrRounds
  }

  public async hash (password: string): Promise<string> {
    return hashSync(password, this.saltOrRounds)
  }

  public async compare (password: string, hash: string): Promise<boolean> {
    return compareSync(password, hash)
  }
}
