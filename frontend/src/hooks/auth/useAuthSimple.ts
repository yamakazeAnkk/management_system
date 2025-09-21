import { useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  isActive: boolean;
}

const useAuthSimple = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data on app load
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_data');
      }
    }
    setIsLoading(false);
  }, []);

  const loginWithCredentials = async (credentials: { username: string; password: string }) => {
    setIsLoading(true);
    
    try {
      // Mock login API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (credentials.username === 'admin' && credentials.password === 'admin') {
        const token = 'mock_jwt_token_' + Date.now();
        const user: User = {
          id: '1',
          username: 'admin',
          email: 'admin@example.com',
          firstName: 'Admin',
          lastName: 'User',
          phone: '0123456789',
          isActive: true,
        };
        
        localStorage.setItem('access_token', token);
        localStorage.setItem('user_data', JSON.stringify(user));
        setUser(user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: 'Tên đăng nhập hoặc mật khẩu không đúng' };
      }
    } catch {
      return { success: false, error: 'Đăng nhập thất bại' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    loginWithCredentials,
    logout,
  };
};

export default useAuthSimple;
