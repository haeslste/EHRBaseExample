package ch.zhaw.init.ehr.ehrbackend.controller;

import ch.zhaw.init.ehr.ehrbackend.dto.DoctorDto;
import ch.zhaw.init.ehr.ehrbackend.dto.DoctorPatientLinkRequest;
import ch.zhaw.init.ehr.ehrbackend.dto.UserDto;
import ch.zhaw.init.ehr.ehrbackend.dto.PatientDto;
import ch.zhaw.init.ehr.ehrbackend.model.Doctor;
import ch.zhaw.init.ehr.ehrbackend.service.DoctorService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctor")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping("/all")
    public List<DoctorDto> getAllDoctors() {
        return doctorService.getAllDoctors().stream()
            .map(this::toDto)
            .toList();
    }

    @GetMapping("/{id}")
    public DoctorDto getDoctorById(@PathVariable Long id) {
        return toDto(doctorService.getDoctor(id));
    }

    @PostMapping("/assign")
    public ResponseEntity<?> assignPatient(@RequestBody DoctorPatientLinkRequest request) {
        doctorService.assignPatientToDoctor(request.getDoctorId(), request.getPatientId());
        return ResponseEntity.ok("✅ Patient assigned to doctor");
    }

    private DoctorDto toDto(Doctor doctor) {
        List<PatientDto> patientDtos = doctor.getPatients().stream().map(patient -> new PatientDto(
        patient.getId(),
        patient.getFirstName(),
        patient.getLastName(),
        patient.getDateOfBirth(),
        new UserDto(patient.getUser().getId(), patient.getUser().getUsername(), patient.getUser().getRole()),
        null // Avoid circular reference
        )).toList();

        return new DoctorDto(
            doctor.getId(),
            doctor.getFirstName(),
            doctor.getLastName(),
            doctor.getSpeciality(),
            new UserDto(
                doctor.getUser().getId(),
                doctor.getUser().getUsername(),
                doctor.getUser().getRole()
            ),
            patientDtos
        );
    }

    @PostMapping
    public Doctor createDoctor(@RequestBody Doctor doctor) {
        return doctorService.saveDoctor(doctor);
    }
    
    @PutMapping("/{id}")
    public Doctor updateDoctor(@PathVariable Long id, @RequestBody Doctor doctor) {
        doctor.setId(id);
        return doctorService.saveDoctor(doctor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.noContent().build();
    }
}
