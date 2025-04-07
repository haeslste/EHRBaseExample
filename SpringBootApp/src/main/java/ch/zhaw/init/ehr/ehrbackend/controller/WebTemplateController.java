import ch.zhaw.init.ehr.ehrbackend.service.EhrbaseRestClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/template")
@RequiredArgsConstructor
public class WebTemplateController {

    private final EhrbaseRestClient ehrbaseRestClient;

    @GetMapping("/{templateId}/webtemplate")
    public ResponseEntity<?> getWebTemplate(@PathVariable String templateId) {
        try {
            String webTemplateJson = ehrbaseRestClient.getWebTemplateJson(templateId);
            return ResponseEntity.ok(webTemplateJson);
        } catch (RuntimeException e) {
            return ResponseEntity.status(500).body("Error fetching WebTemplate: " + e.getMessage());
        }
    }
}