import { message } from 'antd';
import apiClient from '../api/apiClient';
import { apiConfig } from '../api/apiConfig';
import { Department, CreateDepartmentRequest, UpdateDepartmentRequest, DepartmentListResponse } from '../../types';

class DepartmentService {
  async getDepartments(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: boolean;
  }): Promise<DepartmentListResponse> {
    try {
      const response = await apiClient.get<DepartmentListResponse>(
        apiConfig.endpoints.departments.list,
        { params }
      );
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Lấy danh sách phòng ban thất bại';
      message.error(errorMessage);
      throw error;
    }
  }

  async getDepartmentById(id: string): Promise<Department> {
    try {
      const response = await apiClient.get<Department>(apiConfig.endpoints.departments.get(id));
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Lấy thông tin phòng ban thất bại';
      message.error(errorMessage);
      throw error;
    }
  }

  async createDepartment(departmentData: CreateDepartmentRequest): Promise<Department> {
    try {
      const response = await apiClient.post<Department>(
        apiConfig.endpoints.departments.create,
        departmentData
      );
      message.success('Tạo phòng ban thành công');
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Tạo phòng ban thất bại';
      message.error(errorMessage);
      throw error;
    }
  }

  async updateDepartment(id: string, departmentData: UpdateDepartmentRequest): Promise<Department> {
    try {
      const response = await apiClient.put<Department>(
        apiConfig.endpoints.departments.update(id),
        departmentData
      );
      message.success('Cập nhật phòng ban thành công');
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Cập nhật phòng ban thất bại';
      message.error(errorMessage);
      throw error;
    }
  }

  async deleteDepartment(id: string): Promise<void> {
    try {
      await apiClient.delete(apiConfig.endpoints.departments.delete(id));
      message.success('Xóa phòng ban thành công');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Xóa phòng ban thất bại';
      message.error(errorMessage);
      throw error;
    }
  }

  async bulkDeleteDepartments(ids: string[]): Promise<void> {
    try {
      await apiClient.post('/departments/bulk-delete', { ids });
      message.success(`Đã xóa ${ids.length} phòng ban`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Xóa nhiều phòng ban thất bại';
      message.error(errorMessage);
      throw error;
    }
  }

  async getDepartmentTree(): Promise<Department[]> {
    try {
      const response = await apiClient.get<Department[]>('/departments/tree');
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Lấy cây phòng ban thất bại';
      message.error(errorMessage);
      throw error;
    }
  }
}

export default new DepartmentService();
