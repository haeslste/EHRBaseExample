import axios from 'axios';

export async function fetchTemplates() {
    console.log("Fetching templates...");
    const response = await axios.get('http://localhost:8085/admin/templates', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    console.log("Response: ", response.data);
    return response.data;
}

export async function fetchWebTemplate(templateId: string) {
    console.log("Fetching web template with ID:", templateId);
    const token = localStorage.getItem('token');
    const response = await axios.get(
        `http://localhost:8085/admin/templates/webtemplate/${templateId}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data; 
}