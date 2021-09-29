import { compareSync, hashSync } from 'bcrypt'
import { HashComparator, Hasher } from '../../application'

/**
 * Adapter: Bcrypt
 */
export class BcryptAdapter implements Hasher, HashComparator {
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
