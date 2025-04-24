"use client";
import { FC, useState, useEffect } from 'react';
import { DataTable } from '@/components/tables/DataTable';
import { Card } from '@/components/cards/Card';
import { useRouter } from 'next/navigation';
interface User {
  id: number;
  name: string;
  lastName: string;
  username: string;
  role: string;
}

interface UserListProps {
  users: User[{}];
  linkableUsers: User[{}];
  title: string;
  setUsers: (users: User[]) => void;
}

export const UserList: FC<UserListProps> = ({ users, linkableUsers, title, setUsers }) => {
  const router = useRouter();

  const onView = (user: User) => {
    console.log("users...",linkableUsers)
    router.push(`/doctor/patients/${user.id}`);
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
              onClick={() => onView(row)}
            >
              View
            </button>
          ),
        },
      ]}
      data={users}
    />
    </Card>
  );
};


