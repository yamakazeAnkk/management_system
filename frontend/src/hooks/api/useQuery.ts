import { useState, useEffect } from 'react';
import { message } from 'antd';

interface QueryState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useQuery = <T>(
  queryFn: () => Promise<T>,
  dependencies: any[] = []
) => {
  const [state, setState] = useState<QueryState<T>>({
    data: null,
    loading: false,
    error: null,
    refetch: () => {}
  });

  const fetchData = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await queryFn();
      setState(prev => ({ ...prev, data: result, loading: false, error: null }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Query failed';
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      message.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  const refetch = () => {
    fetchData();
  };

  setState(prev => ({ ...prev, refetch }));

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    refetch
  };
};
