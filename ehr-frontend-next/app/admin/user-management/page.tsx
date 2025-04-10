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

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState([{}]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const fetchData = async () => {
    const doctors = await fetchDoctors();
    const patients = await fetchPatients();
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
    setDoctors(mappedDoctors);
    setPatients(mappedPatients);
  }
 
  useEffect(() => {
      fetchData();
  }, []);


  return (
    <div className="p-16 space-y12 ">
        <UserList users={doctors} title="Doctors" setUsers={setDoctors} linkableUsers={patients}/>
        <UserList users={patients} title="Patients" setUsers={setPatients} linkableUsers={doctors}/>
    </div>
  );
};

export default AdminDashboard;