import { useState, useCallback } from 'react';

interface ModalState {
  visible: boolean;
  loading: boolean;
  data: any;
}

export const useModal = (initialData: any = null) => {
  const [state, setState] = useState<ModalState>({
    visible: false,
    loading: false,
    data: initialData
  });

  const open = useCallback((data?: any) => {
    setState({
      visible: true,
      loading: false,
      data: data || initialData
    });
  }, [initialData]);

  const close = useCallback(() => {
    setState(prev => ({
      ...prev,
      visible: false,
      loading: false
    }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setData = useCallback((data: any) => {
    setState(prev => ({ ...prev, data }));
  }, []);

  return {
    visible: state.visible,
    loading: state.loading,
    data: state.data,
    open,
    close,
    setLoading,
    setData
  };
};
