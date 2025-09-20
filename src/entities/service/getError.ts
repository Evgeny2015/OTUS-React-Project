import type { ResponseError } from ".."

export const getError = (error: ResponseError): string => {
    return error.data.errors.map(x => x.message).join('\n')
}