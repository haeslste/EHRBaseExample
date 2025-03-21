package ch.zhaw.init.ehr.ehrbackend.repository;

import ch.zhaw.init.ehr.ehrbackend.model.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {
    List<MedicalRecord> findByPatientId(Long patientId);
}
