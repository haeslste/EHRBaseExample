package ch.zhaw.init.ehr.ehrbackend.controller;

import ch.zhaw.init.ehr.ehrbackend.model.Template;
import ch.zhaw.init.ehr.ehrbackend.service.TemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/admin/templates")
@RequiredArgsConstructor
public class TemplateController {

    private final TemplateService templateService;

    @PostMapping("/upload")
    public ResponseEntity<Template> uploadTemplate(
        @RequestParam("file") MultipartFile file,
        @RequestParam(value = "templateName", required = false) String templateName,
        @RequestParam(value = "description", required = false) String description
    ) {
        try {
            Template saved = templateService.uploadTemplate(file, templateName, description);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null); // e.g. Template already exists
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping
    public List<Template> getAllTemplates() {
        return templateService.getAllTemplates();
    }

    @GetMapping("/webtemplate/{templateId}")
    public ResponseEntity<String> getWebTemplateJson(@PathVariable String templateId) {
        try {
            String webTemplateJson = templateService.getWebTemplateJson(templateId);
            return ResponseEntity.ok(webTemplateJson);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Could not fetch WebTemplate: " + e.getMessage());
        }
    }

}
