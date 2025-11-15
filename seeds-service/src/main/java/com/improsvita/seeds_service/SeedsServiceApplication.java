package com.improsvita.seeds_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class SeedsServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(SeedsServiceApplication.class, args);
    }
}