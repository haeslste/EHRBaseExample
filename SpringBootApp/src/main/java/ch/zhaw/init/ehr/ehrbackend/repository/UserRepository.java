package ch.zhaw.init.ehr.ehrbackend.repository;

import ch.zhaw.init.ehr.ehrbackend.model.User;
import jakarta.persistence.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);
    Optional<User> findByUsername(String username);
}
