package ch.zhaw.init.ehr.ehrbackend.dto;

import lombok.Data;
import java.util.Map;

@Data
public class CompositionSubmissionRequest {
    private String ehrId;           // EHRbase patient ID
    private String templateId;      // e.g., "body_weight"
    private Map<String, Object> compositionJson; // JSON  (matching WebTemplate)
}