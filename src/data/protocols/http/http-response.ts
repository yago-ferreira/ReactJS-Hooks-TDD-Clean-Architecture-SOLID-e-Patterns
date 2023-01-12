export enum HttpStatusCode {
    ok = 20,
    noContent = 204,
    badRequest = 400,
    unauthorized = 401,
    notFound = 404,
    serverError = 500
}

export type HttpResponse<T>= {
    statusCode: HttpStatusCode 
    body? : T
}