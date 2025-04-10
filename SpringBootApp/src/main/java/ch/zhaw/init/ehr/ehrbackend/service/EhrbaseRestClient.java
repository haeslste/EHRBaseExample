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

import jakarta.json.Json;

@Service
@RequiredArgsConstructor
public class EhrbaseRestClient {

    @Value("${ehrbase.url}")
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
        String url = ehrbaseUrl + "/definition/template//adl1.4/" + templateId;
    
        ResponseEntity<String> response = restTemplate.exchange(
            url,
            HttpMethod.GET,
            entity,
            String.class
        );
    
        if (!response.getStatusCode().is2xxSuccessful()) {
            // log the error or handle it as needed
            System.err.println("Error fetching WebTemplate: " + response.getStatusCode());
            throw new RuntimeException("EHRbase returned status: " + response.getStatusCode());
        }
    
        return response.getBody();
    }

    public String submitComposition(String ehrId, String templateId, String compositionJson) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
    
        HttpEntity<String> request = new HttpEntity<>(compositionJson, headers);
    
        String url = ehrbaseUrl + "/ehr/" + ehrId + "/composition?templateId=" + templateId + "&format=FLAT";
    
        ResponseEntity<String> response = restTemplate.exchange(
            url, HttpMethod.POST, request, String.class
        );
    
        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Failed to submit composition to EHRbase: " + response.getStatusCode());
        }
    
        //TODO: parse the UID from response if needed
        return response.getBody();
    }

    private String getEHRId(ResponseEntity<String> response) {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root;
        String ehrId = null;
        try {
            root = mapper.readTree(response.getBody());
            ehrId = root.path("ehr_id").path("value").asText();
        } catch (JsonMappingException e) {
            e.printStackTrace();
            return null;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
        return ehrId;
    }
    public String createPatientEHR(String PatienId) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        
        String url = ehrbaseUrl + "/ehr?subject_id=" + PatienId + "&subject_namespace=EHRbase";
        
    
        ResponseEntity<String> response = restTemplate.exchange(
            url, HttpMethod.POST, null, String.class
        );
        

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Failed to create EHR for patient: " + response.getStatusCode());
        }

        String ehrId = getEHRId(response);
        if (ehrId == null) {
            throw new RuntimeException("Failed to parse EHR ID from response: " + response.getBody());
        }
        return ehrId;
    } 
    
    
}
