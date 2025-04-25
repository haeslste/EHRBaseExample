package ch.zhaw.init.ehr.ehrbackend.service;

import ch.zhaw.init.ehr.ehrbackend.model.Patient;
import ch.zhaw.init.ehr.ehrbackend.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.ehrbase.openehr.sdk.client.openehrclient.OpenEhrClient;
import org.ehrbase.openehr.sdk.client.openehrclient.OpenEhrClientConfig;
import org.ehrbase.openehr.sdk.client.openehrclient.defaultrestclient.DefaultRestClient;
import org.ehrbase.openehr.sdk.client.openehrclient.EhrEndpoint;

import ch.zhaw.init.ehr.ehrbackend.config.EhrbaseProperties;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;
    public Patient savePatient(Patient patient) {
        Patient saved = patientRepository.save(patient);
        //TODO: extract the string to config
        URI baseUri = URI.create("http://ehrbase-server:8080/ehrbase/");
        OpenEhrClientConfig config = new OpenEhrClientConfig(baseUri);
        OpenEhrClient openEhrClient = new DefaultRestClient(config);
        EhrEndpoint ehrEndpoint = openEhrClient.ehrEndpoint();
        UUID ehrId = ehrEndpoint.createEhr();

        saved.setEhrId(ehrId);
        return patientRepository.save(saved); 
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient getPatient(Long id) {
        return patientRepository.findById(id).orElseThrow();
    }
}
