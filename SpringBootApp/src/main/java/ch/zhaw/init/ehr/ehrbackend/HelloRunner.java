package ch.zhaw.init.ehr.ehrbackend;

import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import ch.zhaw.init.ehr.ehrbackend.config.DataInitializer;

@Component
public class HelloRunner implements CommandLineRunner {
    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Override
    public void run(String... args) {
        logger.info("✅✅✅ DataInitializer CONSTRUCTOR CALLED");
        logger.debug("✅✅✅ DataInitializer CONSTRUCTOR CALLED");
        logger.error("✅✅✅ DataInitializer CONSTRUCTOR CALLED");
        System.out.println("✅ HelloRunner ran");
    }
}