export class ApiResponse<T> {
    data: T;
    returnCode: number;
    errorMessage: string;
}
