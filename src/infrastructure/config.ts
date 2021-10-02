import envSchema from 'env-schema'

export class Config {
  public serverPort = 8080;
  public serverHost = '0.0.0.0';
  public tokenSecret: string;
  public tokenExpire: number;
  public passwordRounds: number
  public mongoUrl: string

  constructor () {
    const env = envSchema({
      dotenv: true,
      schema: {
        type: 'object',
        properties: {
          HOST: { type: 'string', default: '0.0.0.0' },
          PORT: { type: 'number', default: 8080 },
          TOKEN_SECRET: { type: 'string' },
          TOKEN_EXPIRE: { type: 'number', default: 3600 },
          PASSWORD_ROUNDS: { type: 'number', default: 11 },
          MONGO_URL: { type: 'string' }
        },
        required: [
          'HOST',
          'PORT',
          'TOKEN_SECRET',
          'TOKEN_EXPIRE',
          'PASSWORD_ROUNDS',
          'MONGO_URL'
        ]
      }
    })
    this.serverPort = env.PORT as number
    this.serverHost = env.HOST as string
    this.tokenSecret = env.TOKEN_SECRET as string
    this.tokenExpire = env.TOKEN_EXPIRE as number
    this.passwordRounds = env.PASSWORD_ROUNDS as number
    this.mongoUrl = env.MONGO_URL as string
  }
}
