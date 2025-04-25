// src/main/java/ch/zhaw/init/ehr/ehrbackend/service/EhrbaseRestClient.java
package ch.zhaw.init.ehr.ehrbackend.service;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import ch.zhaw.init.ehr.ehrbackend.config.EhrbaseProperties;
import jakarta.annotation.PostConstruct;
import jakarta.json.Json;

@Service
@RequiredArgsConstructor
public class EhrbaseRestClient {
    private final EhrbaseProperties ehrbaseProperties;

    private String getBaseUrl() {
        String url = ehrbaseProperties.getUrl();
        if (url == null || url.isBlank()) {
            throw new IllegalStateException("EHRbase URL is not configured. Please set 'ehrbase.url' in application.properties.");
        }
        return url;
    }

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

    public String createPatientEHR(String patientId) {
        String url = getBaseUrl() + "/ehr?subjectId=" + patientId + "&subjectNamespace=EHRbase";
        System.out.println("📡 Creating EHR with URL: " + url);

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        HttpEntity<String> entity = new HttpEntity<>(null, headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Failed to create EHR for patient: " + response.getStatusCode());
        }

        String ehrId = getEHRId(response);
        if (ehrId == null) {
            throw new RuntimeException("Failed to parse EHR ID from response: " + response.getBody());
        }

        return ehrId;
    }


    private String getEHRId(ResponseEntity<String> response) {
        String body = response.getBody();
    
        if (body == null || body.isBlank()) {
            throw new RuntimeException("❌ EHRbase response body is null or empty, cannot extract ehrId");
        }
    
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(body);
    
            JsonNode ehrIdNode = root.path("ehr_id").path("value");
    
            if (ehrIdNode.isMissingNode() || ehrIdNode.asText().isBlank()) {
                throw new RuntimeException("❌ ehr_id.value is missing in EHRbase response: " + body);
            }
    
            return ehrIdNode.asText();
    
        } catch (JsonProcessingException e) {
            throw new RuntimeException("❌ Failed to parse EHRbase response: " + body, e);
        }
    }
    
}
