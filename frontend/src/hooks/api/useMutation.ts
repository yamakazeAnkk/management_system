import { useState } from 'react';
import { message } from 'antd';

interface MutationState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useMutation = <TData, TVariables = any>(
  mutationFn: (variables: TVariables) => Promise<TData>
) => {
  const [state, setState] = useState<MutationState<TData>>({
    data: null,
    loading: false,
    error: null
  });

  const mutate = async (variables: TVariables): Promise<TData> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await mutationFn(variables);
      setState({ data: result, loading: false, error: null });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Mutation failed';
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      message.error(errorMessage);
      throw error;
    }
  };

  return {
    ...state,
    mutate
  };
};
