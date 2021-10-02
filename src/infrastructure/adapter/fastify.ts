import { HttpFramework, HttpRouteList } from '@app'
import fastify, { FastifyInstance } from 'fastify'

export class FastifyServer implements HttpFramework {
  private fastify: FastifyInstance

  public constructor () {
    this.fastify = fastify()
  }

  public registry (list: HttpRouteList) {
    for (const route of list) {
      this.fastify.route({
        url: route.url,
        method: route.method,
        schema: {
          body: route.schema.body
        },
        handler: async (req, res) => route.controller(req, res)
      })
    }
  }

  public async listen (port: number, host:string) {
    return this.fastify.listen(port, host)
  }
}
