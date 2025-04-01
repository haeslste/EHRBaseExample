"use client";
import { FC } from 'react';
import { DataTable } from '@/components/tables/DataTable';
import { Card } from '../components/cards/Card';

interface User {
  id: number;
  name: string;
  lastName: string;
  username: string;
  role: string;
}

interface UserListProps {
  users: User[{}];
  onEdit: (user: User) => void;
}

export const UserList: FC<UserListProps> = ({ users, onEdit }) => {
  return (
    <Card className="space-y-4">
    <h2 className="text-xl font-semibold">User Management</h2>
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
    </Card>
  );
};
