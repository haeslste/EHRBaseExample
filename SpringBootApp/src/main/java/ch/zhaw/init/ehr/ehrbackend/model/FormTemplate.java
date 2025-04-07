package ch.zhaw.init.ehr.ehrbackend.model;



import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class FormTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String templateId; 

    private String name;      

    @Lob
    private String formConfigJson; 
    
}