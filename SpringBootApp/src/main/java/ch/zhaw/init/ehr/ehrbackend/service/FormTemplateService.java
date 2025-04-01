package ch.zhaw.init.ehr.ehrbackend.service;

import ch.zhaw.init.ehr.ehrbackend.model.FormTemplate;
import ch.zhaw.init.ehr.ehrbackend.repository.FormTemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FormTemplateService {

    private final FormTemplateRepository formTemplateRepository;

    public List<FormTemplate> getAll() {
        return formTemplateRepository.findAll();
    }

    public Optional<FormTemplate> getByTemplateId(String templateId) {
        return formTemplateRepository.findByTemplateId(templateId);
    }

    public FormTemplate save(FormTemplate template) {
        return formTemplateRepository.save(template);
    }

    public void delete(Long id) {
        formTemplateRepository.deleteById(id);
    }
}
