package ch.zhaw.init.ehr.ehrbackend.service;

import ch.zhaw.init.ehr.ehrbackend.model.MedicalRecord;
import ch.zhaw.init.ehr.ehrbackend.repository.MedicalRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;

    public MedicalRecord saveRecord(MedicalRecord record) {
        return medicalRecordRepository.save(record);
    }

    public MedicalRecord getRecord(Long id) {
        return medicalRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found: " + id));
    }

    public List<MedicalRecord> getRecordsByPatient(Long patientId) {
        return medicalRecordRepository.findByPatientId(patientId);
    }
}
