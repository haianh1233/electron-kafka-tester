package com.example.demo.service;

import com.example.demo.model.Cluster;
import com.example.demo.repository.ClusterRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Properties;
import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;

@Service
public class ClusterService {

    private final ClusterRepository clusterRepository;

    public ClusterService(ClusterRepository clusterRepository) {
        this.clusterRepository = clusterRepository;
    }

    @Scheduled(fixedRate = 5000)
    public void checkClustersHealth() {
        List<Cluster> clusters = clusterRepository.findAll();
        for (Cluster cluster : clusters) {
            boolean isHealthy = checkKafkaHealth(cluster.getUrl());
            if (cluster.isHealthy() != isHealthy) {
                cluster.setHealthy(isHealthy);
                clusterRepository.save(cluster);
            }
        }
    }

    public boolean checkKafkaHealth(String brokerUrl) {
        Properties config = new Properties();
        config.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, brokerUrl);
        config.put(AdminClientConfig.REQUEST_TIMEOUT_MS_CONFIG, "2000"); // Max time for a single request
        config.put(AdminClientConfig.RETRIES_CONFIG, "0"); // Disable retries
        config.put(AdminClientConfig.RETRY_BACKOFF_MS_CONFIG, "0"); // Set backoff to 0 to prevent retry delay
        config.put(AdminClientConfig.DEFAULT_API_TIMEOUT_MS_CONFIG, "2000"); // Limit total API call time
        config.put(AdminClientConfig.METADATA_MAX_AGE_CONFIG, "3600000");

        try (AdminClient adminClient = AdminClient.create(config)) {
            adminClient.listTopics().names().get();
            return true;
        } catch (Exception e) {
            System.out.println("Error while checking health of cluster: " + brokerUrl + "-" + e.getMessage());
            return false;
        }
    }
}
