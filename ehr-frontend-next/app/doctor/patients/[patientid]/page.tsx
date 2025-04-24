'use client';

import { useState, useEffect } from 'react';
import { fetchPatientById } from '@/services/patients_service';
import { Card } from '@/components/cards/Card';


interface PatientProfileData {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  user: {
    id: number;
    username: string;
    role: string;
  };
  records?: {
    id: number;
    title: string;
    date: string;
  }[];
}

export default function PatientDetailPage({ params }: { params: { patientid: string } }) {
  const [patient, setPatient] = useState<PatientProfileData | null>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const patientData = await fetchPatientById(params.patientid);
        console.log(" patientData", patientData)
        setPatient(patientData);
      } catch (error) {
        console.error('Error fetching patient:', error);
      }
      console.log('params:', params);
    };

    fetchPatientData();
  }, [params.id]);

  if (!patient) {
    return <div className="p-6">Loading...</div>;
  }

  const onCreateNewRecord = () => {
    console.log("Create new record"); 

 }

  return (
    <div className="p-6 space-y-4">
      <Card>
        <h1 className="text-2xl font-bold">
            {patient.firstName} {patient.lastName}
        </h1>
        <p><strong>Username:</strong> {patient.user.username}</p>
        <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>
      </Card>
      <Card>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Medical Records</h2>
        {patient.records && patient.records.length > 0 ? (
          <ul className="list-disc list-inside">
            {patient.records.map((record) => (
              <li key={record.id}>{record.title} - {record.date}</li>
            ))}
          </ul>
        ) : (
          <p>No medical records available.</p>
        )}
       <button
              className="text-white min-w-xs gap-10 rounded-b-sm bg-blue-600 hover:underline"
              onClick={() => onCreateNewRecord()}
            >
              +
        </button>
      </div>
      </Card>

    </div>
  );
}
