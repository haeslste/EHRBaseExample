package ch.zhaw.init.ehr.ehrbackend.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PatientDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String dateOfBirth;
    private UserDto user;
    private List<DoctorDto> doctors;
}
