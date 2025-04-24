package ch.zhaw.init.ehr.ehrbackend.service;

import ch.zhaw.init.ehr.ehrbackend.model.Doctor;
import ch.zhaw.init.ehr.ehrbackend.model.Patient;
import ch.zhaw.init.ehr.ehrbackend.repository.DoctorRepository;
import ch.zhaw.init.ehr.ehrbackend.repository.PatientRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;

    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public Doctor getDoctor(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found: " + id));
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorByUserId(Long userId) {
        return doctorRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Doctor not found for userId: " + userId));
    }
    
    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
    @Transactional
    public void assignPatientToDoctor(Long doctorId, Long patientId) {
        Doctor doctor = doctorRepository.findById(doctorId)
            .orElseThrow(() -> new RuntimeException("Doctor not found: " + doctorId));
        Patient patient = patientRepository.findById(patientId)
            .orElseThrow(() -> new RuntimeException("Patient not found: " + patientId));

        doctor.getPatients().add(patient);
        patient.getDoctors().add(doctor);

        doctorRepository.save(doctor); // saving one side is enough since it's transactional
    }


}