"use client";

import { FC, useState } from "react";
import { Card } from "@/components/cards/Card";

interface Template {
    templateId: string;
    description?: string;
}

interface FormSelectorProps {
    templates: Template[];
    onSelect: (templateId: string) => void;
}

export const FormSelector: FC<FormSelectorProps> = ({ templates, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredTemplates = templates.filter((template) =>
        template.templateId?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Card className="space-y-4">
            <h2 className="text-xl font-semibold">Select a Form Template</h2>

            <input
                type="text"
                placeholder="Search by template ID..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {filteredTemplates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredTemplates.map((template) => (
                        <div
                            key={template.templateId}
                            className="p-4 border rounded shadow-sm bg-white hover:shadow-md transition"
                        >
                            <h3 className="text-lg font-bold text-blue-600">{template.templateId}</h3>
                            <p className="text-gray-600">
                                {template.description || "No description available."}
                            </p>
                            <button
                                onClick={() => onSelect(template.templateId)}
                                className="mt-2 inline-block text-sm text-blue-600 hover:underline"
                            >
                                Use Template
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No templates found.</p>
            )}
        </Card>
    );
};

export default FormSelector;
