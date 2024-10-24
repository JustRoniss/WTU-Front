export interface ApiResponse<T>{
    message: string;
    status: number;
    links? : { [key: string]: string};
    timestamp: string;
    data: T;
}