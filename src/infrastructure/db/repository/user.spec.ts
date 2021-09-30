import { PinoAdapter } from '../../adapter/pino-logger'
import { MongoConnection } from '../mongodb'
import { UserRepository } from './user'

describe('UserRepository', () => {
  let user: UserRepository
  const connection = new MongoConnection(process.env.MONGO_URL)

  beforeAll(async () => {
    await connection.connect()
    user = new UserRepository(connection, new PinoAdapter(), 'user')
  })

  afterAll(async () => {
    await connection.client.close()
  })

  test('findUserByEmail', async () => {
    const newUser = {
      email: 'test@test.test',
      role: 'test',
      password: 'xxx'
    }
    await connection.db.collection('user').insertOne(newUser)

    const invalidUser = await user.findUserByEmail('error@test.test')
    expect(invalidUser).toBeNull()

    const validUser = await user.findUserByEmail('test@test.test')
    expect(validUser).not.toBeNull()

    expect(validUser.email).toBe(newUser.email)
    expect(validUser.password).toBe(newUser.password)
    expect(validUser.role).toBe(newUser.role)
  })
})
