export interface BaseResponse {
  timestamp: string;
  status: string;
  message: string;
}

export interface SuccessResponse<T = unknown> extends BaseResponse {
  data: T;
}

export interface ErrorResponse extends BaseResponse {
  error: string;
}