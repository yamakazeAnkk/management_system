import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Result, Button, Space } from 'antd';
import { ReloadOutlined, HomeOutlined } from '@ant-design/icons';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Result
          status="500"
          title="500"
          subTitle="Xin lỗi, đã xảy ra lỗi không mong muốn."
          extra={
            <Space>
              <Button type="primary" icon={<ReloadOutlined />} onClick={this.handleReload}>
                Tải lại trang
              </Button>
              <Button icon={<HomeOutlined />} onClick={this.handleGoHome}>
                Về trang chủ
              </Button>
            </Space>
          }
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
