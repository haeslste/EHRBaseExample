// src/main/java/ch/zhaw/init/ehr/ehrbackend/service/EhrbaseRestClient.java
package ch.zhaw.init.ehr.ehrbackend.service;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class EhrbaseRestClient {

    @Value("${ehrbase.url:http://localhost:8080/ehrbase/rest/openehr/v1}")
    private String ehrbaseUrl;

    public void uploadTemplateToEhrbase(String xml) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_XML);
        HttpEntity<String> request = new HttpEntity<>(xml, headers);

        String url = ehrbaseUrl + "/definition/template/adl1.4";

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Failed to upload template to EHRbase: " + response.getStatusCode());
        }
    }

    public String getWebTemplateJson(String templateId) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
    
        HttpEntity<String> entity = new HttpEntity<>(headers);
    
        String url = ehrbaseUrl + "/definition/template/" + templateId + "/web";
    
        ResponseEntity<String> response = restTemplate.exchange(
            url,
            HttpMethod.GET,
            entity,
            String.class
        );
    
        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("EHRbase returned status: " + response.getStatusCode());
        }
    
        return response.getBody();
    }
    
    
}
