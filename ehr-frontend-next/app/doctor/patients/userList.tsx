"use client";
import { FC, useState, useEffect } from 'react';
import { DataTable } from '@/components/tables/DataTable';
import { Card } from '@/components/cards/Card';
import { Modal } from '@/components/modals/Modal';
import { TextInput } from '@/components/forms/inputs/TextInput';
import { SelectInput } from '@/components/forms/inputs/SelectInput';
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
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [userState, setUserState] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLinkModalOpen, setLinkModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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


