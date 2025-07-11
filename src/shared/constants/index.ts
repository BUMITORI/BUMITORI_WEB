// Floor options
export const FLOOR_OPTIONS = [
  "전체",
  "A동 기숙사 2층",
  "A동 기숙사 3층", 
  "B동 기숙사 3층",
  "B동 기숙사 4층"
] as const;

export const MOBILE_FLOOR_OPTIONS = [
  "전체",
  "A동 2층",
  "A동 3층",
  "B동 3층", 
  "B동 4층"
] as const;

// Category options
export const CATEGORY_OPTIONS = [
  "전체",
  "남학생",
  "여학생",
  "미입소자"
] as const;

// Absent reason options
export const ABSENT_REASON_OPTIONS = [
  "병결",
  "체험활동",
  "대회활동",
  "기타"
] as const;

// Reason mapping
export const REASON_MAP = {
  "SICK_LEAVE": "병결",
  "EXPERIENCE": "체험활동",
  "CONTEST": "대회활동",
  "ETC": "기타"
} as const;

export const REASON_TO_API_MAP = {
  "병결": "SICK_LEAVE",
  "체험활동": "EXPERIENCE",
  "대회활동": "CONTEST",
  "기타": "ETC"
} as const;

// API endpoints
export const API_ENDPOINTS = {
  STUDENT_LIST: "https://bumitori.duckdns.org/",
  ABSENT_LIST: "https://bumitori.duckdns.org/admin/absent",
  ABSENT_DETAIL: (id: string) => `https://bumitori.duckdns.org/admin/absent/${id}`,
  ABSENT_REQUEST: "https://bumitori.duckdns.org/absent/request",
  ABSENT_APPROVE: (id: string) => `https://bumitori.duckdns.org/admin/absent/${id}`,
  USER_INFO: "https://bumitori.duckdns.org/me",
  OAUTH_REDIRECT: "https://bumitori.duckdns.org/oauth2/authorization/google"
} as const;

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: 900,
  TABLET: 1200,
  DESKTOP: 1440
} as const;

// Week names
export const WEEK_NAMES = ["첫째", "둘째", "셋째", "넷째", "다섯째"] as const;

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: "token",
  ROLE: "role"
} as const; 