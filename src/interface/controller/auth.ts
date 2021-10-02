import { AuthCase, HttpReply, HttpRequest } from '@app'
import { handleError } from '@interface/helper'

export class AuthController {
  private authCase: AuthCase

  public constructor (authCase: AuthCase) {
    this.authCase = authCase
  }

  public async login (
    request: HttpRequest<{
      Body: {
        email: string, password: string
      }
    }>,
    reply: HttpReply
  ) {
    const { email, password } = request.body
    const response = await this.authCase.login(email, password)
    if (!handleError(response, reply)) {
      return reply.code(200).send(response.result)
    }
  }
}
