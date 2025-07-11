import { useState, useEffect } from 'react';
import { AbsentDetail } from '../types';
import { absentApi } from '../services/api';

export const useAbsentDetail = (absentId: string | undefined) => {
  const [absentDetail, setAbsentDetail] = useState<AbsentDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAbsentDetail = async () => {
    if (!absentId) {
      setIsError(true);
      setError('Absent ID is required');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setIsError(false);
      setError(null);
      
      const data = await absentApi.getAbsentDetail(absentId);
      setAbsentDetail(data);
    } catch (err) {
      console.error('Failed to fetch absent detail:', err);
      setIsError(true);
      setError(err instanceof Error ? err.message : 'Failed to fetch absent detail');
      setAbsentDetail(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (absentId) {
      fetchAbsentDetail();
    }
  }, [absentId]);

  const refetch = () => {
    fetchAbsentDetail();
  };

  return {
    absentDetail,
    isLoading,
    isError,
    error,
    refetch,
  };
}; 