import { RemoteAuthentication } from "./remote-authentication"
import { mockAccountModel, mockAuthentication } from '@/domain/test'
import { HttpPostClientSpy } from "@/data/test/mock-http-client"
import { InvalidCredentialsError, UnexpectedError } from "@/domain/erros"
import { HttpStatusCode } from "@/data/protocols/http"
import { AuthenticationParams } from "@/domain/usecases"
import { AccountModel } from "@/domain/models"
import faker from 'faker'

type SutTypes = {
    sut: RemoteAuthentication
    httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)

    return {
        sut, 
        httpPostClientSpy
    }
}  

describe('RemoteAuthentication', () => {
    test('Should Call HttpPostClient with correct URL', async () => {
        const url = faker.internet.url()
        const { sut, httpPostClientSpy} = makeSut(url)
        await sut.auth(mockAuthentication())
        expect(httpPostClientSpy.url).toBe(url)
    })

    test('Should Call HttpPostClient with correct body', async () => {
        const { sut, httpPostClientSpy} = makeSut()
        const AuthenticatonParams = mockAuthentication()
        await sut.auth(AuthenticatonParams)
        expect(httpPostClientSpy.body).toEqual(AuthenticatonParams)
    })
    test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
        const { sut, httpPostClientSpy} = makeSut()
        httpPostClientSpy.response ={
            statusCode: HttpStatusCode.unauthorized
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })
    test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
        const { sut, httpPostClientSpy} = makeSut()
        httpPostClientSpy.response ={
            statusCode: HttpStatusCode.badRequest
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })
    test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
        const { sut, httpPostClientSpy} = makeSut()
        httpPostClientSpy.response ={
            statusCode: HttpStatusCode.notFound
        }
        const promise = sut.auth(mockAuthentication())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })
    test('Should return a AccountModel if HttpPostClient returns 200', async () => {
        const { sut, httpPostClientSpy} = makeSut()
        const httpResult = mockAccountModel()
        httpPostClientSpy.response ={
            statusCode: HttpStatusCode.ok,
            body: httpResult
        }
        const account = await sut.auth(mockAuthentication())
        expect(account).toEqual(httpResult)
    })
})