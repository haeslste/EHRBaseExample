package ch.zhaw.init.ehr.ehrbackend.service;

import ch.zhaw.init.ehr.ehrbackend.config.EhrbaseProperties;

public class EHRBaseService {
    private final EhrbaseProperties ehrbaseProperties = new EhrbaseProperties();

    protected String getBaseUrl() {
        String url = ehrbaseProperties.getUrl();
        if (url == null || url.isBlank()) {
            throw new IllegalStateException("EHRbase URL is not configured. Please set 'ehrbase.url' in application.properties.");
        }
        return url;
    }
    
}
