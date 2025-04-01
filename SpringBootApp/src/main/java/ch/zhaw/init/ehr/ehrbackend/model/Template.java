package ch.zhaw.init.ehr.ehrbackend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Template {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String templateId;

    private String name;

    private String description;

    @Lob
    private String rawXml; // store the .opt content (optional, can skip this if large)
}