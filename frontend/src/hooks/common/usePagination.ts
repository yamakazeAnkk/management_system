import { useState, useMemo } from 'react';

interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}

interface PaginationConfig {
  defaultCurrent?: number;
  defaultPageSize?: number;
  total?: number;
}

export const usePagination = (config: PaginationConfig = {}) => {
  const [state, setState] = useState<PaginationState>({
    current: config.defaultCurrent || 1,
    pageSize: config.defaultPageSize || 10,
    total: config.total || 0
  });

  const pagination = useMemo(() => ({
    current: state.current,
    pageSize: state.pageSize,
    total: state.total,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number, range: [number, number]) =>
      `${range[0]}-${range[1]} của ${total} mục`,
    onChange: (page: number, pageSize?: number) => {
      setState(prev => ({
        ...prev,
        current: page,
        pageSize: pageSize || prev.pageSize
      }));
    },
    onShowSizeChange: (current: number, size: number) => {
      setState(prev => ({
        ...prev,
        current: 1,
        pageSize: size
      }));
    }
  }), [state.current, state.pageSize, state.total]);

  const setPagination = (updates: Partial<PaginationState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  return {
    pagination,
    paginationState: state,
    setPagination
  };
};
