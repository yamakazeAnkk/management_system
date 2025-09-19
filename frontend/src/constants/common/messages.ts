export const MESSAGES = {
  // Success messages
  SUCCESS: {
    LOGIN: 'Đăng nhập thành công',
    LOGOUT: 'Đăng xuất thành công',
    REGISTER: 'Đăng ký thành công',
    UPDATE_PROFILE: 'Cập nhật thông tin thành công',
    CHANGE_PASSWORD: 'Đổi mật khẩu thành công',
    CREATE_USER: 'Tạo người dùng thành công',
    UPDATE_USER: 'Cập nhật người dùng thành công',
    DELETE_USER: 'Xóa người dùng thành công',
    CREATE_ROLE: 'Tạo vai trò thành công',
    UPDATE_ROLE: 'Cập nhật vai trò thành công',
    DELETE_ROLE: 'Xóa vai trò thành công',
    CREATE_DEPARTMENT: 'Tạo phòng ban thành công',
    UPDATE_DEPARTMENT: 'Cập nhật phòng ban thành công',
    DELETE_DEPARTMENT: 'Xóa phòng ban thành công',
  },

  // Error messages
  ERROR: {
    LOGIN_FAILED: 'Đăng nhập thất bại',
    INVALID_CREDENTIALS: 'Thông tin đăng nhập không chính xác',
    NETWORK_ERROR: 'Lỗi kết nối mạng',
    UNAUTHORIZED: 'Bạn không có quyền truy cập',
    FORBIDDEN: 'Truy cập bị từ chối',
    NOT_FOUND: 'Không tìm thấy dữ liệu',
    SERVER_ERROR: 'Lỗi máy chủ',
    VALIDATION_ERROR: 'Dữ liệu không hợp lệ',
    REQUIRED_FIELD: 'Trường này là bắt buộc',
    INVALID_EMAIL: 'Email không hợp lệ',
    INVALID_PHONE: 'Số điện thoại không hợp lệ',
    PASSWORD_TOO_WEAK: 'Mật khẩu quá yếu',
    PASSWORDS_NOT_MATCH: 'Mật khẩu không khớp',
    USERNAME_EXISTS: 'Tên người dùng đã tồn tại',
    EMAIL_EXISTS: 'Email đã tồn tại',
  },

  // Info messages
  INFO: {
    LOADING: 'Đang tải...',
    SAVING: 'Đang lưu...',
    DELETING: 'Đang xóa...',
    NO_DATA: 'Không có dữ liệu',
    SEARCH_PLACEHOLDER: 'Tìm kiếm...',
    SELECT_OPTION: 'Chọn một tùy chọn',
  },

  // Confirmation messages
  CONFIRM: {
    DELETE_USER: 'Bạn có chắc chắn muốn xóa người dùng này?',
    DELETE_ROLE: 'Bạn có chắc chắn muốn xóa vai trò này?',
    DELETE_DEPARTMENT: 'Bạn có chắc chắn muốn xóa phòng ban này?',
    LOGOUT: 'Bạn có chắc chắn muốn đăng xuất?',
    DISCARD_CHANGES: 'Bạn có chắc chắn muốn hủy các thay đổi?',
  },
} as const;
