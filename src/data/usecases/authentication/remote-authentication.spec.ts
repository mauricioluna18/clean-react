import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthetication } from './remote-authentication'
import { mockAuthentication } from '../../../domain/test/mock-authentication'
import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthetication
  httpPostClientSpy: HttpPostClientSpy
}
const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthetication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthetication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationsParams = mockAuthentication()
    await sut.auth(authenticationsParams)
    expect(httpPostClientSpy.body).toEqual(authenticationsParams)
  })
})
