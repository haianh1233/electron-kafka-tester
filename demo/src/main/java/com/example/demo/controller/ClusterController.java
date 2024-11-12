package com.example.demo.controller;

import com.example.demo.model.Cluster;
import com.example.demo.repository.ClusterRepository;
import com.example.demo.service.ClusterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/clusters")
public class ClusterController {

    private final ClusterRepository clusterRepository;
    private final ClusterService clusterService;

    public ClusterController(ClusterRepository clusterRepository, ClusterService clusterService) {
        this.clusterRepository = clusterRepository;
        this.clusterService = clusterService;
    }


    @PostMapping
    public ResponseEntity<Cluster> createCluster(@RequestBody Cluster cluster) {
        cluster.setHealthy(clusterService.checkKafkaHealth(cluster.getUrl()));
        Cluster savedCluster = clusterRepository.save(cluster);
        return new ResponseEntity<>(savedCluster, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getClusterById(@PathVariable Long id) {
        Optional<Cluster> cluster = clusterRepository.findById(id);

        if (cluster.isPresent()) {
            return ResponseEntity.ok(cluster.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Cluster>> getAllClusters() {
        List<Cluster> clusters = clusterRepository.findAll();
        return ResponseEntity.ok(clusters);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCluster(@PathVariable Long id, @RequestBody Cluster clusterDetails) {
        Optional<Cluster> clusterOptional = clusterRepository.findById(id);
        if (clusterOptional.isPresent()) {
            Cluster existingCluster = clusterOptional.get();
            existingCluster.setName(clusterDetails.getName());
            existingCluster.setUrl(clusterDetails.getUrl());
            existingCluster.setHealthy(clusterDetails.isHealthy());
            Cluster updatedCluster = clusterRepository.save(existingCluster);
            return ResponseEntity.ok(updatedCluster);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Cluster not found");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCluster(@PathVariable Long id) {
        if (clusterRepository.existsById(id)) {
            clusterRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
