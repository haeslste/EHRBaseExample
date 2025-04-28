package ch.zhaw.init.ehr.ehrbackend.dto;

import com.nedap.archie.rm.composition.Composition;
import lombok.Data;

import java.util.UUID;

@Data
public class CompositionSubmissionRequest {
    private UUID ehrId;
    private Composition composition;
}
