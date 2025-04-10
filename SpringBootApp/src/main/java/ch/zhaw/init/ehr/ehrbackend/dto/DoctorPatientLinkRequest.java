package ch.zhaw.init.ehr.ehrbackend.dto;

import lombok.Data;

@Data
public class DoctorPatientLinkRequest {
    private Long doctorId;
    private Long patientId;
}