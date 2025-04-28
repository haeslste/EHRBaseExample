package ch.zhaw.init.ehr.ehrbackend.service;

import java.io.IOException;
import java.net.URI;
import java.util.Optional;
import java.util.UUID;

import org.ehrbase.openehr.sdk.client.openehrclient.ContributionEndpoint;
import org.ehrbase.openehr.sdk.client.openehrclient.OpenEhrClient;
import org.ehrbase.openehr.sdk.client.openehrclient.OpenEhrClientConfig;
import org.ehrbase.openehr.sdk.client.openehrclient.defaultrestclient.DefaultRestClient;
import org.ehrbase.openehr.sdk.response.dto.ContributionCreateDto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.nedap.archie.rm.changecontrol.Contribution;

public class EHRBaseContributionService {

    private final URI baseUri = URI.create("http://ehrbase-server:8080/ehrbase/");

    /**
     * Creates an OpenEhrClient instance.
     *
     * @return OpenEhrClient
     */
    private OpenEhrClient createOpenEhrClient() {
        OpenEhrClientConfig config = new OpenEhrClientConfig(baseUri);
        return new DefaultRestClient(config);
    }

    /**
     * Creates a ContributionEndpoint for the specified EHR ID.
     *
     * @param ehrId The EHR ID.
     * @return ContributionEndpoint
     */
    private ContributionEndpoint createContributionEndpoint(UUID ehrId) {
        OpenEhrClient openEhrClient = createOpenEhrClient();
        return openEhrClient.contributionEndpoint(ehrId);
    }

    /**
     * Saves a new contribution to the specified EHR.
     *
     * @param contributionDto The contribution data to be saved.
     * @param ehrId           The EHR ID.
     * @return UUID of the saved contribution.
     */
    public UUID saveContribution(ContributionCreateDto contributionDto, UUID ehrId) {
        try {
            ContributionEndpoint contributionEndpoint = createContributionEndpoint(ehrId);
            return contributionEndpoint.saveContribution(contributionDto);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to save contribution: " + e.getMessage(), e);
        }
    }

    /**
     * Retrieves an existing contribution by its UUID from the specified EHR.
     *
     * @param contributionId The UUID of the contribution to retrieve.
     * @param ehrId          The EHR ID.
     * @return Optional containing the Contribution if found.
     */
    public Optional<Contribution> findContribution(UUID contributionId, UUID ehrId) {
        try {
            ContributionEndpoint contributionEndpoint = createContributionEndpoint(ehrId);
            return contributionEndpoint.find(contributionId);
        } catch (IOException e) {
            throw new RuntimeException("Failed to retrieve contribution: " + e.getMessage(), e);
        }
    }
}



/*
Example usage:
UUID ehrId = UUID.fromString("your-ehr-id");
EHRBaseContributionService contributionService = new EHRBaseContributionService();

// Create a new ContributionCreateDto and populate it with necessary data
ContributionCreateDto contributionDto = new ContributionCreateDto();
// Set necessary fields on contributionDto

// Save the contribution
UUID contributionId = contributionService.saveContribution(contributionDto, ehrId);

// Retrieve the saved contribution
Optional<Contribution> retrievedContribution = contributionService.findContribution(contributionId, ehrId);

 * 
 */