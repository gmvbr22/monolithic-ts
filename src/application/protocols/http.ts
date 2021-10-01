export type HTTPBody = unknown
export type HTTPHeader = unknown

export interface HTTPRequestType {
  Body?: HTTPBody
  Headers?: HTTPHeader
}

export interface HTTPRequest<H extends HTTPRequestType = HTTPRequestType> {
  body: H['Body'],
  headers: H['Headers']
}

export interface HTTPReply {
  code: (code: number) => HTTPReply
  send: (payload: any) => HTTPReply
}

export interface HTTPError {
  success: false,
  errorCode: number,
  errorMessage: string
}
