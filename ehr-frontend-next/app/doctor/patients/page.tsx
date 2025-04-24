"use client";
import { FC, useState, useEffect } from 'react';
import {fetchPatients, fetchPatientsOfDoctor} from "@/services/patients_service";
import {fetchMyDoctorProfile} from "@/services/doctors_service";
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
  const [myDoctorProfile, setMyDoctorProfile] = useState(null);

  const fetchData = async () => {
    const myDoctorProfile = await fetchMyDoctorProfile();
    setMyDoctorProfile(myDoctorProfile);
    const doctorId = myDoctorProfile.id;
    const patients = await fetchPatientsOfDoctor(doctorId);
    setPatients(patients);

    const mappedPatients = patients.map((patient:UserData) => ({
      id: patient.id,
      name: `${patient.firstName}`,
      lastName: `${patient.lastName}`,
      username: patient.user.username,
      role: 'Patient',
    }));
    
    const allUsers = [ ...mappedPatients];
    setUsers(allUsers);
    setPatients(mappedPatients);
    console.log("Patients: ", patients);
  }
 
  useEffect(() => {
      fetchData();
  }, []);


  return (
    <div className="p-16 space-y12 ">
        <UserList users={patients} title="Patients" setUsers={setPatients} linkableUsers={patients}/>
    </div>
  );
};

export default AdminDashboard;