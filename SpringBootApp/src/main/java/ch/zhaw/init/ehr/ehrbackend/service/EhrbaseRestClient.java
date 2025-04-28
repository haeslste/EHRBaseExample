// src/main/java/ch/zhaw/init/ehr/ehrbackend/service/EhrbaseRestClient.java
package ch.zhaw.init.ehr.ehrbackend.service;

import lombok.RequiredArgsConstructor;

import java.util.List;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class EhrbaseRestClient extends EHRBaseService {
  
    public void uploadTemplateToEhrbase(String xml) {
        String url = getBaseUrl() + "/definition/template/adl1.4";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_XML);
        HttpEntity<String> request = new HttpEntity<>(xml, headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Failed to upload template to EHRbase: " + response.getStatusCode());
        }
    }

    public String getWebTemplateJson(String templateId) {
        String url = getBaseUrl() + "/definition/template/adl1.4/" + templateId;
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("EHRbase returned status: " + response.getStatusCode());
        }

        return response.getBody();
    }

    public String submitComposition(String ehrId, String templateId, String compositionJson) {
        String url = getBaseUrl() + "/ehr/" + ehrId + "/composition?templateId=" + templateId + "&format=STRUCTURED";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        HttpEntity<String> request = new HttpEntity<>(compositionJson, headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Failed to submit composition to EHRbase: " + response.getStatusCode());
        }

        return response.getBody();
    }

    
}
