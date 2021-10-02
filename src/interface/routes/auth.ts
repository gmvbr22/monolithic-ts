import { HttpRouteList } from '@app'
import { AuthController } from '@interface/controller'
import { LoginSchema } from '@interface/schema'

export class AuthRoutes {
  private authController: AuthController

  public constructor (authController: AuthController) {
    this.authController = authController
  }

  /**
   * Define as rotas utilizadas em Auth
   */
  public initialize (): HttpRouteList {
    return [
      {
        method: 'POST',
        url: '/login',
        schema: {
          body: LoginSchema
        },
        controller: this.authController.login
      }
    ]
  }
}
