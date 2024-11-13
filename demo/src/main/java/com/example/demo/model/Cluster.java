package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Cluster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Cluster name is required")
    private String name;
    @NotBlank(message = "Cluster URL is required")
    private String url;
    private boolean healthy = false;
    private LocalDateTime updatedDate = LocalDateTime.now();
    private LocalDateTime createdDate = LocalDateTime.now();

}
