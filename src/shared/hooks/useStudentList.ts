import { useState, useEffect } from 'react';
import { StudentFromApi } from '../types';
import { studentApi } from '../services/api';

export const useStudentList = () => {
  const [studentList, setStudentList] = useState<StudentFromApi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStudentList = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      setError(null);
      
      const data = await studentApi.getStudentList();
      setStudentList(data);
    } catch (err) {
      console.error('Failed to fetch student list:', err);
      setIsError(true);
      setError(err instanceof Error ? err.message : 'Failed to fetch student list');
      setStudentList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentList();
  }, []);

  const refetch = () => {
    fetchStudentList();
  };

  return {
    studentList,
    isLoading,
    isError,
    error,
    refetch,
  };
}; 