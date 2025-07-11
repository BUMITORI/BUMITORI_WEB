import { StudentFromApi } from '../types';
import { WEEK_NAMES, STORAGE_KEYS } from '../constants';

// Date utilities
export const getCurrentWeekOfMonth = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 0부터 시작하므로 +1
  
  // 해당 월의 첫 번째 날
  const firstDay = new Date(year, now.getMonth(), 1);
  // 현재 날짜
  const today = new Date(year, now.getMonth(), now.getDate());
  
  // 첫 번째 날의 요일 (0: 일요일, 1: 월요일, ...)
  const firstDayOfWeek = firstDay.getDay();
  
  // 첫 번째 주의 시작일 (첫 번째 월요일)
  const firstMonday = new Date(firstDay);
  firstMonday.setDate(1 + (firstDayOfWeek === 0 ? 1 : 8 - firstDayOfWeek));
  
  // 오늘까지의 일수
  const daysDiff = Math.floor((today.getTime() - firstMonday.getTime()) / (1000 * 60 * 60 * 24));
  
  // 주차 계산 (1주차부터 시작)
  const weekNumber = Math.floor(daysDiff / 7) + 1;
  
  const weekName = WEEK_NAMES[weekNumber - 1] || "다섯째";
  
  return `${year}년 ${month}월 ${weekName}주`;
};

// Filter utilities
export const filterStudentsByCategory = (students: StudentFromApi[], category: string): StudentFromApi[] => {
  return students.filter((student) => {
    if (category === "전체") return true;
    if (category === "남학생") return student.gender === "M" || student.gender === "남";
    if (category === "여학생") return student.gender === "W" || student.gender === "여";
    if (category === "미입소자") return student.enterStatus === "NON_ENTER";
    return true;
  });
};

export const filterStudentsByFloor = (students: StudentFromApi[], floor: string, isMobile: boolean = false): StudentFromApi[] => {
  return students.filter((student) => {
    if (floor === "전체") return true;
    
    // Mobile floor options
    if (isMobile) {
      if (floor === "A동 2층") return student.roomPrefix === "A" && String(student.roomNumber).startsWith("2");
      if (floor === "A동 3층") return student.roomPrefix === "A" && String(student.roomNumber).startsWith("3");
      if (floor === "B동 3층") return student.roomPrefix === "B" && String(student.roomNumber).startsWith("3");
      if (floor === "B동 4층") return student.roomPrefix === "B" && String(student.roomNumber).startsWith("4");
    } else {
      // Desktop floor options
      if (floor === "A동 기숙사 2층") return student.roomPrefix === "A" && String(student.roomNumber).startsWith("2");
      if (floor === "A동 기숙사 3층") return student.roomPrefix === "A" && String(student.roomNumber).startsWith("3");
      if (floor === "B동 기숙사 3층") return student.roomPrefix === "B" && String(student.roomNumber).startsWith("3");
      if (floor === "B동 기숙사 4층") return student.roomPrefix === "B" && String(student.roomNumber).startsWith("4");
    }
    
    return true;
  });
};

export const getFilteredStudents = (
  students: StudentFromApi[], 
  category: string, 
  floor: string, 
  isMobile: boolean = false
): StudentFromApi[] => {
  const categoryFiltered = filterStudentsByCategory(students, category);
  return filterStudentsByFloor(categoryFiltered, floor, isMobile);
};

// Local storage utilities
export const getStorageItem = (key: string): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(key);
};

export const setStorageItem = (key: string, value: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, value);
};

export const removeStorageItem = (key: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
};

export const clearStorage = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.clear();
};

// Token utilities
export const getToken = (): string | null => {
  return getStorageItem(STORAGE_KEYS.TOKEN);
};

export const setToken = (token: string): void => {
  setStorageItem(STORAGE_KEYS.TOKEN, token);
};

export const getRole = (): string | null => {
  return getStorageItem(STORAGE_KEYS.ROLE);
};

export const setRole = (role: string): void => {
  setStorageItem(STORAGE_KEYS.ROLE, role);
};

// Array utilities
export const ensureArray = <T>(data: T | T[]): T[] => {
  return Array.isArray(data) ? data : [];
};

// Date formatting utilities
export const formatDate = (date: string | Date): string => {
  if (!date) return "";
  return new Date(date).toLocaleString();
};

export const getCurrentDate = (): string => {
  return new Date().toISOString().slice(0, 10);
}; 