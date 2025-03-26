package ch.zhaw.init.ehr.ehrbackend;

import java.util.Arrays;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;


@SpringBootApplication(scanBasePackages = "ch.zhaw.init.ehr.ehrbackend")
public class EhrbackendApplication {
    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(EhrbackendApplication.class, args);

        System.out.println("✅ Registered beans:");
        Arrays.stream(context.getBeanDefinitionNames())
                .filter(bean -> bean.toLowerCase().contains("datainitializer"))
                .forEach(System.out::println);
    }
}

