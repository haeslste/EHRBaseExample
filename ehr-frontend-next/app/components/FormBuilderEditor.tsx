"use client";

import { useEffect, useState } from "react";
import { fetchWebTemplate } from "../services/template_service";

interface FormElementConfig {
  id: string;
  label: string;
  type: string;
  path: string;
}

export default function FormBuilderEditor({ templateId }: { templateId: string }) {
  const [webTemplate, setWebTemplate] = useState<any>(null);
  const [elements, setElements] = useState<FormElementConfig[]>([]);

    const fetchTemplate = async (templateId: string) => {
      const response = await fetchWebTemplate(templateId);
      if (!response) {
          console.error("Failed to fetch web template");
          return null;
      }
      return response.data;
      };
  
    useEffect(() => {
      const data = fetchTemplate(templateId);
      setWebTemplate(data);
    }, [templateId]);

  const addElement = (node: any) => {
    setElements((prev) => [
      ...prev,
      {
        id: node.id,
        label: node.name,
        type: node.rmType || "Text",
        path: node.aqlPath || "",
      },
    ]);
  };

  if (!webTemplate) return <p>Loading...</p>;

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Form Builder for Template: {templateId}</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Left: WebTemplate Node Picker */}
        <div className="border p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Available Nodes</h3>
          {webTemplate.tree?.children?.map((node: any) => (
            <div
              key={node.id}
              className="border-b py-1 cursor-pointer hover:text-blue-600"
              onClick={() => addElement(node)}
            >
              {node.name} ({node.rmType})
            </div>
          ))}
        </div>

        {/* Right: Current Form Layout */}
        <div className="border p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Form Layout</h3>
          {elements.map((el, i) => (
            <div key={i} className="p-2 border mb-2 rounded bg-gray-100">
              <strong>{el.label}</strong> – {el.type}
              <div className="text-xs text-gray-600">{el.path}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
