export interface TokenValidation<T> {
 validate(token: string): Promise<T|undefined>
}
