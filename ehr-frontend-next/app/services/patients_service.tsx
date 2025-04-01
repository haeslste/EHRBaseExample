import axios from 'axios';

export async function fetchPatients() {
    console.log("Fetching patients...");
    const response = await axios.get('http://localhost:8085/patient/all', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    console.log("Response: ", response.data);
    return response.data;
}