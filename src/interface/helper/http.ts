import { HttpError, HttpReply } from '@app'
import { Result } from '@shared'

export function handleError (result: Result<any, HttpError>, reply: HttpReply): boolean {
  if (result.isError) {
    reply.code(result.error.errorCode).send(result.error)
    return true
  }
  return false
}
