import type { ErrorMessage } from "."

export type ResponseError = {
    status: number,
    data: {
        errors: ErrorMessage[]
    }
}