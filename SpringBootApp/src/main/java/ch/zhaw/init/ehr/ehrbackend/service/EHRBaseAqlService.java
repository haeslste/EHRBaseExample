package ch.zhaw.init.ehr.ehrbackend.service;

import java.net.URI;
import java.util.List;

import org.ehrbase.openehr.sdk.client.openehrclient.AqlEndpoint;
import org.ehrbase.openehr.sdk.client.openehrclient.OpenEhrClient;
import org.ehrbase.openehr.sdk.client.openehrclient.OpenEhrClientConfig;
import org.ehrbase.openehr.sdk.client.openehrclient.defaultrestclient.DefaultRestClient;
import org.ehrbase.openehr.sdk.generator.commons.aql.parameter.ParameterValue;
import org.ehrbase.openehr.sdk.generator.commons.aql.parameter.StoredQueryParameter;
import org.ehrbase.openehr.sdk.generator.commons.aql.query.Query;
import org.ehrbase.openehr.sdk.generator.commons.aql.record.Record;
import org.ehrbase.openehr.sdk.response.dto.QueryResponseData;
import org.ehrbase.openehr.sdk.response.dto.StoredQueryResponseData;

public class EHRBaseAqlService {

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
     * Creates an AqlEndpoint.
     *
     * @return AqlEndpoint
     */
    private AqlEndpoint createAqlEndpoint() {
        OpenEhrClient openEhrClient = createOpenEhrClient();
        return openEhrClient.aqlEndpoint();
    }

    /**
     * Executes an ad-hoc AQL query and returns the result as a list of records.
     *
     * @param query           The AQL query to execute.
     * @param parameterValues Optional parameters for the query.
     * @param <T>             The type of the record.
     * @return List of records resulting from the query.
     */
    public <T extends Record> List<T> execute(Query<T> query, ParameterValue... parameterValues) {
        try {
            AqlEndpoint aqlEndpoint = createAqlEndpoint();
            return aqlEndpoint.execute(query, parameterValues);
        } catch (Exception e) {
            throw new RuntimeException("Failed to execute AQL query: " + e.getMessage(), e);
        }
    }

    /**
     * Executes an ad-hoc AQL query and returns the raw response data.
     *
     * @param query           The AQL query to execute.
     * @param parameterValues Optional parameters for the query.
     * @return QueryResponseData containing the raw response.
     */
    public QueryResponseData executeRaw(Query<?> query, ParameterValue... parameterValues) {
        try {
            AqlEndpoint aqlEndpoint = createAqlEndpoint();
            return aqlEndpoint.executeRaw(query, parameterValues);
        } catch (Exception e) {
            throw new RuntimeException("Failed to execute raw AQL query: " + e.getMessage(), e);
        }
    }

    /**
     * Executes a stored AQL query identified by the given parameters.
     *
     * @param queryParameter The parameters identifying the stored query.
     * @return QueryResponseData containing the response.
     */
    public QueryResponseData executeStoredQuery(StoredQueryParameter queryParameter) {
        try {
            AqlEndpoint aqlEndpoint = createAqlEndpoint();
            return aqlEndpoint.executeStoredQuery(queryParameter);
        } catch (Exception e) {
            throw new RuntimeException("Failed to execute stored AQL query: " + e.getMessage(), e);
        }
    }

    /**
     * Retrieves the definition of a stored AQL query.
     *
     * @param queryParameter The parameters identifying the stored query.
     * @return StoredQueryResponseData containing the query definition.
     */
    public StoredQueryResponseData getStoredAqlQuery(StoredQueryParameter queryParameter) {
        try {
            AqlEndpoint aqlEndpoint = createAqlEndpoint();
            return aqlEndpoint.getStoredAqlQuery(queryParameter);
        } catch (Exception e) {
            throw new RuntimeException("Failed to retrieve stored AQL query: " + e.getMessage(), e);
        }
    }

    /**
     * Stores a new AQL query on the server.
     *
     * @param query          The AQL query to store.
     * @param queryParameter The parameters identifying the stored query.
     */
    public void storeAqlQuery(Query<?> query, StoredQueryParameter queryParameter) {
        try {
            AqlEndpoint aqlEndpoint = createAqlEndpoint();
            aqlEndpoint.storeAqlQuery(query, queryParameter);
        } catch (Exception e) {
            throw new RuntimeException("Failed to store AQL query: " + e.getMessage(), e);
        }
    }
}
/*
Example usage:
EHRBaseAqlService aqlService = new EHRBaseAqlService();

// Define a native AQL query
String aql = "SELECT e/ehr_id/value FROM EHR e";

// Build the query
Query<Record1<UUID>> query = Query.buildNativeQuery(aql, UUID.class);

// Execute the query
List<Record1<UUID>> results = aqlService.execute(query);

// Process the results
for (Record1<UUID> record : results) {
    UUID ehrId = record.value1();
}
 */