package com.improsvita.sowing_service.controller;

import com.improsvita.sowing_service.dto.SowingDTO;
import com.improsvita.sowing_service.model.Sowing;
import com.improsvita.sowing_service.service.SowingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sowings")
@RequiredArgsConstructor
public class SowingController {

    private final SowingService sowingService;

    @PostMapping
    public ResponseEntity<Sowing> registerSowing(@RequestBody SowingDTO dto) {
        return ResponseEntity.ok(sowingService.registerSowing(dto));
    }

    @GetMapping("/active")
    public ResponseEntity<List<Sowing>> getActiveSowings() {
        return ResponseEntity.ok(sowingService.getActiveSowings());
    }

    @GetMapping
    public ResponseEntity<List<Sowing>> getAllSowings() {
        return ResponseEntity.ok(sowingService.getAllSowings());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Sowing> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.of(sowingService.updateSowingStatus(id, status));
    }
}
