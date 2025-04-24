"use client";

import { useParams } from "next/navigation";
import FormBuilder from "@/components/FormBuilder";

export default function TemplateFormPage() {
  const params = useParams();
  const templateId = params?.templateId as string;
  console.log("Rendering template form page with ID: ", templateId);
  return (
    <div className="p-10">
      <FormBuilder templateId={templateId} />
    </div>
  );
}
