export interface HTTPRequest<Body, Headers> {
  body: Body,
  headers: Headers
}

export interface HTTPReply {
  code: (code: number) => HTTPReply
  send: (payload: any) => HTTPReply
}
