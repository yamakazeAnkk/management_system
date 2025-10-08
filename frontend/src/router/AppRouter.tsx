import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes/paths';

// Pages
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import AnalyticsPage from '../pages/dashboard/AnalyticsPage';
import UsersPage from '../pages/users/UsersPage';
import UserDetailPage from '../pages/users/UserDetailPage';
import CreateUserPage from '../pages/users/CreateUserPage';
import EditUserPage from '../pages/users/EditUserPage';
import RolesPage from '../pages/roles/RolesPage';
import RoleDetailPage from '../pages/roles/RoleDetailPage';
import CreateRolePage from '../pages/roles/CreateRolePage';
import EditRolePage from '../pages/roles/EditRolePage';
import DepartmentsPage from '../pages/departments/DepartmentsPage';
import DepartmentDetailPage from '../pages/departments/DepartmentDetailPage';
import CreateDepartmentPage from '../pages/departments/CreateDepartmentPage';
import EditDepartmentPage from '../pages/departments/EditDepartmentPage';
import ProfilePage from '../pages/profile/ProfilePage';
import SettingsPage from '../pages/profile/SettingsPage';
import { AllEmployeesPage, AddEmployeesPage, EmployeeProfilePage, DirectoryEmployee } from '../pages/employees';
import JobCandidatesPage from '../pages/recuritment/JobCandidatesPage';
import CandidateDetailPage from '../pages/recuritment/CandidateDetailPage';

// Layouts
import AuthLayout from '../components/layout/AuthLayout';
import DashboardLayout from '../components/layout/DashboardLayout';

// Protected Route Component
import ProtectedRoute from '../router/ProtectedRoute';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - Auth Layout */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Navigate to={ROUTES.LOGIN} replace />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        </Route>

        {/* Protected Routes - Dashboard Layout */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>

        {/* User Management Routes */}
        <Route path="/users" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<UsersPage />} />
          <Route path="create" element={<CreateUserPage />} />
          <Route path=":id" element={<UserDetailPage />} />
          <Route path=":id/edit" element={<EditUserPage />} />
        </Route>

        {/* Role Management Routes */}
        <Route path="/roles" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<RolesPage />} />
          <Route path="create" element={<CreateRolePage />} />
          <Route path=":id" element={<RoleDetailPage />} />
          <Route path=":id/edit" element={<EditRolePage />} />
        </Route>

        {/* Department Management Routes */}
        <Route path="/departments" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DepartmentsPage />} />
          <Route path="create" element={<CreateDepartmentPage />} />
          <Route path=":id" element={<DepartmentDetailPage />} />
          <Route path=":id/edit" element={<EditDepartmentPage />} />
        </Route>

        {/* Employees */}
        <Route path="/employees" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AllEmployeesPage />} />
          <Route path=":id" element={<EmployeeProfilePage />} />
          <Route path="add" element={<AddEmployeesPage />} />
          <Route path="directory" element={<DirectoryEmployee />} />
        </Route>

        {/* Legacy/typo redirect */}
        <Route path="/employee" element={<Navigate to="/employees" replace />} />

        {/* Recruitment Routes */}
        <Route path="/recruitment" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="candidates" element={<JobCandidatesPage />} />
          <Route path="candidates/:id" element={<CandidateDetailPage />} />
        </Route>

        {/* Profile Routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Catch all route - redirect to login */}
        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
