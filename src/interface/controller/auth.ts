import { injectable } from 'inversify'
import { AuthCase, HTTPReply, HTTPRequest } from '@app'
import { handleError } from '@interface/helper'

@injectable()
export class AuthController {
  private authCase: AuthCase

  public constructor (authCase: AuthCase) {
    this.authCase = authCase
  }

  public async login (
    request: HTTPRequest<{
      Body: {
        email: string, password: string
      }
    }>,
    reply: HTTPReply
  ) {
    const { email, password } = request.body
    const response = await this.authCase.login(email, password)
    if (!handleError(response, reply)) {
      return reply.code(200).send(response.result)
    }
  }
}
