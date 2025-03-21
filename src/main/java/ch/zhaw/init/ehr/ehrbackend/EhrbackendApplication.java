package ch.zhaw.init.ehr.ehrbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import ch.zhaw.init.ehr.ehrbackend.restservice.Greeting;


@SpringBootApplication
public class EhrbackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(EhrbackendApplication.class, args);
		
	}

}
