import { User } from '../../domain'

export interface FindUserByEmail {

  findUserByEmail(email: string): User | null
}
