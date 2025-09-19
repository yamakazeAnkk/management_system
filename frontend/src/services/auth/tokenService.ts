import { localStorageUtils } from '../../utils/storage/localStorage';

const TOKEN_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
} as const;

export const tokenService = {
  // Get access token
  getAccessToken: (): string | null => {
    return localStorageUtils.get(TOKEN_KEYS.ACCESS_TOKEN);
  },

  // Get refresh token
  getRefreshToken: (): string | null => {
    return localStorageUtils.get(TOKEN_KEYS.REFRESH_TOKEN);
  },

  // Get user data
  getUserData: (): any => {
    return localStorageUtils.get(TOKEN_KEYS.USER_DATA);
  },

  // Set tokens
  setTokens: (accessToken: string, refreshToken: string): void => {
    localStorageUtils.set(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
    localStorageUtils.set(TOKEN_KEYS.REFRESH_TOKEN, refreshToken);
  },

  // Set user data
  setUserData: (userData: any): void => {
    localStorageUtils.set(TOKEN_KEYS.USER_DATA, userData);
  },

  // Clear all tokens
  clearTokens: (): void => {
    localStorageUtils.remove(TOKEN_KEYS.ACCESS_TOKEN);
    localStorageUtils.remove(TOKEN_KEYS.REFRESH_TOKEN);
    localStorageUtils.remove(TOKEN_KEYS.USER_DATA);
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const accessToken = tokenService.getAccessToken();
    const userData = tokenService.getUserData();
    return !!(accessToken && userData);
  },

  // Get authorization header
  getAuthHeader: (): string | null => {
    const accessToken = tokenService.getAccessToken();
    return accessToken ? `Bearer ${accessToken}` : null;
  },
};
