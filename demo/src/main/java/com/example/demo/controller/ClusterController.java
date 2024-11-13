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
        Cluster savedCluster = clusterService.saveCluster(cluster);
        return new ResponseEntity<>(savedCluster, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getClusterById(@PathVariable Long id) {
        Optional<Cluster> cluster = clusterRepository.findById(id);

        if (cluster.isPresent()) {
            return ResponseEntity.ok(cluster.get());
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/health")
    public ResponseEntity<String> checkClusterHealth(@PathVariable Long id) {
        return clusterService.getClusterById(id)
                .map(cluster -> clusterService.checkHealth(cluster)
                        ? ResponseEntity.ok("Cluster is healthy")
                        : ResponseEntity.status(HttpStatus.FAILED_DEPENDENCY).body("Cluster is not healthy"))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }



    @GetMapping
    public ResponseEntity<List<Cluster>> getAllClusters() {
        List<Cluster> clusters = clusterService.getAllClusters();
        return ResponseEntity.ok(clusters);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCluster(@PathVariable Long id, @RequestBody Cluster clusterDetails) {
        Optional<Cluster> cluster = clusterService.getClusterById(id);

        if (cluster.isPresent()) {
            Cluster updatedCluster = clusterService.updateCluster(id, clusterDetails);
            return ResponseEntity.ok(updatedCluster);
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCluster(@PathVariable Long id) {
        clusterService.deleteCluster(id);
        return ResponseEntity.noContent().build();
    }
}
