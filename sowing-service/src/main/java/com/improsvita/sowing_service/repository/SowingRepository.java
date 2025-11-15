package com.improsvita.sowing_service.repository;

import com.improsvita.sowing_service.model.Sowing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SowingRepository extends JpaRepository<Sowing, Long> {
    List<Sowing> findByStatus(String status);
}
