import 'reflect-metadata'
import { JWTAdapter } from '@infra/adapter'

test('Adapter: JWTAdapter', async () => {
  const jwt = new JWTAdapter('password', 10)

  const token = await jwt.create({
    sub: 'admin user'
  })
  expect(typeof token.expire).toBe('number')
  expect(typeof token.token).toBe('string')

  const invalid = await jwt.validate('xxx')
  expect(invalid).toBeNull()

  const valid = await jwt.validate<{ sub: string }>(token.token)
  expect(valid).not.toBeNull()
  expect(valid.sub).toBe('admin user')
})
