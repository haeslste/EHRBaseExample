package ch.zhaw.init.ehr.ehrbackend.controller;

import ch.zhaw.init.ehr.ehrbackend.dto.CompositionSubmissionRequest;
import ch.zhaw.init.ehr.ehrbackend.service.EhrbaseRestClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/ehr")
@RequiredArgsConstructor
public class CompositionController {

    private final EhrbaseRestClient ehrbaseRestClient;

    @PostMapping("/composition")
    public ResponseEntity<?> submitComposition(@RequestBody CompositionSubmissionRequest request) {
        System.out.println("composition: " + request.getCompositionJson());
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonString = objectMapper.writeValueAsString(request.getCompositionJson());
            String compositionUid = ehrbaseRestClient.submitComposition(request.getEhrId(), request.getTemplateId(), jsonString);

            return ResponseEntity.ok("✅ Composition saved with UID: " + compositionUid);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("❌ Failed to submit composition: " + e.getMessage());
        }
    }
}
