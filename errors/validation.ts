//? Function to convert a mongoose error into human readable format for our frontend.

export default function formatValidationError(err: any) {
    const customError: any = {}
    for (const key in err.errors) {
        customError[key] = err.errors[key].message
    }
    return customError
}