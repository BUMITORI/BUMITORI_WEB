// Student related types
export interface StudentFromApi {
  name: string;
  roomPrefix: string;
  roomNumber: string;
  gender: string;
  enterStatus: string;
  enterTime: string | null;
}

export interface StudentFilters {
  selectedFloor: string;
  selectedCategory: string;
}

// Absent related types
export interface AbsentItem {
  id: number;
  name: string;
  room: string;
  date: string;
  status: '승인 전' | '승인 완료';
}

export interface AbsentDetail {
  userId: number;
  absentId: number;
  name: string;
  roomPrefix: string;
  roomNumber: string;
  reason: string;
  specificReason: string;
  approval: boolean;
  absentDate: string;
}

export interface AbsentRequest {
  reason: 'SICK_LEAVE' | 'EXPERIENCE' | 'CONTEST' | 'ETC';
  specificReason: string;
  absentDate: string;
}

// User related types
export interface UserInfo {
  userId: number;
  email: string;
  name: string;
  role: string;
  rfid: string;
  studentNo: number;
  roomId: string;
  gender: string;
  username: string;
}

export interface User {
  name: string;
  email: string;
  profileImage?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success?: boolean;
}

// Common props types
export interface MainPageProps {
  selectedFloor: string;
  setSelectedFloor: (floor: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  studentList: StudentFromApi[];
  isError: boolean;
  isLoading: boolean;
}

// Join status types
export type JoinStatus = 'JOIN' | 'NOT_JOIN' | 'LATE' | 'EARLY_LEAVE' | 'ABSENT'; 