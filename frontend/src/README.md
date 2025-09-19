# Frontend Structure Documentation

## Tổng quan cấu trúc thư mục

Dự án frontend được tổ chức theo cấu trúc modular và scalable, phù hợp cho ứng dụng quản lý doanh nghiệp.

## Cấu trúc thư mục

```
src/
├── components/           # Các component tái sử dụng
│   ├── common/          # Component chung (Header, Sidebar, Footer)
│   ├── forms/           # Component form (LoginForm, UserForm)
│   ├── layout/          # Component layout (Layout, AuthLayout)
│   └── ui/              # Component UI cơ bản (Button, Input, Modal)
├── pages/               # Các trang của ứng dụng
│   ├── auth/            # Trang xác thực (Login, Register)
│   ├── dashboard/       # Trang dashboard
│   ├── users/           # Trang quản lý người dùng
│   ├── roles/           # Trang quản lý vai trò
│   ├── departments/     # Trang quản lý phòng ban
│   └── profile/         # Trang profile người dùng
├── services/            # Các service API
│   ├── api/             # Cấu hình API client
│   ├── auth/            # Service xác thực
│   ├── users/           # Service người dùng
│   ├── roles/           # Service vai trò
│   └── departments/     # Service phòng ban
├── types/               # TypeScript type definitions
│   ├── api/             # Types cho API
│   ├── common/          # Types chung
│   └── forms/           # Types cho forms
├── hooks/               # Custom React hooks
│   ├── auth/            # Hooks xác thực
│   ├── api/             # Hooks API
│   └── common/          # Hooks chung
├── utils/               # Utility functions
│   ├── validation/      # Validation utilities
│   ├── format/          # Format utilities
│   ├── storage/         # Storage utilities
│   └── common/          # Common utilities
├── context/             # React Context providers
│   ├── auth/            # Auth context
│   └── app/             # App context
├── constants/            # Constants và configuration
│   ├── api/             # API constants
│   ├── ui/              # UI constants
│   ├── routes/          # Route constants
│   └── common/          # Common constants
└── styles/               # CSS/SCSS files
    ├── components/      # Component styles
    ├── pages/           # Page styles
    └── globals/         # Global styles
```

## Quy tắc đặt tên

### Files và Folders
- Sử dụng PascalCase cho component files: `UserForm.tsx`
- Sử dụng camelCase cho utility files: `apiClient.ts`
- Sử dụng kebab-case cho CSS files: `user-form.css`

### Components
- Sử dụng PascalCase: `UserForm`, `LoginPage`
- Export default cho main component
- Named export cho sub-components

### Functions và Variables
- Sử dụng camelCase: `getUserData`, `isLoading`
- Constants sử dụng UPPER_SNAKE_CASE: `API_BASE_URL`

## Cách sử dụng

### Import Components
```typescript
import { UserForm, Button, Modal } from '@/components';
import { UsersPage } from '@/pages';
```

### Import Services
```typescript
import { userService, authService } from '@/services';
```

### Import Types
```typescript
import { User, CreateUserRequest } from '@/types';
```

### Import Hooks
```typescript
import { useAuth, useLocalStorage } from '@/hooks';
```

### Import Utils
```typescript
import { validators, formatDate } from '@/utils';
```

## Best Practices

1. **Component Structure**: Mỗi component nên có file riêng với export default
2. **Type Safety**: Sử dụng TypeScript interfaces cho tất cả props và data
3. **Error Handling**: Implement error boundaries và proper error handling
4. **Performance**: Sử dụng React.memo, useMemo, useCallback khi cần thiết
5. **Accessibility**: Đảm bảo components accessible với ARIA attributes
6. **Testing**: Viết unit tests cho utilities và integration tests cho components

## Dependencies cần thêm

Để hoàn thiện cấu trúc, bạn có thể cần thêm các dependencies sau:

```bash
npm install axios react-router-dom @types/react-router-dom
npm install -D @types/node
```

## Environment Variables

Tạo file `.env` với các biến môi trường:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Management System
VITE_APP_VERSION=1.0.0
```
