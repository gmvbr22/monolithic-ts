/**
 * Entidade: Usuário
 */
export class User {
  private id: string;
  private email: string
  private password?: string
  private name?: string

  constructor (id: string, email: string) {
    this.id = id
    this.email = email
  }

  public getId (): string {
    return this.id
  }

  public setId (id: string): void {
    this.id = id
  }

  public getEmail (): string {
    return this.email
  }

  public setEmail (email: string): void {
    this.email = email
  }

  public getPassword (): string | undefined {
    return this.password
  }

  public setPassword (password?: string): void {
    this.password = password
  }

  public getName (): string | undefined {
    return this.name
  }

  public setName (name: string): void {
    this.name = name
  }
}
