import axios from 'axios';

// fetch all doctors. For fetching use docktor/all endpoint and pass the token in the header
export async function fetchDoctors() {
    console.log("Fetching doctors...");
    const response = await axios.get('http://localhost:8085/doctor/all', {

        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    console.log("Response: ", response.data);
    return response.data;
}

