package ch.zhaw.init.ehr.ehrbackend.repository;

import ch.zhaw.init.ehr.ehrbackend.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByUserId(Long userId);
}