// dto/TemplateUploadResponse.java
package ch.zhaw.init.ehr.ehrbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TemplateUploadResponse {
    private String message;
    private String templateId;
}
