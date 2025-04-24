"use client";

import { useState, useEffect } from "react";
import { fetchPatientById } from "@/services/patients_service";
import { Card } from "@/components/cards/Card";
import { fetchTemplates } from "@/services/template_service";
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
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const patientData = await fetchPatientById(params.patientid);
        setPatient(patientData);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };

    const fetchTemplateData = async () => {
      try {
        const templates = await fetchTemplates();
        setTemplates(templates);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchPatientData();
    fetchTemplateData();
  }, [params.patientid]);

  const resetHealthRecordAddition = () => {
    setAddingHealthRecord(false);
    setSelectedTemplate(null);
  };

  if (!patient) {
    return <div className="p-6">Loading...</div>;
  }

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
        <Card>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Add New Health Record</h2>
      
            {/* Step 1: Template Selection */}
            {!selectedTemplate ? (
              <FormSelector
                templates={templates}
                onSelect={(templateId) => {
                  const template = templates.find((t) => t.templateId === templateId);
                  setSelectedTemplate(template);
                }}
              />
            ) : null}
      
            {/* Step 2: Render form after selection */}
            {selectedTemplate && (
              <div className="p-4 border border-gray-300 rounded bg-gray-50">
                <h3 className="text-lg font-medium text-blue-700 mb-2">
                  Filling form: {selectedTemplate.templateId}
                </h3>
      
                {/* Replace this with your actual form renderer */}
                <div className="text-sm text-gray-600">
                  [ Form for template <strong>{selectedTemplate.templateId}</strong> would go here. ]
                </div>
              </div>
            )}
      
            {/* Cancel button */}
            <div className="flex justify-end">
              <button
                className="text-white mt-4 px-4 py-2 bg-gray-500 rounded hover:bg-gray-600"
                onClick={resetHealthRecordAddition}
              >
                Cancel
              </button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
