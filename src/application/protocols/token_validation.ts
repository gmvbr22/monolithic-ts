export interface TokenValidation {
 validate<T>(token: string): Promise<T|undefined>
}

export const TokenValidationS = Symbol.for('TokenValidation')
