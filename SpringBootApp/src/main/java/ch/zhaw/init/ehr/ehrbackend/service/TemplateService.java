package ch.zhaw.init.ehr.ehrbackend.service;

import ch.zhaw.init.ehr.ehrbackend.model.Template;
import ch.zhaw.init.ehr.ehrbackend.repository.TemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
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
        String startTag = "<template_id>";
        String valueStart = "<value>";
        String valueEnd = "</value>";
        int start = xml.indexOf(startTag);
        if (start == -1) return null;
        int valueStartIndex = xml.indexOf(valueStart, start);
        int valueEndIndex = xml.indexOf(valueEnd, valueStartIndex);
        return xml.substring(valueStartIndex + valueStart.length(), valueEndIndex).trim();
    }
    
    private String extractTemplateName(String xml) {
        String startTag = "<name>";
        String valueStart = "<value>";
        String valueEnd = "</value>";
        int start = xml.indexOf(startTag);
        if (start == -1) return null;
        int valueStartIndex = xml.indexOf(valueStart, start);
        int valueEndIndex = xml.indexOf(valueEnd, valueStartIndex);
        return xml.substring(valueStartIndex + valueStart.length(), valueEndIndex).trim();
    }
}
