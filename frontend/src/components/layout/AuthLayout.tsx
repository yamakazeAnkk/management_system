import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Outlet />
    </div>
  );
};

export default AuthLayout;