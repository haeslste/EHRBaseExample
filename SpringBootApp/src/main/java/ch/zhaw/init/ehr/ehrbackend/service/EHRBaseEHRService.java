package ch.zhaw.init.ehr.ehrbackend.service;

import java.net.URI;
import java.util.Optional;
import java.util.UUID;

import org.ehrbase.openehr.sdk.client.openehrclient.EhrEndpoint;
import org.ehrbase.openehr.sdk.client.openehrclient.OpenEhrClient;
import org.ehrbase.openehr.sdk.client.openehrclient.OpenEhrClientConfig;
import org.ehrbase.openehr.sdk.client.openehrclient.defaultrestclient.DefaultRestClient;
import org.ehrbase.openehr.sdk.util.exception.ClientException;
import org.ehrbase.openehr.sdk.util.exception.WrongStatusCodeException;

import com.nedap.archie.rm.ehr.Ehr;
import com.nedap.archie.rm.ehr.EhrStatus;


public class EHRBaseEHRService extends EHRBaseService  {

    private EhrEndpoint createEhrEndpoint() {
        URI baseUri = URI.create("http://ehrbase-server:8080/ehrbase/");
        OpenEhrClientConfig config = new OpenEhrClientConfig(baseUri);
        OpenEhrClient openEhrClient = new DefaultRestClient(config);
        return openEhrClient.ehrEndpoint();
    }
    /**
     * Create a new EHR.
     *
     * @return ehrID
     * @throws ClientException
     * @throws WrongStatusCodeException
     */
    public UUID createEHR() {
        try{
            EhrEndpoint ehrEndpoint = createEhrEndpoint();
            UUID ehrId = ehrEndpoint.createEhr();
            return ehrId;
        }catch (Exception e) {
            throw new RuntimeException("Failed to create EHR: " + e.getMessage());
        }
    }
        /**
     * Create a new EHR with the given EHR_STATUS.
     *
     * @param ehrStatus EHR_STATUS object to create the EHR with.
     * @return ehrID
     * @throws ClientException
     * @throws WrongStatusCodeException
     */
    public UUID createEHR(EhrStatus ehrStatus){
        try{
            EhrEndpoint ehrEndpoint = createEhrEndpoint();
            UUID ehrId = ehrEndpoint.createEhr(ehrStatus);
            return ehrId;
        }catch (Exception e) {
            throw new RuntimeException("Failed to create EHR: " + e.getMessage());
        }
    }

    /**
     * Get the EhrStatus for {@code ehrId}.
     *
     * @param ehrId Id of the ehr from which to return the status.
     * @return {@link EhrStatus}
     * @throws ClientException
     * @throws WrongStatusCodeException
     */
    public Optional<EhrStatus> getEhrStatus(UUID ehrID) {
        try {
            EhrEndpoint ehrEndpoint = createEhrEndpoint();
            return ehrEndpoint.getEhrStatus(ehrID);
        } catch (Exception e) {
            throw new RuntimeException("Failed to get EHR status: " + e.getMessage());
        }
    }
    /**
     * Updates the status of the ehr with  {@code ehrId} to {@code ehrStatus}
     *
     * @param ehrId     EhrId of the ehr which will be updated
     * @param ehrStatus new ehrStatus
     * @throws ClientException
     * @throws WrongStatusCodeException
     */
    public void updateEhrStatus(UUID ehrID, EhrStatus ehrStatus) {
        try {
            EhrEndpoint ehrEndpoint = createEhrEndpoint();
            ehrEndpoint.updateEhrStatus(ehrID, ehrStatus);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update EHR status: " + e.getMessage());
        }
    }
}
