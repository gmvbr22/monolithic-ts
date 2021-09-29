import { BcryptAdapter } from './bcrypt'

test('Adapter: BcryptAdapter', async () => {
  const secret = new BcryptAdapter(10)
  const hash = await secret.hash('admin')

  expect(await secret.compare('user', hash)).toBeFalsy()
  expect(await secret.compare('admin', hash)).toBeTruthy()
})
