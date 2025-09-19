import { useState, useCallback } from 'react';
import { message } from 'antd';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useApi = <T>() => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const execute = useCallback(async (apiCall: () => Promise<T>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await apiCall();
      setState({ data: result, loading: false, error: null });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'API call failed';
      setState({ data: null, loading: false, error: errorMessage });
      message.error(errorMessage);
      throw error;
    }
  }, []);

  return {
    ...state,
    execute
  };
};
