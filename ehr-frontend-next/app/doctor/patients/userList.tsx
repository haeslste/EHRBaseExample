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

  const onEdit = (user: User) => {
    setSelectedUser(user);
    setUserModalOpen(true);
  };

  const onLink = async (user: User) => {
    if (!selectedUser) return;
    await fetch('/doctor/assign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        doctorId: selectedUser.id,
        patientId: user.id,
      }),
    });
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
          className="mt-2 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => setLinkModalOpen(true)}
        >
          Link User
      </button>
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

    <Modal open={isLinkModalOpen} title="Link User" onClose={() => setLinkModalOpen(false)}>
      <TextInput
        label="Search"
        value={searchTerm}
        onChange={(val) => setSearchTerm(val)}
        placeholder="Search by name or username..."
      />

      <div className="mt-4 max-h-[300px] overflow-y-auto">
        {linkableUsers
          .filter((u:User) =>
            u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.username.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((user) => (
            <div key={user.id} className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-semibold">{user.name} {user.lastName}</p>
                <p className="text-sm text-gray-500">{user.username}</p>
              </div>
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => {
                  // TODO: call backend link API here
                  console.log(`Link ${selectedUser?.id} <--> ${user.id}`);
                  onLink(user);
                  setLinkModalOpen(false);
                }}
              >
                Link
              </button>
            </div>
          ))}
      </div>
    </Modal>

    </Card>
  );
};


