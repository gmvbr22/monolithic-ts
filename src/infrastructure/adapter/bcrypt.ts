import assert from 'assert'
import { compareSync, hashSync } from 'bcrypt'
import { HashComparator, Hasher } from '../../application'

export class BcryptAdapter implements Hasher, HashComparator {
  private saltOrRounds: string | number

  constructor (saltOrRounds: string | number) {
    this.saltOrRounds = saltOrRounds
    assert(
      typeof this.saltOrRounds === 'string' ||
      typeof this.saltOrRounds === 'number'
    )
  }

  public async hash (password: string): Promise<string> {
    return hashSync(password, this.saltOrRounds)
  }

  public async compare (password: string, hash: string): Promise<boolean> {
    return compareSync(password, hash)
  }
}
