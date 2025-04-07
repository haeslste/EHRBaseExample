"use client";
import React, { useEffect, useState } from "react";
import { fetchWebTemplate } from "../services/template_service";
import transformNode from '@/components/transformations/transformations';
import { extractLeafNodes } from "@/utils/extractLeafNodes";

export default function FormBuilder({ templateId }) {
  const [webTemplate, setWebTemplate] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTemplate = async (id) => {
    try {
      const data = await fetchWebTemplate(id);
      if (!data) {
        throw new Error("Template data is empty");
      } else {
        console.log("Template Loaded:", JSON.stringify(data));
      }
      setWebTemplate(data);
    } catch (err) {
      console.error("Failed to fetch template:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!templateId) return;
    setLoading(true);
    loadTemplate(templateId);
  }, [templateId]);

  const handleChange = (path, value) => {
    setFormValues(prev => ({ ...prev, [path]: value }));
  };

  const handleSubmit = async () => {
    const composition = {
      "ctx-language": "en",
      "ctx-territory": "IE",
      "ctx-composer_name": "admin",
      ...formValues,
    };

    try {
      const res = await fetch("/api/compositions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId,
          ehrId: "your-ehr-id",
          composition,
        }),
      });

      const data = await res.json();
      alert("Submitted: " + JSON.stringify(data));
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit: " + err.message);
    }
  };

  const IGNORED_LABELS = ['uid', 'archetype_node_id', 'archetype_details', 'feeder_audit', 'name', 'links', 'guideline_id'];

  const renderNode = (node) => {
  if (IGNORED_LABELS.includes(node.id)) return null;

  const components = transformNode(node);
  if (!Array.isArray(components)) return null;

  const label = node.localizedName || node.name || node.id;

  return components.map((comp, index) => (
    <div key={`${node.path}-${index}`}>
      {typeof comp.component === 'function'
        ? comp.component({
            path: node.path,
            label,
            onChange: (e) => handleChange(node.path, e.target.value),
          })
        : null}
    </div>
  ));
};

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!webTemplate) return <p>No template found.</p>;

  const leafNodes = extractLeafNodes(webTemplate.tree);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{webTemplate.templateId}</h2>
      {leafNodes.map((node) => (
        <div key={node.path}>{renderNode(node)}</div>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Submit
      </button>
    </div>
  );
}
