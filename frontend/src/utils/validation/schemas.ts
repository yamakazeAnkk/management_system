export const VALIDATION_SCHEMAS = {
  // Email validation
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  // Phone validation (Vietnamese format)
  PHONE: /^(\+84|84|0)[1-9][0-9]{8}$/,
  
  // Username validation (alphanumeric + underscore)
  USERNAME: /^[a-zA-Z0-9_]{3,50}$/,
  
  // Password validation (at least 6 characters)
  PASSWORD: /^.{6,}$/,
  
  // Vietnamese name validation
  VIETNAMESE_NAME: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÂÊÔƠưăâêôơ\s]+$/,
} as const;

export const VALIDATION_MESSAGES = {
  REQUIRED: 'Trường này là bắt buộc',
  EMAIL_INVALID: 'Email không hợp lệ',
  PHONE_INVALID: 'Số điện thoại không hợp lệ',
  USERNAME_INVALID: 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới',
  PASSWORD_TOO_SHORT: 'Mật khẩu phải có ít nhất 6 ký tự',
  NAME_INVALID: 'Tên chỉ được chứa chữ cái và khoảng trắng',
  MIN_LENGTH: (min: number) => `Tối thiểu ${min} ký tự`,
  MAX_LENGTH: (max: number) => `Tối đa ${max} ký tự`,
} as const;
