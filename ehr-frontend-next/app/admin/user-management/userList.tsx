"use client";
import { FC, useState, useEffect } from 'react';
import { DataTable } from '@/components/tables/DataTable';
import { Card } from '@/components/cards/Card';
import { Modal } from '@/components/modals/Modal';
import { TextInput } from '@/components/forms/inputs/TextInput';
import { SelectInput } from '@/components/forms/inputs/SelectInput';
interface User {
  id: number;
  name: string;
  lastName: string;
  username: string;
  role: string;
}

interface UserListProps {
  users: User[{}];
  title: string;
  setUsers: (users: User[]) => void;
}

export const UserList: FC<UserListProps> = ({ users, title, setUsers }) => {
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [userState, setUserState] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const onEdit = (user: User) => {
    setSelectedUser(user);
    setUserModalOpen(true);
  };

  return (
    <Card className="space-y-4">
    <h2 className="text-xl font-semibold">{title}</h2>
    <DataTable
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'username', label: 'Username' },
        { key: 'role', label: 'Role' },
        {
          key: 'actions',
          label: 'Actions',
          render: (row) => (
            <button
              className="text-blue-600 hover:underline"
              onClick={() => onEdit(row)}
            >
              Edit
            </button>
          ),
        },
      ]}
      data={users}
    />
    
    <Modal open={isUserModalOpen} title="Edit User" onClose={() => setUserModalOpen(false)}>
      <TextInput
        label="Name"
        value={selectedUser?.name || ''}
        onChange={(val) => setSelectedUser({ ...selectedUser, name: val })}
      />
      <SelectInput
        label="Role"
        options={[
          { value: 'Admin', label: 'Admin' },
          { value: 'Doctor', label: 'Doctor' },
          { value: 'Patient', label: 'Patient' },
        ]}
        selected={selectedUser?.role || ''}
        onChange={(val) => setSelectedUser({ ...selectedUser, role: val })}
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => {
          setUsers(users.map((u) => (u.id === selectedUser.id ? selectedUser : u)));
          setUserModalOpen(false);
        }}
      >
        Save
      </button>
    </Modal>
    </Card>
  );
};
