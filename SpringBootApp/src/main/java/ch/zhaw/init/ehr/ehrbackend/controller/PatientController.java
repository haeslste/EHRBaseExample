package ch.zhaw.init.ehr.ehrbackend.controller;

import ch.zhaw.init.ehr.ehrbackend.dto.DoctorDto;
import ch.zhaw.init.ehr.ehrbackend.dto.PatientDto;
import ch.zhaw.init.ehr.ehrbackend.dto.UserDto;
import ch.zhaw.init.ehr.ehrbackend.model.Patient;
import ch.zhaw.init.ehr.ehrbackend.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patient")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @PostMapping
    public Patient createPatient(@RequestBody Patient patient) {
        return patientService.savePatient(patient);
    }

    @GetMapping("/all")
    public List<PatientDto> getAllPatients() {
        return patientService.getAllPatients().stream()
            .map(this::toDto)
            .toList();
    }

    @GetMapping("/{id}")
    public PatientDto getPatient(@PathVariable Long id) {
        return toDto(patientService.getPatient(id));
    }

    private PatientDto toDto(Patient patient) {
        List<DoctorDto> doctorDtos = patient.getDoctors().stream().map(doctor -> new DoctorDto(
            doctor.getId(),
            doctor.getFirstName(),
            doctor.getLastName(),
            doctor.getSpeciality(),
            new UserDto(doctor.getUser().getId(), doctor.getUser().getUsername(), doctor.getUser().getRole()),
            null // don't embed patients inside doctors to avoid infinite loop
        )).toList();

        return new PatientDto(
            patient.getId(),
            patient.getFirstName(),
            patient.getLastName(),
            patient.getDateOfBirth(),
            patient.getEhrId(),
            new UserDto(patient.getUser().getId(), patient.getUser().getUsername(), patient.getUser().getRole()),
            doctorDtos
        );
    }
}
