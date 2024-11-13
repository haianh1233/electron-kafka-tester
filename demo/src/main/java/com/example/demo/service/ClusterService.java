package com.example.demo.service;

import com.example.demo.model.Cluster;
import com.example.demo.repository.ClusterRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Properties;
import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;

@Service
public class ClusterService {

    private final ClusterRepository clusterRepository;

    public ClusterService(ClusterRepository clusterRepository) {
        this.clusterRepository = clusterRepository;
    }

    @Scheduled(fixedRate = 30_000)
    public void checkClustersHealth() {
        List<Cluster> clusters = clusterRepository.findAll();
        for (Cluster cluster : clusters) {
            updateClusterHealth(cluster);
        }
    }

    public boolean checkHealth(Cluster cluster) {
        return updateClusterHealth(cluster);
    }

    private boolean updateClusterHealth(Cluster cluster) {
        boolean isHealthy = checkKafkaHealth(cluster.getUrl());
        cluster.setHealthy(isHealthy);
        cluster.setUpdatedDate(LocalDateTime.now());
        clusterRepository.save(cluster);

        return isHealthy;
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

    public Cluster saveCluster(Cluster cluster) {
        cluster.setHealthy(checkKafkaHealth(cluster.getUrl()));
        return clusterRepository.save(cluster);
    }

    public List<Cluster> getAllClusters() {
        return clusterRepository.findAll();
    }

    public Optional<Cluster> getClusterById(Long id) {
        return clusterRepository.findById(id);
    }

    public Cluster updateCluster(Long id, Cluster clusterDetails) {
        Cluster existingCluster = clusterRepository.findById(id).orElse(null);
        if (existingCluster != null) {
            existingCluster.setName(clusterDetails.getName());
            existingCluster.setUrl(clusterDetails.getUrl());
            existingCluster.setHealthy(clusterDetails.isHealthy());
            return clusterRepository.save(existingCluster);
        }
        return null;
    }

    public void deleteCluster(Long id) {
        clusterRepository.deleteById(id);
    }
}
