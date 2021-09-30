import { User } from '../../domain'

export interface FindUserByEmail {

  findUserByEmail(email: string): Promise<User | null>
}
