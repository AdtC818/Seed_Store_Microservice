package com.improsvita.sowing_service.controller;

import com.improsvita.sowing_service.dto.SowingDTO;
import com.improsvita.sowing_service.service.SowingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sowings")
@CrossOrigin(origins = "*")
public class SowingController {

    @Autowired
    private SowingService service;

    @PostMapping
    public SowingDTO create(@RequestBody SowingDTO dto) {
        return service.create(dto);
    }

    @GetMapping
    public List<SowingDTO> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public SowingDTO getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public SowingDTO update(@PathVariable Long id, @RequestBody SowingDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public boolean delete(@PathVariable Long id) {
        return service.delete(id);
    }
}
