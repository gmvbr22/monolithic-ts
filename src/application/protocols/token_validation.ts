export interface TokenValidation {
 validate<T>(token: string): Promise<T|undefined>
}
