package ch.zhaw.init.ehr.ehrbackend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import ch.zhaw.init.ehr.ehrbackend.service.EhrbaseRestClient;


@SpringBootTest
@ActiveProfiles("test")
class EhrbackendApplicationTests {
    @MockBean
    private EhrbaseRestClient ehrbaseRestClient;

    @Test
    void contextLoads() {
    }
}