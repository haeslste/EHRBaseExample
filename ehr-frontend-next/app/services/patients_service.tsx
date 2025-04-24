import axios from 'axios';

export async function fetchPatients() {
    console.log("Fetching patients...");
    const response = await axios.get('http://localhost:8085/patient/all', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
}

export async function fetchPatientsOfDoctor(doctorId:any) {
    const response = await axios.get(`http://localhost:8085/doctor/${doctorId}/patients`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
}

export async function fetchPatientById(patientId:any) {
    const response = await axios.get(`http://localhost:8085/patient/${patientId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
}