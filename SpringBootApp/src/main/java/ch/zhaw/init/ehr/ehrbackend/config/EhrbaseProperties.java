package ch.zhaw.init.ehr.ehrbackend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import lombok.Data;

@Configuration
@ConfigurationProperties(prefix = "ehrbase")
@Data
public class EhrbaseProperties {
    private String url;
}