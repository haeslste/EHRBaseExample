// controller/FormTemplateController.java
package ch.zhaw.init.ehr.ehrbackend.controller;

import ch.zhaw.init.ehr.ehrbackend.model.FormTemplate;
import ch.zhaw.init.ehr.ehrbackend.service.FormTemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/templates")
@RequiredArgsConstructor
public class FormTemplateController {

    private final FormTemplateService formTemplateService;

    @GetMapping
    public List<FormTemplate> listTemplates() {
        return formTemplateService.getAll();
    }

    @GetMapping("/{templateId}")
    public ResponseEntity<FormTemplate> getTemplate(@PathVariable String templateId) {
        return formTemplateService.getByTemplateId(templateId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<FormTemplate> createOrUpdateTemplate(@RequestBody FormTemplate template) {
        return ResponseEntity.ok(formTemplateService.save(template));
    }
}
