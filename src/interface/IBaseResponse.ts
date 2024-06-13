export default interface BaseResponse<T> {
    success: boolean;
    object: T;
}
