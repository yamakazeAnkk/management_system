import { useState } from 'react';
import { message } from 'antd';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: Array<{ id: string; name: string }>;
  };
}

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    setIsLoading(true);
    
    try {
      // Mock API call - simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      if (credentials.username === 'admin' && credentials.password === 'admin') {
        const mockResponse: LoginResponse = {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          user: {
            id: '1',
            username: 'admin',
            email: 'admin@example.com',
            firstName: 'Nguyễn',
            lastName: 'Văn A',
            roles: [{ id: '1', name: 'Admin' }]
          }
        };
        
        message.success('Đăng nhập thành công!');
        return mockResponse;
      } else {
        throw new Error('Tên đăng nhập hoặc mật khẩu không đúng');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Đăng nhập thất bại';
      message.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading
  };
};
