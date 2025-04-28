"use client";

import React, { useEffect, useState } from "react";
import { fetchWebTemplate } from "@/services/template_service";
import transformNode from "@/components/transformations/transformations";
import { extractLeafNodes } from "@/utils/extractLeafNodes";

interface Props {
  templateId: string;
  ehrId: string;
  onSuccess?: (data: any) => void;
}

const IGNORED_LABELS = [
  "uid",
  "archetype_node_id",
  "archetype_details",
  "feeder_audit",
  "name",
  "links",
  "guideline_id",
];

const TemplateFormRenderer: React.FC<Props> = ({ templateId, ehrId, onSuccess }) => {
  const [webTemplate, setWebTemplate] = useState<any>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTemplate = async () => {
    try {
      const data = await fetchWebTemplate(templateId);
      if (!data) throw new Error("Template not found");
      setWebTemplate(data);
    } catch (err: any) {
      setError(err.message || "Failed to load template");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (templateId) {
      setLoading(true);
      loadTemplate();
    }
  }, [templateId]);

  const handleChange = (path: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [path]: value }));
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
        body: JSON.stringify({ templateId, ehrId, composition }),
      });

      const data = await res.json();
      alert("Submitted: " + JSON.stringify(data));
      onSuccess?.(data);
    } catch (err: any) {
      alert("Submission failed: " + err.message);
    }
  };

  const renderNode = (node: any, renderedKeys: Set<string>) => {
    if (IGNORED_LABELS.includes(node.id)) return null;

    const label = node.localizedName || node.name || node.id;
    const uniqueKey = `${label}-${node.path}`;

    if (renderedKeys.has(uniqueKey)) return null;
    renderedKeys.add(uniqueKey);

    const components = transformNode(node);
    if (!Array.isArray(components)) return null;

    return components.map((comp, index) =>
      typeof comp.component === "function" ? (
        <div key={`${node.path}-${index}`} className="mb-4">
          {comp.component({
            path: node.path,
            label,
            onChange: (e: any) => handleChange(node.path, e.target.value),
          })}
        </div>
      ) : null
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!webTemplate) return <p>No WebTemplate data found.</p>;

  const leafNodes = extractLeafNodes(webTemplate.tree);
  const renderedKeys = new Set<string>(); // create it fresh for each render

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-blue-600">{templateId}</h3>
      {leafNodes.map((node) => (
        <div key={node.path}>{renderNode(node, renderedKeys)}</div>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Submit Form
      </button>
    </div>
  );
};

export default TemplateFormRenderer;
