import Pino from 'pino'
import { Logger } from '@app'

export class PinoAdapter implements Logger {
  private pino: Pino.Logger

  constructor () {
    this.pino = Pino()
  }

  public debug (message: string, ...args: unknown[]) {
    return this.pino.debug(message, ...args)
  }

  public info (message: string, ...args: unknown[]) {
    return this.pino.info(message, ...args)
  }

  public warn (message: string, ...args: unknown[]) {
    return this.pino.warn(message, ...args)
  }

  public error (message: string, ...args: unknown[]) {
    return this.pino.error(message, ...args)
  }

  public fatal (message: string, ...args: unknown[]) {
    return this.pino.fatal(message, ...args)
  }

  public trace (message: string, ...args: unknown[]) {
    return this.pino.trace(message, ...args)
  }
}
