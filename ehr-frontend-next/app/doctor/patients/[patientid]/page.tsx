"use client";

import { useState, useEffect } from "react";
import { fetchPatientById } from "@/services/patients_service";
import { Card } from "@/components/cards/Card";
import { fetchTemplates } from '@/services/template_service';
import FormSelector from "@/components/FormSelector";
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


export default function PatientDetailPage({
    params,
}: {
    params: { patientid: string };
}) {
    const [patient, setPatient] = useState<PatientProfileData | null>(null);
    const [addingHealthRecord, setAddingHealthRecord] = useState(false);
    const [templates, setTemplates] = useState([{}]);

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const patientData = await fetchPatientById(params.patientid);
                console.log(" patientData", patientData);
                setPatient(patientData);
            } catch (error) {
                console.error("Error fetching patient:", error);
            }
            console.log("params:", params);
        };

        const fetchTemplateData = async () => {
            try {
                const templates = await fetchTemplates();
                setTemplates(templates);
                console.log("templates:", templates);
            } catch (error) {
                console.error("Error fetching templates:", error);
            }
        }
        fetchPatientData();
        fetchTemplateData();
    }, [params.id]);

    if (!patient) {
        return <div className="p-6">Loading...</div>;
    }

    const onCreateNewRecord = () => {
        console.log("Create new record");
    };
    return (
        <div className="p-6 space-y-4">
            <Card>
                <h1 className="text-2xl font-bold">
                    {patient.firstName} {patient.lastName}
                </h1>
                <p>
                    <strong>Username:</strong> {patient.user.username}
                </p>
                <p>
                    <strong>Date of Birth:</strong> {patient.dateOfBirth}
                </p>
            </Card>
            {!addingHealthRecord ? (
                <Card>
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold">Medical Records</h2>
                        {patient.records && patient.records.length > 0 ? (
                            <ul className="list-disc list-inside">
                                {patient.records.map((record) => (
                                    <li key={record.id}>
                                        {record.title} - {record.date}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No medical records available.</p>
                        )}
                        <button
                            className="text-white mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                            onClick={() => setAddingHealthRecord(true)}
                        >
                            + Add Record
                        </button>
                    </div>
                </Card>
            ) : (
                <div className="mt-4">
                
                <Card>
                <h2 className="text-xl font-semibold">Add New Health Record</h2>
                    <FormSelector
                        templates={templates as any[]} // You can strongly type it if needed
                        onSelect={(templateId) => {
                            console.log("Selected template for form entry:", templateId);
                            // You could also set it in state and render the form dynamically
                        }}
                        />
                        {/* Add your health record form here */}
                            <button
                            className="text-white mt-4 px-4 py-2 bg-gray-500 rounded hover:bg-gray-600"
                            onClick={() => setAddingHealthRecord(false)}
                        >
                            Cancel
                        </button>

                </Card>
                </div>
            )}
        </div>
    );
}
