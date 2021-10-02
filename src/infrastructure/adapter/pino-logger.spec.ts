import { Logger } from '@app'
import { PinoAdapter } from '@infra/adapter/pino-logger'

test('Adapter: PinoAdapter', async () => {
  const adapter: Logger = new PinoAdapter()

  adapter.debug('test debug')
  adapter.info('test info')
  adapter.warn('test warn')
  adapter.error('test error')
  adapter.fatal('test fatal')
  adapter.trace('test trace')
})
