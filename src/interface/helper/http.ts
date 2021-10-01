import { HTTPError, HTTPReply } from '@app'
import { Result } from '@shared'

export function handleError (result: Result<any, HTTPError>, reply: HTTPReply): boolean {
  if (result.isError) {
    reply.code(result.error.errorCode).send(result.error)
    return true
  }
  return false
}
