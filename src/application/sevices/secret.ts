/**
 * Interface para implementar
 * a senha do usuário
 */
export interface Secret {

    /**
     * Gera o hash
     *
     * @param password Senha
     */
    hash(password: string): Promise<string>

    /**
     * Compara a senha com o hash
     *
     * @param password Senha
     * @param hash Hash gerado por hash()
     */
    compare(password: string, hash: string): Promise<boolean>
}
