package com.improsvita.seedlings_service.repository;

import com.improsvita.seedlings_service.model.Seedling;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SeedlingRepository extends JpaRepository<Seedling, Long> {
    List<Seedling> findBySowingId(Long sowingId);
    List<Seedling> findByStatus(Seedling.SeedlingStatus status);
}