export interface TokenResult {
  expire: number
  token: string
}

export interface Token {
 create(payload: any): Promise<TokenResult>
}
