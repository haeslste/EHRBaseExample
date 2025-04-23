package ch.zhaw.init.ehr.ehrbackend.config;

import ch.zhaw.init.ehr.ehrbackend.model.*;
import ch.zhaw.init.ehr.ehrbackend.repository.*;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${default.user.username:user}")
    private String defaultUserUsername;

    @Value("${default.user.password:password}")
    private String defaultUserPassword;

    @Value("${default.admin.username:admin}")
    private String defaultAdminUsername;

    @Value("${default.admin.password:adminpass}")
    private String defaultAdminPassword;

    @Value("${default.superuser.username:superuser}")
    private String defaultSuperuserUsername;

    @Value("${default.superuser.password:superpass}")
    private String defaultSuperuserPassword;

    public DataInitializer(UserRepository userRepository, DoctorRepository doctorRepository,
                           PatientRepository patientRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
        this.passwordEncoder = passwordEncoder;
        logger.info("✅✅✅ DataInitializer CONSTRUCTOR CALLED");
    }

    @Override
    public void run(String... args) {
        try {
            logger.info("DataInitializer running...");

            // Core users
            createUserIfNotExists(defaultUserUsername, defaultUserPassword, UserRole.ROLE_STANDARDUSER);
            createUserIfNotExists(defaultAdminUsername, defaultAdminPassword, UserRole.ROLE_ADMIN);
            createUserIfNotExists(defaultSuperuserUsername, defaultSuperuserPassword, UserRole.ROLE_SUPERUSER);

            // Doctors (user1 - user5)
            for (int i = 1; i <= 5; i++) {
                String username = "user" + i;
                String password = "password";

                if (!userRepository.existsByUsername(username)) {
                    User user = new User();
                    user.setUsername(username);
                    user.setPassword(passwordEncoder.encode(password));
                    user.setRole(UserRole.ROLE_DOCTOR);
                    User savedUser = userRepository.save(user); // save and get managed instance

                    Doctor doctor = Doctor.builder()
                            .firstName("DoctorFirst" + i)
                            .lastName("DoctorLast" + i)
                            .speciality("Speciality" + i)
                            .user(savedUser)
                            .build();
                    doctorRepository.save(doctor);

                    logger.info("Created doctor user '{}' linked to doctor '{} {}'", username, doctor.getFirstName(), doctor.getLastName());
                }
            }

            // Patients (user6 - user10)
            for (int i = 6; i <= 10; i++) {
                String username = "user" + i;
                String password = "password";

                if (!userRepository.existsByUsername(username)) {
                    User user = new User();
                    user.setUsername(username);
                    user.setPassword(passwordEncoder.encode(password));
                    user.setRole(UserRole.ROLE_STANDARDUSER);
                    User savedUser = userRepository.save(user); // save and get managed instance

                    Patient patient = Patient.builder()
                            .firstName("PatientFirst" + i)
                            .lastName("PatientLast" + i)
                            .dateOfBirth("1990-01-" + String.format("%02d", i))
                            .user(savedUser)
                            .build();
                    patientRepository.save(patient);

                    logger.info("Created patient user '{}' linked to patient '{} {}'", username, patient.getFirstName(), patient.getLastName());
                }
            }

        } catch (Exception e) {
            logger.error("❌ Error during DataInitializer", e);
        }
    }

    private void createUserIfNotExists(String username, String password, UserRole role) {
        if (!userRepository.existsByUsername(username)) {
            User user = new User();
            user.setUsername(username);
            user.setPassword(passwordEncoder.encode(password));
            user.setRole(role);
            userRepository.save(user);
            logger.info("Created user '{}', role '{}'", username, role);
        }
    }

    @PostConstruct
    public void postConstruct() {
        logger.info("✅✅✅ DataInitializer POST CONSTRUCT CALLED");
    }
}
