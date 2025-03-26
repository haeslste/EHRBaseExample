package ch.zhaw.init.ehr.ehrbackend.config;

import ch.zhaw.init.ehr.ehrbackend.model.User;
import ch.zhaw.init.ehr.ehrbackend.model.UserRole;
import ch.zhaw.init.ehr.ehrbackend.repository.UserRepository;
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
    private final PasswordEncoder passwordEncoder;

    // Values provided via application.properties or environment variables
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

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        logger.info("✅✅✅ DataInitializer CONSTRUCTOR CALLED");
    }

    @Override
    public void run(String... args) {
        try{
            System.out.println("DataInitializer running...");
            logger.info("DataInitializer running...");
            // Create a default regular user if not exists
            if (!userRepository.existsByUsername(defaultUserUsername)) {
                User user = new User();
                user.setUsername(defaultUserUsername);
                user.setPassword(passwordEncoder.encode(defaultUserPassword));
                user.setRole(UserRole.ROLE_STANDARDUSER);
                userRepository.save(user);
            }
    
            // Create a default admin if not exists
            if (!userRepository.existsByUsername(defaultAdminUsername)) {
                User admin = new User();
                admin.setUsername(defaultAdminUsername);
                admin.setPassword(passwordEncoder.encode(defaultAdminPassword));
                admin.setRole(UserRole.ROLE_ADMIN);
                userRepository.save(admin);
            }
    
            // Create a default superuser if not exists
            if (!userRepository.existsByUsername(defaultSuperuserUsername)) {
                User superuser = new User();
                superuser.setUsername(defaultSuperuserUsername);
                superuser.setPassword(passwordEncoder.encode(defaultSuperuserPassword));
                superuser.setRole(UserRole.ROLE_SUPERUSER);
                userRepository.save(superuser);
            }
        }
        catch (Exception e){
            System.out.println("DataInitializer error: " + e.getMessage());
            logger.error("DataInitializer error: " + e.getMessage());
            logger.error("❌ Error during DataInitializer", e); 
        }

    }
    @PostConstruct
    public void postConstruct() {
        logger.info("✅✅✅ DataInitializer POST CONSTRUCT CALLED");
    }
}




