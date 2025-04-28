package ch.zhaw.init.ehr.ehrbackend.service;

import java.net.URI;
import java.util.Optional;
import java.util.UUID;

import org.ehrbase.openehr.sdk.client.openehrclient.DirectoryCrudEndpoint;
import org.ehrbase.openehr.sdk.client.openehrclient.OpenEhrClient;
import org.ehrbase.openehr.sdk.client.openehrclient.OpenEhrClientConfig;
import org.ehrbase.openehr.sdk.client.openehrclient.defaultrestclient.DefaultRestClient;

import com.nedap.archie.rm.directory.Folder;
import com.nedap.archie.rm.support.identification.ObjectVersionId;

public class EHRBaseDirectoryService {

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
     * Creates a DirectoryCrudEndpoint for the given EHR ID.
     *
     * @param ehrId The EHR ID.
     * @return DirectoryCrudEndpoint
     */
    private DirectoryCrudEndpoint createDirectoryEndpoint(UUID ehrId) {
        OpenEhrClient openEhrClient = createOpenEhrClient();
        return openEhrClient.directoryCrudEndpoint(ehrId);
    }

    /**
     * Creates a new directory (folder structure) in the EHR.
     *
     * @param folder The root folder to be created.
     * @param ehrId  The EHR ID.
     * @return ObjectVersionId of the created directory.
     */
    public ObjectVersionId createDirectory(Folder folder, UUID ehrId) {
        try {
            DirectoryCrudEndpoint directoryEndpoint = createDirectoryEndpoint(ehrId);
            return directoryEndpoint.createDirectory(folder);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create directory: " + e.getMessage(), e);
        }
    }

    /**
     * Updates the existing directory (folder structure) in the EHR.
     *
     * @param folder The updated root folder.
     * @param ehrId  The EHR ID.
     * @return ObjectVersionId of the updated directory.
     */
    public ObjectVersionId updateDirectory(Folder folder, UUID ehrId) {
        try {
            DirectoryCrudEndpoint directoryEndpoint = createDirectoryEndpoint(ehrId);
            return directoryEndpoint.updateDirectory(folder);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update directory: " + e.getMessage(), e);
        }
    }

    /**
     * Retrieves the current directory (folder structure) from the EHR.
     *
     * @param ehrId The EHR ID.
     * @return Optional containing the root folder if present.
     */
    public Optional<Folder> getDirectory(UUID ehrId) {
        try {
            DirectoryCrudEndpoint directoryEndpoint = createDirectoryEndpoint(ehrId);
            return directoryEndpoint.getDirectory();
        } catch (Exception e) {
            throw new RuntimeException("Failed to retrieve directory: " + e.getMessage(), e);
        }
    }

    /**
     * Finds a subfolder within the directory structure by its path.
     *
     * @param ehrId The EHR ID.
     * @param path  The path to the subfolder (e.g., "history/family").
     * @return Optional containing the found subfolder if present.
     */
    public Optional<Folder> findFolder(UUID ehrId, String path) {
        try {
            Optional<Folder> rootFolder = getDirectory(ehrId);
            return rootFolder.flatMap(root -> DirectoryCrudEndpoint.find(root, path));
        } catch (Exception e) {
            throw new RuntimeException("Failed to find folder: " + e.getMessage(), e);
        }
    }
}


/*
 * Usage example: 
 * UUID ehrId = UUID.fromString("your-ehr-id");
EHRBaseDirectoryService directoryService = new EHRBaseDirectoryService();

// Create a new folder structure
Folder rootFolder = new Folder();
rootFolder.setName(new DvText("root"));
// Add subfolders and items as needed

ObjectVersionId versionId = directoryService.createDirectory(rootFolder, ehrId);

// Retrieve the directory
Optional<Folder> retrievedFolder = directoryService.getDirectory(ehrId);

// Find a specific subfolder
Optional<Folder> subFolder = directoryService.findFolder(ehrId, "history/family");

 */