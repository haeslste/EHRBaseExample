package ch.zhaw.init.ehr.ehrbackend.service;

import ch.zhaw.init.ehr.ehrbackend.model.Patient;
import ch.zhaw.init.ehr.ehrbackend.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientRepository patientRepository;

    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient getPatient(Long id) {
        return patientRepository.findById(id).orElseThrow();
    }
}