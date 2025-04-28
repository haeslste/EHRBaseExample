"use client";

import React, { useEffect, useRef, useState } from "react";
import "medblocks-ui";
import "medblocks-ui/dist/styles.js";
import { fetchWebTemplate } from "@/services/template_service";

interface Props {
    templateId: string;
    ehrId: string;
    onSuccess?: (data: any) => void;
}

const IGNORED_IDS = [
    "name",
    "category",
    "Tree",
    "null_flavour",
    "feeder_audit",
    "archetype_node_id",
    "archetype_details"
];

function cleanWebTemplateNode(node: any): any {
    if (IGNORED_IDS.includes(node.id)) return null;

    const cleanedNode = { ...node };

    if (cleanedNode.children && Array.isArray(cleanedNode.children)) {
        cleanedNode.children = cleanedNode.children
            .map(cleanWebTemplateNode)
            .filter((child) => child !== null);
    }

    const noInputs = !cleanedNode.inputs || cleanedNode.inputs.length === 0;
    const noChildren = !cleanedNode.children || cleanedNode.children.length === 0;

    // Only remove the node if it’s completely empty
    if (noInputs && noChildren) return null;

    return cleanedNode;
}


const MedblocksFormRenderer: React.FC<Props> = ({ templateId, ehrId, onSuccess }) => {
    const formRef = useRef<any>(null);
    const [webTemplate, setWebTemplate] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTemplate = async () => {
            try {
                const data = await fetchWebTemplate(templateId);
                if (!data) throw new Error("Template not found");

                // Clean the tree
                const cleanedTree = cleanWebTemplateNode(data.tree);
                const cleanedTemplate = {
                    ...data,
                    tree: cleanedTree,
                };

                setWebTemplate(cleanedTemplate);
            } catch (err: any) {
                setError(err.message || "Failed to load template");
            } finally {
                setLoading(false);
            }
        };

        if (templateId) {
            setLoading(true);
            loadTemplate();
        }
    }, [templateId]);

    useEffect(() => {
        const form = formRef.current;
        if (form && webTemplate) {
            form.webTemplate = webTemplate;

            form.ctx = {
                language: "en",
                territory: "IE",
                composer_name: "admin",
                ehr_id: ehrId,
            };

            const handleSubmit = (event: CustomEvent) => {
                const composition = event.detail;
                const url_string = "http:localhost:8080/ehrbase/rest/openehr/v1/ehr/" + ehrId + "/compositions";
                fetch(url_string, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ templateId, ehrId, composition }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        alert("Submitted: " + JSON.stringify(data));
                        onSuccess?.(data);
                    })
                    .catch((err) => {
                        alert("Submission failed: " + err.message);
                    });
            };

            form.addEventListener("mb-submit", handleSubmit);
            return () => {
                form.removeEventListener("mb-submit", handleSubmit);
            };
        }
    }, [webTemplate, ehrId, templateId, onSuccess]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-600">Error: {error}</p>;
    if (!webTemplate) return <p>No WebTemplate data found.</p>;

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-blue-600">{templateId}</h3>
            <mb-auto-form ref={formRef}>

            </mb-auto-form>
            <mb-submit>
                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={() => {
                        const form = formRef.current;
                        if (form) {
                            form.dispatchEvent(new Event("mb-submit"));
                        }
                    }}
                >
                    Submit Form
                </button>
            </mb-submit>
        </div>
    );
};

export default MedblocksFormRenderer;
