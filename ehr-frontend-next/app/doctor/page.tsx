"use client";
import { FC, useState, useEffect } from 'react';
import { DashboardStatCard } from '@/components/cards/DashboardStatCard';
import {fetchDoctors} from "@/services/doctors_service";
import {fetchPatients} from "@/services/patients_service";
import { fetchTemplates } from '@/services/template_service';

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

const DoctorDashboard: React.FC = () => {
  const [users, setUsers] = useState([{}]);
  const [templates, setTemplates] = useState([{}]);
  const [forms, setForms] = useState([]);
  const [compositions, setCompositions] = useState([]); 
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const fetchData = async () => {
    const doctors = await fetchDoctors();
    const patients = await fetchPatients();
    const templates = await fetchTemplates();
    setDoctors(doctors);
    setPatients(patients);
    setTemplates(templates);
  }
 
  useEffect(() => {
      fetchData();
  }, []);

  return (
    <div className="p-16 space-y-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <DashboardStatCard title="Patients" count={patients.length} />
        <DashboardStatCard title="Forms" count={forms.length} />
        <DashboardStatCard title="Compositions" count={forms.length} />
      </div>
    </div>
  );
};

export default DoctorDashboard;