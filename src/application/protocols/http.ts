export type HTTPBody = unknown
export type HTTPHeader = unknown

export interface HttpRequestType {
  Body?: HTTPBody
  Headers?: HTTPHeader
}

export interface HttpRequest<types extends HttpRequestType = HttpRequestType> {
  body: types['Body'],
  headers: types['Headers']
}

export interface HttpReply {
  code: (code: number) => HttpReply
  send: (payload: any) => HttpReply
}

export interface HttpError {
  success: false,
  errorCode: number,
  errorMessage: string
}

export interface HttpRouter {
  url: string,
  method: 'DELETE' | 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT' | 'OPTIONS'
  schema: {
    body?: any
  }
  controller: (request: HttpRequest, reply: HttpReply)=> Promise<any>
}

export type HttpRouteList = HttpRouter[]

export interface HttpFramework {

  registry(list: HttpRouteList)

  listen(port: number, host: string)
}
