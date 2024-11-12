package com.example.demo;

import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

@RestController
@RequestMapping("/api/v1/clusters")
public class KafkaHealthCheckController {

    @PostMapping("/health")
    public ResponseEntity<String> checkKafkaHealth(@RequestBody Map<String, Object> request) {
        Object brokersObj = request.get("brokers");
        if (!(brokersObj instanceof java.util.List) || ((java.util.List<?>) brokersObj).isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid brokers array");
        }

        String brokers = String.join(",", (java.util.List<String>) brokersObj);

        Properties config = new Properties();
        config.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, brokers);
        config.put(AdminClientConfig.REQUEST_TIMEOUT_MS_CONFIG, "10000");

        try (AdminClient adminClient = AdminClient.create(config)) {
            adminClient.listTopics().names().get(10, TimeUnit.SECONDS);
            return ResponseEntity.ok("Kafka is healthy");
        } catch (InterruptedException | ExecutionException | TimeoutException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Kafka is not healthy");
        }
    }
}
