import { injectable } from 'inversify'
import { Db, MongoClient } from 'mongodb'

@injectable()
export class MongoConnection {
  public url: string
  public client: MongoClient
  public db: Db

  public constructor (url: string) {
    this.url = url
  }

  public async connect () : Promise<void> {
    this.client = await MongoClient.connect(this.url)
    this.db = this.client.db()
  }
}
