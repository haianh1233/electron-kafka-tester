package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class ApplicationHeathCheckController {

    @RequestMapping("/health")
    public ResponseEntity<String> checkHealth() {
        return ResponseEntity.ok("Application is up and running");
    }
}
