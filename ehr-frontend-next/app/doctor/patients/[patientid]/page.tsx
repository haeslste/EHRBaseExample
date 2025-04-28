"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchPatientById } from "@/services/patients_service";
import { fetchTemplates } from "@/services/template_service";
import { Card } from "@/components/cards/Card";
import FormSelector from "@/components/FormSelector";
import TemplateFormRenderer from "@/components/TemplateFormRenderer";
import MedblocksFormRenderer from "@/components/MedblocksFormRenderer";
export default function PatientDetailPage() {
    const { patientid } = useParams();
    const patientId = patientid as string;

    const [patient, setPatient] = useState<PatientProfileData | null>(null);
    const [addingHealthRecord, setAddingHealthRecord] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
    const [templates, setTemplates] = useState<any[]>([]);

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const patientData = await fetchPatientById(patientId);
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

        if (patientId) {
            fetchPatientData();
            fetchTemplateData();
        }
    }, [patientId]);

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
                <p>
                    <strong>EHR ID</strong> {patient.ehrId}
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
                                    console.log("Selected template:", template);
                                    setSelectedTemplate(template);
                                }}
                            />
                        ) : null}

                        {/* Step 2: Render form after selection */}
                        {selectedTemplate && (
                            <MedblocksFormRenderer
                                templateId={selectedTemplate.templateId}
                                ehrId={patient.ehrId} // make sure this is available in patient data
                                onSuccess={(data) => {
                                    console.log("Composition submitted:", data);
                                    resetHealthRecordAddition();
                                }}
                            />
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
