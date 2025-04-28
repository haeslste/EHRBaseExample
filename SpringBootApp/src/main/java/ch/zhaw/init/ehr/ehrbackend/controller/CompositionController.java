package ch.zhaw.init.ehr.ehrbackend.controller;

import ch.zhaw.init.ehr.ehrbackend.dto.CompositionSubmissionRequest;
import ch.zhaw.init.ehr.ehrbackend.service.EHRBaseCompositionService;
import com.nedap.archie.rm.composition.Composition;
import com.nedap.archie.rm.support.identification.ObjectVersionId;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/composition")
@RequiredArgsConstructor
public class CompositionController {

    private final EHRBaseCompositionService compositionService;

    /**
     * Submits a new composition to the EHR system.
     *
     * @param request The composition submission request containing the composition data and EHR ID.
     * @return ResponseEntity with the result of the operation.
     */
    @PostMapping("/")
    public ResponseEntity<?> submitComposition(@RequestBody CompositionSubmissionRequest request) {
        try {
            UUID ehrId = request.getEhrId();
            Composition composition = request.getComposition();

            ObjectVersionId compositionUid = compositionService.mergeRaw(composition, ehrId);
            return ResponseEntity.ok("✅ Composition saved with UID: " + compositionUid.getValue());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("❌ Failed to submit composition: " + e.getMessage());
        }
    }

    /**
     * Retrieves a composition by its ID.
     *
     * @param ehrId         The EHR ID associated with the composition.
     * @param compositionId The ID of the composition to retrieve.
     * @return ResponseEntity containing the composition if found.
     */
    @GetMapping("/{ehrId}/{compositionId}")
    public ResponseEntity<?> getComposition(@PathVariable UUID ehrId, @PathVariable UUID compositionId) {
        try {
            Optional<Composition> composition = compositionService.findRaw(compositionId, ehrId);
            return composition
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("❌ Failed to retrieve composition: " + e.getMessage());
        }
    }

    /**
     * Deletes a composition by its version UID.
     *
     * @param ehrId           The EHR ID associated with the composition.
     * @param versionUidStr   The version UID of the composition to delete.
     * @return ResponseEntity with the result of the deletion operation.
     */
    @DeleteMapping("/{ehrId}/{versionUid}")
    public ResponseEntity<?> deleteComposition(@PathVariable UUID ehrId, @PathVariable("versionUid") String versionUidStr) {
        try {
            ObjectVersionId versionUid = new ObjectVersionId(versionUidStr);
            compositionService.delete(versionUid, ehrId);
            return ResponseEntity.ok("🗑️ Composition deleted: " + versionUid.getValue());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("❌ Failed to delete composition: " + e.getMessage());
        }
    }
}
