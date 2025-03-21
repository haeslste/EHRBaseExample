package ch.zhaw.init.ehr.ehrbackend.controller;

import ch.zhaw.init.ehr.ehrbackend.model.MedicalRecord;
import ch.zhaw.init.ehr.ehrbackend.service.MedicalRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/record")
@RequiredArgsConstructor
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    @PostMapping
    public MedicalRecord createRecord(@RequestBody MedicalRecord record) {
        return medicalRecordService.saveRecord(record);
    }

    @GetMapping("/{id}")
    public MedicalRecord getRecord(@PathVariable Long id) {
        return medicalRecordService.getRecord(id);
    }

    @GetMapping("/patient/{patientId}")
    public List<MedicalRecord> getRecordsByPatient(@PathVariable Long patientId) {
        return medicalRecordService.getRecordsByPatient(patientId);
    }
}
