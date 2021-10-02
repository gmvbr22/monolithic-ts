import { User } from '@domain'
import { MongoConnection } from '@infra/db'
import { FindUserByEmail, Logger } from '@app'
import { Collection, FindOptions } from 'mongodb'

export class UserRepository implements FindUserByEmail {
  private mongo: MongoConnection
  private logger: Logger
  private collection: Collection

  constructor (mongo: MongoConnection, logger: Logger, collection: string) {
    this.mongo = mongo
    this.logger = logger
    this.collection = this.mongo.db.collection(collection)
  }

  public async findUserByEmail (email: string): Promise<User> {
    try {
      const query = {
        email: email.toLowerCase().trim()
      }
      const options: FindOptions = {
        projection: {
          _id: 1,
          email: 1,
          password: 1,
          role: 1
        }
      }
      const user = await this.collection.findOne(query, options)
      if (user != null) {
        return {
          id: user._id.toString(),
          email: user.email,
          password: user.password,
          role: user.role
        }
      }
    } catch (error) {
      this.logger.error(error)
    }
    return null
  }
}
