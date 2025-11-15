package com.improsvita.seedlings_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class SeedlingsServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(SeedlingsServiceApplication.class, args);
    }
}