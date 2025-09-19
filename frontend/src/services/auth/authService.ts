import { message } from 'antd';
import apiClient from '../api/apiClient';
import { apiConfig } from '../api/apiConfig';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../../types';

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>(
        apiConfig.endpoints.auth.login,
        credentials
      );
      
      message.success('Đăng nhập thành công');
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại';
      message.error(errorMessage);
      throw error;
    }
  }

  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<RegisterResponse>(
        apiConfig.endpoints.auth.register,
        userData
      );
      
      message.success('Đăng ký thành công');
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Đăng ký thất bại';
      message.error(errorMessage);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post(apiConfig.endpoints.auth.logout);
      message.success('Đăng xuất thành công');
    } catch (error: any) {
      console.error('Logout error:', error);
      // Don't show error message for logout
    }
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const response = await apiClient.post(
        apiConfig.endpoints.auth.refresh,
        { refreshToken }
      );
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Làm mới token thất bại';
      message.error(errorMessage);
      throw error;
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      await apiClient.post(apiConfig.endpoints.auth.forgotPassword, { email });
      message.success('Email khôi phục mật khẩu đã được gửi');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Gửi email khôi phục thất bại';
      message.error(errorMessage);
      throw error;
    }
  }

  async resetPassword(token: string, password: string): Promise<void> {
    try {
      await apiClient.post(apiConfig.endpoints.auth.resetPassword, {
        token,
        password,
      });
      message.success('Đặt lại mật khẩu thành công');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Đặt lại mật khẩu thất bại';
      message.error(errorMessage);
      throw error;
    }
  }
}

export default new AuthService();
