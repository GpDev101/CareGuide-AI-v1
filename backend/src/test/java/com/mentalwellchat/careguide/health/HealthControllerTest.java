package com.mentalwellchat.careguide.health;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class HealthControllerTest {

    @Test
    void healthResponseReportsServiceAsUp() {
        HealthController controller = new HealthController();

        HealthController.HealthResponse response = controller.health();

        assertThat(response.status()).isEqualTo("UP");
        assertThat(response.service()).isEqualTo("careguide-api");
        assertThat(response.version()).isNotBlank();
        assertThat(response.timestamp()).isNotNull();
    }
}
