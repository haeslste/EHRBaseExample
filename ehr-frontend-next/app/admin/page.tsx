"use client";
import { FC, useState, useEffect } from 'react';
import { DataTable } from '@/components/tables/DataTable';
import { Card } from '@/components/cards/Card';
import { Modal } from '@/components/modals/Modal';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { TextInput } from '@/components/forms/inputs/TextInput';
import { SelectInput } from '@/components/forms/inputs/SelectInput';
import { Sidebar } from '@/components/sidebar';
import {fetchDoctors} from "@/services/doctors_service";
import {fetchPatients} from "@/services/patients_service";
import { UserList } from './userList';
import {useNavigate} from "react-router-dom";
import { useRouter } from 'next/navigation';


const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState([{}]);
  const [templates, setTemplates] = useState([]);
  const [forms, setForms] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [mappedDoctors, setMappedDoctors] = useState([{}]);
  const [mappedPatients, setMappedPatients] = useState([{}]);

  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const router = useRouter();

  /*
  useEffect(() => {
    // Fetch initial data (replace with your API calls)
    setUsers([{ id: '1', name: 'Dr. Alice', role: 'Doctor' }]);
    setTemplates([{ id: 't1', name: 'Blood Pressure' }]);
    setForms([{ id: 'f1', name: 'Blood Pressure Entry', patient: 'John Doe' }]);
  }, []);
  */

  const fetchData = async () => {
    const doctors = await fetchDoctors();
    const patients = await fetchPatients();
    setDoctors(doctors);
    setPatients(patients);
    const mappedDoctors = doctors.map((doctor) => ({
      id: doctor.user.id,
      name: `${doctor.firstName}`,
      lastName: `${doctor.lastName}`,
      username: doctor.user.username,
      role: 'Doctor',
    }));
    const mappedPatients = patients.map((patient) => ({
      id: patient.user.id,
      name: `${patient.firstName}`,
      lastName: `${patient.lastName}`,
      username: patient.user.username,
      role: 'Patient',
    }));
    const allUsers = [...mappedDoctors, ...mappedPatients];
    setUsers(allUsers);
  }
 
  useEffect(() => {
      fetchData();
  }, []);


  return (
    <div className="p-16 space-y-32 ">
      <UserList users={users} onEdit={(user) => {
            setSelectedUser(user);
            setUserModalOpen(true);
        }} />


      <Card className="space-y-4">
        <h2 className="text-xl font-semibold">Template Management</h2>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => router.push('/admin/upload-template')}
        >Create Template</button>
        <DataTable
          columns={[
            { key: 'name', label: 'Template Name' },
            {
              key: 'actions',
              label: 'Actions',
              render: (row) => <button className="text-blue-600 hover:underline">View</button>,
            },
          ]}
          data={templates}
        />
      </Card>

      <Card className="space-y-4">
        <h2 className="text-xl font-semibold">Form Submissions</h2>
        <DataTable
          columns={[
            { key: 'name', label: 'Form Name' },
            { key: 'patient', label: 'Patient' },
            {
              key: 'actions',
              label: 'Actions',
              render: (row) => <button className="text-blue-600 hover:underline">View Details</button>,
            },
          ]}
          data={forms}
        />
      </Card>

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
    </div>

  );
};

export default AdminDashboard;