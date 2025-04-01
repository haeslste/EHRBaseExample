package ch.zhaw.init.ehr.ehrbackend.service;

import ch.zhaw.init.ehr.ehrbackend.model.Template;
import ch.zhaw.init.ehr.ehrbackend.repository.TemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TemplateService {

    private final TemplateRepository templateRepository;

    private final EhrbaseRestClient ehrbaseRestClient;

    public Template uploadTemplate(MultipartFile file, String name, String description) throws IOException {
        String rawXml = new String(file.getBytes());
        String templateId = extractTemplateId(rawXml); //TODO: Remove placeholder
        String extractedName = extractTemplateName(rawXml);     
        
        if (templateRepository.existsByTemplateId(templateId)) {
            throw new IllegalArgumentException("Template already exists: " + templateId);
        }

        ehrbaseRestClient.uploadTemplateToEhrbase(rawXml);

        Template template = Template.builder()
            .templateId(templateId)
            .name(name != null ? name : extractedName)
            .description(description)
            .rawXml(rawXml)
            .build();

        return templateRepository.save(template);
    }

    public List<Template> getAllTemplates() {
        return templateRepository.findAll();
    }

    public String getWebTemplateJson(String templateId) {
        return ehrbaseRestClient.getWebTemplateJson(templateId);
    }

    private String extractTemplateId(String xml) {
        // simple hacky extract from XML - better use XML parser
        int start = xml.indexOf("<template_id>");
        int end = xml.indexOf("</template_id>");
        return xml.substring(start + 13, end).trim();
    }

    private String extractTemplateName(String xml) {
        int start = xml.indexOf("<name>");
        int end = xml.indexOf("</name>");
        return start != -1 && end != -1 ? xml.substring(start + 6, end).trim() : null;
    }
}
