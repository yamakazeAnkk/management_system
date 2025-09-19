import { useState, useCallback } from 'react';
import { Form } from 'antd';

interface FormState<T> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
}

export const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [form] = Form.useForm();
  const [state, setState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false
  });

  const setValue = useCallback((name: keyof T, value: any) => {
    setState(prev => ({
      ...prev,
      values: { ...prev.values, [name]: value },
      touched: { ...prev.touched, [name]: true }
    }));
  }, []);

  const setError = useCallback((name: keyof T, error: string) => {
    setState(prev => ({
      ...prev,
      errors: { ...prev.errors, [name]: error }
    }));
  }, []);

  const clearErrors = useCallback(() => {
    setState(prev => ({ ...prev, errors: {} }));
  }, []);

  const reset = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false
    });
    form.resetFields();
  }, [initialValues, form]);

  const setSubmitting = useCallback((isSubmitting: boolean) => {
    setState(prev => ({ ...prev, isSubmitting }));
  }, []);

  const handleSubmit = useCallback(async (onSubmit: (values: T) => Promise<void>) => {
    setSubmitting(true);
    try {
      await onSubmit(state.values);
    } finally {
      setSubmitting(false);
    }
  }, [state.values, setSubmitting]);

  return {
    form,
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: state.isSubmitting,
    setValue,
    setError,
    clearErrors,
    reset,
    setSubmitting,
    handleSubmit
  };
};
