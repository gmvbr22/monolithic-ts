import 'reflect-metadata'
import { PinoAdapter } from '@infra/adapter'
import { UserRepository, MongoConnection } from '@infra/db'

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

    const invalidUser1 = await user.findUserByEmail('error@test.test')
    expect(invalidUser1).toBeNull()

    const invalidUser2 = await user.findUserByEmail(null)
    expect(invalidUser2).toBeNull()

    const validUser = await user.findUserByEmail('test@test.test')
    expect(validUser).not.toBeNull()

    expect(validUser.email).toBe(newUser.email)
    expect(validUser.password).toBe(newUser.password)
    expect(validUser.role).toBe(newUser.role)
  })
})
