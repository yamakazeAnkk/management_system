import React, { useState } from 'react';
import { Modal, message } from 'antd';
import RoleStats from './components/RolesStats';
import RoleHeader from './components/RoleHeader';
import RoleFilters, { RoleFilterType } from './components/RoleFilters';
import RolesTable from './components/RolesTable';
import { RolesForm } from './components';
import { initialRoleData, getTotalUsersAssigned, Role } from './data/role';


const RolesPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(initialRoleData);
  const [loading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [activeFilter, setActiveFilter] = useState<RoleFilterType>('all');




  const handleEdit = (role: Role) => {
    setEditingRole(role);
    setModalVisible(true);
  };

  const handleDelete = (role: Role) => {
    message.success(`Deleted role: ${role.name}`);
    // TODO: Implement delete logic
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setEditingRole(null);
  };



  const handleCreateRole = () => {
    setModalVisible(true);
    setEditingRole(null);
  };

  const handleDuplicateRole = () => {
    if (selectedRowKeys.length === 0) return;
    message.success(`Đã duplicate ${selectedRowKeys.length} vai trò`);
    setSelectedRowKeys([]);
  };

  const handleExport = () => {
    message.success('Đã export danh sách vai trò');
  };

  // Calculate filter counts
  const filterCounts = {
    all: roles.length,
    active: roles.filter(role => role.isActive).length,
    admin: roles.filter(role => 
      role.name.toLowerCase().includes('admin') || 
      role.name.toLowerCase().includes('administrator')
    ).length,
    inactive: roles.filter(role => !role.isActive).length,
    system: roles.filter(role => role.isSystem).length
  };

  // Filter roles based on active filter
  const getFilteredRoles = () => {
    let filtered = roles;
    
    switch (activeFilter) {
      case 'active':
        filtered = roles.filter(role => role.isActive);
        break;
      case 'inactive':
        filtered = roles.filter(role => !role.isActive);
        break;
      case 'admin':
        filtered = roles.filter(role => 
          role.name.toLowerCase().includes('admin') || 
          role.name.toLowerCase().includes('administrator')
        );
        break;
      case 'system':
        filtered = roles.filter(role => role.isSystem);
        break;
      case 'all':
      default:
        filtered = roles;
        break;
    }
    
    return filtered;
  };

  const filteredRoles = getFilteredRoles().filter(role => {
    const matchesSearch = !searchText || 
      role.name.toLowerCase().includes(searchText.toLowerCase()) ||
      role.description?.toLowerCase().includes(searchText.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div >
      <RoleHeader
        onCreateRole={handleCreateRole}
        onDuplicateRole={handleDuplicateRole}
        onExport={handleExport}
        selectedCount={selectedRowKeys.length}
      />
      
      <RoleStats 
        roles={roles} 
        usersAssignedCount={getTotalUsersAssigned()}
      />

      <RoleFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        counts={filterCounts}
        searchText={searchText}
        onSearchChange={setSearchText}
      />

        <RolesTable
          roles={filteredRoles}
          loading={loading}
          searchText={searchText}
          onSearchChange={setSearchText}
          selectedRowKeys={selectedRowKeys}
          onSelectionChange={setSelectedRowKeys}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <Modal
          title={editingRole ? 'Chỉnh sửa vai trò' : 'Thêm vai trò mới'}
          open={modalVisible}
          onCancel={handleModalClose}
          footer={null}
          width={800}
        >
          <RolesForm
            initialValues={editingRole ?? undefined}
            onCancel={handleModalClose}
            onSubmit={(values) => {
              if (editingRole) {
                setRoles((prev) => prev.map((r) => (r.id === editingRole.id ? { ...r, ...values } as Role : r)));
                message.success('Cập nhật vai trò thành công');
              } else {
                const newRole: Role = {
                  id: `ROLE${String(roles.length + 1).padStart(3, '0')}`,
                  name: values.name!,
                  description: values.description,
                  department: values.department,
                  roleLevel: 'entry',
                  isSystem: false,
                  permissionKeys: [],
                  isActive: values.isActive ?? true,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                } as Role;
                setRoles((prev) => [newRole, ...prev]);
                message.success('Tạo vai trò thành công');
              }
              handleModalClose();
            }}
          />
        </Modal>
    </div>
  );
};

export default RolesPage;
