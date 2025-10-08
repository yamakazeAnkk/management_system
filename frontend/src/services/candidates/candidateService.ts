import apiClient from '../api/apiClient';
import { 
  Candidate, 
  CreateCandidateRequest, 
  UpdateCandidateRequest, 
  CandidateListResponse,
  CandidateFilters 
} from '../../types/api/candidate';
import { PaginationParams } from '../../types/api/common';

class CandidateService {
  private baseUrl = '/candidates';

  async getCandidates(params?: PaginationParams & CandidateFilters): Promise<CandidateListResponse> {
    try {
      const response = await apiClient.get<CandidateListResponse>(this.baseUrl, { params });
      return response;
    } catch (error) {
      console.error('Error fetching candidates:', error);
      throw error;
    }
  }

  async getCandidateById(id: string): Promise<Candidate> {
    try {
      const response = await apiClient.get<Candidate>(`${this.baseUrl}/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching candidate:', error);
      throw error;
    }
  }

  async createCandidate(candidateData: CreateCandidateRequest): Promise<Candidate> {
    try {
      const response = await apiClient.post<Candidate>(this.baseUrl, candidateData);
      return response;
    } catch (error) {
      console.error('Error creating candidate:', error);
      throw error;
    }
  }

  async updateCandidate(id: string, candidateData: UpdateCandidateRequest): Promise<Candidate> {
    try {
      const response = await apiClient.put<Candidate>(`${this.baseUrl}/${id}`, candidateData);
      return response;
    } catch (error) {
      console.error('Error updating candidate:', error);
      throw error;
    }
  }

  async deleteCandidate(id: string): Promise<void> {
    try {
      await apiClient.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error('Error deleting candidate:', error);
      throw error;
    }
  }

  async bulkDeleteCandidates(ids: string[]): Promise<void> {
    try {
      await apiClient.delete(`${this.baseUrl}/bulk`, { data: { ids } });
    } catch (error) {
      console.error('Error bulk deleting candidates:', error);
      throw error;
    }
  }

  async updateCandidateStatus(id: string, status: string): Promise<Candidate> {
    try {
      const response = await apiClient.patch<Candidate>(`${this.baseUrl}/${id}/status`, { status });
      return response;
    } catch (error) {
      console.error('Error updating candidate status:', error);
      throw error;
    }
  }

  async addInterviewNotes(id: string, notes: string): Promise<Candidate> {
    try {
      const response = await apiClient.patch<Candidate>(`${this.baseUrl}/${id}/notes`, { notes });
      return response;
    } catch (error) {
      console.error('Error adding interview notes:', error);
      throw error;
    }
  }

  async rateCandidate(id: string, rating: number): Promise<Candidate> {
    try {
      const response = await apiClient.patch<Candidate>(`${this.baseUrl}/${id}/rating`, { rating });
      return response;
    } catch (error) {
      console.error('Error rating candidate:', error);
      throw error;
    }
  }

  async exportCandidates(format: 'csv' | 'excel' = 'csv'): Promise<Blob> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/export`, {
        params: { format },
        responseType: 'blob'
      });
      return response as Blob;
    } catch (error) {
      console.error('Error exporting candidates:', error);
      throw error;
    }
  }

  async getCandidateStats(): Promise<{
    total: number;
    byStatus: Record<string, number>;
    byDepartment: Record<string, number>;
    avgExperience: number;
    topSkills: Array<{ skill: string; count: number }>;
  }> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/stats`);
      return response as {
        total: number;
        byStatus: Record<string, number>;
        byDepartment: Record<string, number>;
        avgExperience: number;
        topSkills: Array<{ skill: string; count: number }>;
      };
    } catch (error) {
      console.error('Error fetching candidate stats:', error);
      throw error;
    }
  }
}

export const candidateService = new CandidateService();
export default candidateService;
