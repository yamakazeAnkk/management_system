export const HTTP_STATUS = {
  // Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  
  // Client Error
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  
  // Server Error
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

export const API_ERROR_MESSAGES = {
  [HTTP_STATUS.BAD_REQUEST]: 'Yêu cầu không hợp lệ',
  [HTTP_STATUS.UNAUTHORIZED]: 'Không có quyền truy cập',
  [HTTP_STATUS.FORBIDDEN]: 'Bị cấm truy cập',
  [HTTP_STATUS.NOT_FOUND]: 'Không tìm thấy dữ liệu',
  [HTTP_STATUS.CONFLICT]: 'Dữ liệu đã tồn tại',
  [HTTP_STATUS.UNPROCESSABLE_ENTITY]: 'Dữ liệu không hợp lệ',
  [HTTP_STATUS.TOO_MANY_REQUESTS]: 'Quá nhiều yêu cầu',
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: 'Lỗi máy chủ',
  [HTTP_STATUS.SERVICE_UNAVAILABLE]: 'Dịch vụ không khả dụng',
} as const;
