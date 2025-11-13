package com.improsvita.seeds_service.repository;
import com.improsvita.seeds_service.model.Seed;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeedRepository extends JpaRepository<Seed, Long> {
    
}