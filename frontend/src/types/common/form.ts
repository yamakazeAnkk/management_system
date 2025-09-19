import { FormInstance } from 'antd';

export interface FormProps {
  form?: FormInstance;
  initialValues?: Record<string, any>;
  onFinish?: (values: any) => void;
  onFinishFailed?: (errorInfo: any) => void;
  layout?: 'horizontal' | 'vertical' | 'inline';
  size?: 'small' | 'middle' | 'large';
  disabled?: boolean;
  loading?: boolean;
}

export interface FormItemProps {
  name?: string | string[];
  label?: React.ReactNode;
  rules?: Array<{
    required?: boolean;
    message?: string;
    min?: number;
    max?: number;
    pattern?: RegExp;
    validator?: (rule: any, value: any) => Promise<void>;
  }>;
  dependencies?: string[];
  valuePropName?: string;
  getValueFromEvent?: (event: any) => any;
  normalize?: (value: any, prevValue: any, allValues: any) => any;
  shouldUpdate?: boolean | ((prevValues: any, curValues: any) => boolean);
}

export interface ValidationRule {
  required?: boolean;
  message?: string;
  min?: number;
  max?: number;
  len?: number;
  pattern?: RegExp;
  validator?: (rule: any, value: any) => Promise<void>;
  transform?: (value: any) => any;
}

export interface FormError {
  name: string;
  errors: string[];
}

export interface FormState {
  values: Record<string, any>;
  errors: Record<string, string[]>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}
