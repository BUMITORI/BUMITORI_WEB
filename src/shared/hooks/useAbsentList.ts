import { useState, useEffect } from 'react';
import { AbsentItem } from '../types';
import { absentApi } from '../services/api';

export const useAbsentList = () => {
  const [absentList, setAbsentList] = useState<AbsentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAbsentList = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      setError(null);
      
      const data = await absentApi.getAbsentList();
      setAbsentList(data);
    } catch (err) {
      console.error('Failed to fetch absent list:', err);
      setIsError(true);
      setError(err instanceof Error ? err.message : 'Failed to fetch absent list');
      setAbsentList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAbsentList();
  }, []);

  const refetch = () => {
    fetchAbsentList();
  };

  // Group absent items by date
  const groupedAbsentList = absentList.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {} as Record<string, AbsentItem[]>);

  return {
    absentList,
    groupedAbsentList,
    isLoading,
    isError,
    error,
    refetch,
  };
}; 