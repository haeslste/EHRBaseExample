"use client";
import { FC, useState, useEffect } from 'react';
import { DataTable } from '@/components/tables/DataTable';
import { Card } from '@/components/cards/Card';
import { Modal } from '@/components/modals/Modal';
import { TextInput } from '@/components/forms/inputs/TextInput';
import { SelectInput } from '@/components/forms/inputs/SelectInput';
import {fetchDoctors} from "@/services/doctors_service";
import {fetchPatients} from "@/services/patients_service";
import { postComposition } from '../services/composition_service';
import { fetchTemplates } from '@/services/template_service';
import { UserList } from './user-management/userList';
import { useRouter } from 'next/navigation';
import { UploadTemplateModal } from '@/components/UploadTemplateModal';
import { User } from '../components/sidebar/icons';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  user: { id: string; 
    username:string;
  }
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState([{}]);
  const [templates, setTemplates] = useState([{}]);
  const [forms, setForms] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [mappedDoctors, setMappedDoctors] = useState([{}]);
  const [mappedPatients, setMappedPatients] = useState([{}]);

  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();


  const fetchData = async () => {
    const doctors = await fetchDoctors();
    const patients = await fetchPatients();
    const templates = await fetchTemplates();
    setDoctors(doctors);
    setPatients(patients);
    const mappedDoctors = doctors.map((doctor:UserData) => ({
      id: doctor.user.id,
      name: `${doctor.firstName}`,
      lastName: `${doctor.lastName}`,
      username: doctor.user.username,
      role: 'Doctor',
    }));
    const mappedPatients = patients.map((patient:UserData) => ({
      id: patient.user.id,
      name: `${patient.firstName}`,
      lastName: `${patient.lastName}`,
      username: patient.user.username,
      role: 'Patient',
    }));
    
    const allUsers = [...mappedDoctors, ...mappedPatients];
    setUsers(allUsers);
    setTemplates(templates);
  }
 
  useEffect(() => {
      fetchData();
  }, []);


  return (
    <div className="p-16 space-y-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <Card className="flex flex-col justify-center items-center aspect-square shadow-lg">
          <h2 className="text-xl font-semibold">Patients</h2>
          <p className="text-4xl font-bold">{patients.length}</p>
        </Card>
  
        <Card className="flex flex-col justify-center items-center aspect-square shadow-lg">
          <h2 className="text-xl font-semibold">Doctors</h2>
          <p className="text-4xl font-bold">{doctors.length}</p>
        </Card>
  
        <Card className="flex flex-col justify-center items-center aspect-square shadow-lg">
          <h2 className="text-xl font-semibold">Templates</h2>
          <p className="text-4xl font-bold">{templates.length}</p>
        </Card>
  
        <Card className="flex flex-col justify-center items-center aspect-square shadow-lg">
          <h2 className="text-xl font-semibold">Forms</h2>
          <p className="text-4xl font-bold">{forms.length}</p>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;