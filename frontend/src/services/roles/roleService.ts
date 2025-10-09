import { message } from 'antd';
import apiClient from '../api/apiClient';
import { apiConfig } from '../api/apiConfig';
import { Role, CreateRoleRequest, UpdateRoleRequest, RoleListResponse, Permission } from '../../types';

class RoleService {
  async getRoles(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: boolean;
  }): Promise<RoleListResponse> {
    try {
      const response = await apiClient.get<RoleListResponse>(
        apiConfig.endpoints.roles.list,
        { params }
      );
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Lấy danh sách vai trò thất bại';
      message.error(errorMessage);
      throw error;
    }
  }

  async getRoleById(id: string): Promise<Role> {
    try {
      const response = await apiClient.get<Role>(apiConfig.endpoints.roles.get(id));
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Lấy thông tin vai trò thất bại';
      message.error(errorMessage);
      throw error;
    }
  }

  async createRole(roleData: CreateRoleRequest): Promise<Role> {
    try {
      const response = await apiClient.post<Role>(
        apiConfig.endpoints.roles.create,
        roleData
      );
      message.success('Tạo vai trò thành công');
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Tạo vai trò thất bại';
      message.error(errorMessage);
      throw error;
    }
  }

  async updateRole(id: string, roleData: UpdateRoleRequest): Promise<Role> {
    try {
      const response = await apiClient.put<Role>(
        apiConfig.endpoints.roles.update(id),
        roleData
      );
      message.success('Cập nhật vai trò thành công');
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Cập nhật vai trò thất bại';
      message.error(errorMessage);
      throw error;
    }
  }

  async deleteRole(id: string): Promise<void> {
    try {
      await apiClient.delete(apiConfig.endpoints.roles.delete(id));
      message.success('Xóa vai trò thành công');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Xóa vai trò thất bại';
      message.error(errorMessage);
      throw error;
    }
  }

  async bulkDeleteRoles(ids: string[]): Promise<void> {
    try {
      await apiClient.post('/roles/bulk-delete', { ids });
      message.success(`Đã xóa ${ids.length} vai trò`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Xóa nhiều vai trò thất bại';
      message.error(errorMessage);
      throw error;
    }
  }

  async getPermissions(): Promise<Permission[]> {
    try {
      const response = await apiClient.get<Permission[]>('/permissions');
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Lấy danh sách quyền thất bại';
      message.error(errorMessage);
      throw error;
    }
  }

  async getDepartments(): Promise<{ id: string; name: string }[]> {
    try {
      const response = await apiClient.get<{ id: string; name: string }[]>('/departments');
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Lấy danh sách phòng ban thất bại';
      message.error(errorMessage);
      throw error;
    }
  }

  async getRolesForDropdown(): Promise<{ id: string; name: string }[]> {
    try {
      const response = await apiClient.get<{ id: string; name: string }[]>('/roles/dropdown');
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Lấy danh sách vai trò thất bại';
      message.error(errorMessage);
      throw error;
    }
  }
}

export default new RoleService();
