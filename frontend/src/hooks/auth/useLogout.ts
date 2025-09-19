import { message } from 'antd';

export const useLogout = () => {
  const logout = async (): Promise<void> => {
    try {
      // Mock API call - simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_data');
      
      message.success('Đăng xuất thành công!');
    } catch (error) {
      message.error('Đăng xuất thất bại');
      throw error;
    }
  };

  return {
    logout
  };
};
