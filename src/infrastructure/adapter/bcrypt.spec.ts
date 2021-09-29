import { BcryptAdapter } from './bcrypt'

test('test bcrypt adapter', async () => {
  const secret = new BcryptAdapter(10)
  const hash = await secret.hash('1234')

  expect(await secret.compare('123', hash)).toBeFalsy()
  expect(await secret.compare('1234', hash)).toBeTruthy()
})
