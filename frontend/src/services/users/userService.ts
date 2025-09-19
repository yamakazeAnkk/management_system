import { message } from 'antd';
import apiClient from '../api/apiClient';
import { apiConfig } from '../api/apiConfig';
import { User, CreateUserRequest, UpdateUserRequest, UserListResponse } from '../../types';

class UserService {
  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: boolean;
  }): Promise<UserListResponse> {
    try {
      const response = await apiClient.get<UserListResponse>(
        apiConfig.endpoints.users.list,
        { params }
      );
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Lấy danh sách người dùng thất bại';
      message.error(errorMessage);
      throw error;
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const response = await apiClient.get<User>(apiConfig.endpoints.users.get(id));
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Lấy thông tin người dùng thất bại';
      message.error(errorMessage);
      throw error;
    }
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    try {
      const response = await apiClient.post<User>(
        apiConfig.endpoints.users.create,
        userData
      );
      message.success('Tạo người dùng thành công');
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Tạo người dùng thất bại';
      message.error(errorMessage);
      throw error;
    }
  }

  async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    try {
      const response = await apiClient.put<User>(
        apiConfig.endpoints.users.update(id),
        userData
      );
      message.success('Cập nhật người dùng thành công');
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Cập nhật người dùng thất bại';
      message.error(errorMessage);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await apiClient.delete(apiConfig.endpoints.users.delete(id));
      message.success('Xóa người dùng thành công');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Xóa người dùng thất bại';
      message.error(errorMessage);
      throw error;
    }
  }

  async changePassword(id: string, passwords: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> {
    try {
      await apiClient.post(
        apiConfig.endpoints.users.changePassword(id),
        passwords
      );
      message.success('Đổi mật khẩu thành công');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Đổi mật khẩu thất bại';
      message.error(errorMessage);
      throw error;
    }
  }

  async bulkDeleteUsers(ids: string[]): Promise<void> {
    try {
      await apiClient.post('/users/bulk-delete', { ids });
      message.success(`Đã xóa ${ids.length} người dùng`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Xóa nhiều người dùng thất bại';
      message.error(errorMessage);
      throw error;
    }
  }
}

export default new UserService();
