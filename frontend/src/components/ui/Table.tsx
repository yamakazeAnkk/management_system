import React from 'react';
import { Table as AntTable, TableProps as AntTableProps } from 'antd';

interface TableProps<T = any> extends AntTableProps<T> {
  loading?: boolean;
  pagination?: {
    current?: number;
    pageSize?: number;
    total?: number;
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
    showTotal?: (total: number, range: [number, number]) => string;
  };
}

const Table = <T extends Record<string, any>>({
  loading = false,
  pagination = {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} mục`,
  },
  ...props
}: TableProps<T>) => {
  return (
    <AntTable
      loading={loading}
      pagination={pagination}
      scroll={{ x: 'max-content' }}
      {...props}
    />
  );
};

export default Table;
