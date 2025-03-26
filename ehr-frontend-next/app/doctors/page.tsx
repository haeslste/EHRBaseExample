import api from '@/services/api';


interface Doctor {
    id: number;
    firstName: string;
    lastName: string;
    specialty: string;
}

export default async function DoctorPage() {
    const { data: doctors } = await api.get('/doctors');

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">Doctors</h1>
            <ul>
                {doctors.map((doctor:Doctor) => (
                    <li key={doctor.id}>{doctor.firstName} {doctor.lastName}</li>
                ))}
            </ul>
        </main>
    );
}