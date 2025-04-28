package ch.zhaw.init.ehr.ehrbackend.service;

import java.net.URI;
import java.util.Optional;
import java.util.UUID;

import org.ehrbase.openehr.sdk.client.openehrclient.CompositionEndpoint;
import org.ehrbase.openehr.sdk.client.openehrclient.EhrEndpoint;
import org.ehrbase.openehr.sdk.client.openehrclient.OpenEhrClient;
import org.ehrbase.openehr.sdk.client.openehrclient.OpenEhrClientConfig;
import org.ehrbase.openehr.sdk.client.openehrclient.defaultrestclient.DefaultRestClient;
import org.ehrbase.openehr.sdk.util.exception.ClientException;
import org.ehrbase.openehr.sdk.util.exception.WrongStatusCodeException;

import com.nedap.archie.rm.composition.Composition;
import com.nedap.archie.rm.support.identification.ObjectVersionId;


public class EHRBaseCompositionService extends EHRBaseService {
    private CompositionEndpoint createCompositionEndpoint(UUID ehrId) {
        URI baseUri = URI.create("http://ehrbase-server:8080/ehrbase/");
        OpenEhrClientConfig config = new OpenEhrClientConfig(baseUri);
        OpenEhrClient openEhrClient = new DefaultRestClient(config);
        return openEhrClient.compositionEndpoint(ehrId);
    }

    /**
     * Merges the provided composition entity with the existing data in the EHR system.
     * This method creates a CompositionEndpoint for the given entity's EHR ID and
     * attempts to merge the composition. If the operation fails, a RuntimeException
     * is thrown with an appropriate error message.
     *
     * @param <T>    The type of the composition entity.
     * @param entity The composition entity to be merged. Must contain a valid EHR ID.
     * @return The merged composition entity.
     * @throws RuntimeException If the merge operation fails.
     */
    public <T> T mergeCompositionEntity(T entity, UUID ehrId) {
        try{
            CompositionEndpoint compositionEndpoint = createCompositionEndpoint(ehrId);
            compositionEndpoint.mergeCompositionEntity(entity);
            return entity;
        }catch (Exception e) {
            throw new RuntimeException("Failed to merge composition: " + e.getMessage());
        }
    }
    
    public ObjectVersionId mergeRaw(Composition composition, UUID ehrId) {
        try {
            CompositionEndpoint compositionEndpoint = createCompositionEndpoint(ehrId);
            ObjectVersionId objectVersionId = compositionEndpoint.mergeRaw(composition);
            return objectVersionId;
        } catch (Exception e) {
            throw new RuntimeException("Failed to merge raw composition: " + e.getMessage());
        }
    }

    public <T> Optional<T> find(UUID compositionId, Class<T> clazz, UUID ehrId) {
        try {
            CompositionEndpoint compositionEndpoint = createCompositionEndpoint(ehrId);
            return compositionEndpoint.find(compositionId, clazz);
        } catch (Exception e) {
            throw new RuntimeException("Failed to find composition: " + e.getMessage(), e);
        }
    }


    public Optional<Composition> findRaw(UUID compositionId, UUID ehrId) {
        try {
            CompositionEndpoint compositionEndpoint = createCompositionEndpoint(ehrId);
            return compositionEndpoint.findRaw(compositionId);
        } catch (Exception e) {
            throw new RuntimeException("Failed to find raw composition: " + e.getMessage(), e);
        }
    }

    public void delete(ObjectVersionId precedingVersionUid, UUID ehrId) {
        try {
            CompositionEndpoint compositionEndpoint = createCompositionEndpoint(ehrId);
            compositionEndpoint.delete(precedingVersionUid);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete composition: " + e.getMessage(), e);
        }
    }
} 