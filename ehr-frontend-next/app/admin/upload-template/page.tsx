'use client';

import { useState } from 'react';

export default function UploadTemplatePage() {
  const [templateName, setTemplateName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !templateName) {
      setMessage('Please fill in the name and select a file.');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('templateName', templateName);
    formData.append('description', description);

    try {
      const res = await fetch('http://localhost:8085/admin/templates/upload', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.ok) {
        setMessage('✅ Template uploaded successfully!');
        setTemplateName('');
        setDescription('');
        setFile(null);
      } else {
        const err = await res.text();
        setMessage(`❌ Upload failed: ${err}`);
      }
    } catch (err: any) {
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload .opt Template</h2>
      <form onSubmit={handleUpload}>
        <label className="block mb-2 font-medium">
          Template Name
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            required
          />
        </label>

        <label className="block mb-2 font-medium">
          Description (optional)
          <textarea
            className="w-full mt-1 p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </label>

        <label className="block mb-2 font-medium">
          .opt File
          <input
            type="file"
            accept=".opt"
            className="w-full mt-1"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
          />
        </label>

        <button
          type="submit"
          disabled={uploading}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>

        {message && (
          <p className="mt-4 text-sm text-gray-700 whitespace-pre-wrap">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
