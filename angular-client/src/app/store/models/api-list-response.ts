export class ApiListResponse<T> {
    data: T[];
    returnCode: number;
    errorMessage: string;
}
