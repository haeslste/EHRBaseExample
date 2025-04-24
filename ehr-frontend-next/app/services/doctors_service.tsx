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


export async function fetchMyDoctorProfile() {
    console.log("Fetching current doctor profile...");
    try {
        if (localStorage.getItem('token') === null) {
            console.warn("No token found in localStorage.");
            return null;
        }
        const response = await axios.get('http://localhost:8085/doctor/me', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log("My Doctor Profile Response: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching doctor profile:", error);
        return null;
    }
}