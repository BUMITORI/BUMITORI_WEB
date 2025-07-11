import axios, { AxiosResponse } from 'axios';
import { StudentFromApi, AbsentItem, AbsentDetail, AbsentRequest, UserInfo } from '../types';
import { API_ENDPOINTS } from '../constants';
import { getToken, ensureArray } from '../utils';

// Create axios instance with default config
const api = axios.create({
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token and log requests
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request details for debugging
    console.log('🚀 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
      headers: {
        'Content-Type': config.headers['Content-Type'],
        'Authorization': config.headers.Authorization ? '***Bearer Token***' : 'None'
      }
    });
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => {
    // Log successful responses
    console.log('✅ API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    // Enhanced error logging
    console.error('❌ API Error Details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      requestData: error.config?.data,
      responseData: error.response?.data,
      message: error.message
    });
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      window.location.href = '/auth/login';
    }
    
    return Promise.reject(error);
  }
);

// Student API
export const studentApi = {
  /**
   * Get all students list
   */
  getStudentList: async (): Promise<StudentFromApi[]> => {
    try {
      const response: AxiosResponse<StudentFromApi[]> = await api.get(API_ENDPOINTS.STUDENT_LIST);
      return ensureArray(response.data);
    } catch (error) {
      console.error('Failed to fetch student list:', error);
      throw error;
    }
  },
};

// Absent API
export const absentApi = {
  /**
   * Get absent list for admin
   */
  getAbsentList: async (): Promise<AbsentItem[]> => {
    try {
      const response = await api.get(API_ENDPOINTS.ABSENT_LIST);
      const data = ensureArray(response.data);
      
      return data.map((item: any) => ({
        id: item.absentId,
        name: item.name || `${item.room} ${item.studentName}` || '이름없음',
        room: item.room || '-',
        date: item.absentDate || '-',
        status: item.approval === true ? '승인 완료' : '승인 전' as '승인 전' | '승인 완료',
      }));
    } catch (error) {
      console.error('Failed to fetch absent list:', error);
      throw error;
    }
  },

  /**
   * Get absent detail by ID
   */
  getAbsentDetail: async (absentId: string): Promise<AbsentDetail> => {
    try {
      const response: AxiosResponse<AbsentDetail> = await api.get(API_ENDPOINTS.ABSENT_DETAIL(absentId));
      return response.data;
    } catch (error) {
      console.error('Failed to fetch absent detail:', error);
      throw error;
    }
  },

  /**
   * Submit absent request with enhanced validation
   */
  submitAbsentRequest: async (requestData: AbsentRequest): Promise<void> => {
    try {
      // Validate request data before sending
      if (!requestData.reason) {
        throw new Error('Reason is required');
      }
      if (!requestData.specificReason?.trim()) {
        throw new Error('Specific reason is required');
      }
      if (!requestData.absentDate) {
        throw new Error('Absent date is required');
      }

      // Ensure clean data format
      const cleanedData = {
        reason: requestData.reason,
        specificReason: requestData.specificReason.trim(),
        absentDate: requestData.absentDate,
      };

      console.log('📤 Submitting absent request:', cleanedData);
      
      await api.post(API_ENDPOINTS.ABSENT_REQUEST, cleanedData);
      
      console.log('✅ Absent request submitted successfully');
    } catch (error) {
      console.error('❌ Failed to submit absent request:', error);
      throw error;
    }
  },

  /**
   * Approve absent request
   */
  approveAbsentRequest: async (absentId: string): Promise<void> => {
    try {
      await api.patch(API_ENDPOINTS.ABSENT_APPROVE(absentId), {});
    } catch (error) {
      console.error('Failed to approve absent request:', error);
      throw error;
    }
  },
};

// User API
export const userApi = {
  /**
   * Get current user info
   */
  getUserInfo: async (): Promise<UserInfo> => {
    try {
      const response: AxiosResponse<UserInfo> = await api.get(API_ENDPOINTS.USER_INFO);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    try {
      // Try multiple logout endpoints
      try {
        await api.post('https://bumitori.duckdns.org/logout', {});
      } catch (error) {
        try {
          await api.post('https://bumitori.duckdns.org/api/auth/logout', {});
        } catch (error2) {
          console.log('Logout API not found, proceeding with client-side logout');
        }
      }
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
};

// Default export
export default api; 