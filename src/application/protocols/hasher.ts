export interface Hasher {
  hash(password: string): Promise<string>
}

export const HasherS = Symbol.for('Hasher')
