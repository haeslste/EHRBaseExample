"use client";
import { FC, useState, useEffect } from 'react';
import {fetchDoctors} from "@/services/doctors_service";
import {fetchPatients} from "@/services/patients_service";
import { UserList } from './userList';

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

const AdminTemplateDashboard: React.FC = () => {
  const [templates, setTemplates] = useState([{}]);

  const fetchData = async () => {
    const doctors = await fetchDoctors();
    const patients = await fetchPatients();
    setTemplates(templates);
  }
 
  useEffect(() => {
      fetchData();
  }, []);


  return (
    <div className="p-16 space-y12 ">
        <UserList users={doctors} title="Doctors" setUsers={setDoctors}/>
        <UserList users={patients} title="Patients" setUsers={setPatients}/>
    </div>
  );
};

export default AdminUserDashboard;