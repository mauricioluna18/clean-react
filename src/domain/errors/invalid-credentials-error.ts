export class InvalidCredentialsError extends Error {
  constructor () {
    super('Credentials invalid')
    this.name = 'InvalidCredentialsError'
  }
}
