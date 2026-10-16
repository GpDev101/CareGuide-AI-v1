package com.mentalwellchat.careguide.health;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
@RequestMapping("/api/v1/health")
public class HealthController {

    @GetMapping
    public HealthResponse health() {
        return new HealthResponse("UP", "careguide-api", "0.1.0-SNAPSHOT", Instant.now());
    }

    public record HealthResponse(String status, String service, String version, Instant timestamp) {
    }
}
