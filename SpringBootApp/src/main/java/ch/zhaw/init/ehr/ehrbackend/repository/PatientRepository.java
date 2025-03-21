package ch.zhaw.init.ehr.ehrbackend.repository;

import ch.zhaw.init.ehr.ehrbackend.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}