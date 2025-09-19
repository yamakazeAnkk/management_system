export interface BaseResponse {
  success: boolean;
  message?: string;
  timestamp: string;
}

export interface SuccessResponse<T = any> extends BaseResponse {
  success: true;
  data: T;
}

export interface ErrorResponse extends BaseResponse {
  success: false;
  error: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}
