package ch.zhaw.init.ehr.ehrbackend.model;



import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class FormTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String templateId; // e.g., "blood_pressure.v1"

    private String name;       // Human-readable title (optional)

    @Lob
    private String formConfigJson; // JSON layout for the builder

    // Optional: description, version, createdAt, etc.
}