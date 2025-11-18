package com.improsvita.sowing_service.client;

import com.improsvita.sowing_service.dto.SeedRemoteDTO;
import com.improsvita.sowing_service.dto.SeedUpdateRequestDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Component
public class SeedClient {

    private final RestTemplate rest;
    private final String baseUrl; // ej: http://seed-service:8081 or http://localhost:8081

    public SeedClient(RestTemplate rest, @Value("${seed.service.url:http://seed-service:8081}") String baseUrl) {
        this.rest = rest;
        this.baseUrl = baseUrl;
    }

    public SeedRemoteDTO getSeedById(Long id) {
        try {
            String url = String.format("%s/api/seeds/%d", baseUrl, id);
            ResponseEntity<SeedRemoteDTO> resp = rest.getForEntity(url, SeedRemoteDTO.class);
            if (resp.getStatusCode().is2xxSuccessful()) return resp.getBody();
            throw new RestClientException("Error getting seed: " + resp.getStatusCode());
        } catch (RestClientException e) {
            throw new RuntimeException("No se pudo obtener la semilla remota: " + e.getMessage(), e);
        }
    }

    /**
     * Actualiza la semilla completa. Usamos la API PUT /api/seeds/{id} del seed-service.
     * Se espera que seed-service devuelva el objeto actualizado (2xx).
     */
    public SeedRemoteDTO updateSeed(Long id, SeedUpdateRequestDTO body) {
        try {
            String url = String.format("%s/api/seeds/%d", baseUrl, id);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<SeedUpdateRequestDTO> request = new HttpEntity<>(body, headers);
            ResponseEntity<SeedRemoteDTO> resp = rest.exchange(url, HttpMethod.PUT, request, SeedRemoteDTO.class);
            if (resp.getStatusCode().is2xxSuccessful()) return resp.getBody();
            throw new RestClientException("Error updating seed: " + resp.getStatusCode());
        } catch (RestClientException e) {
            throw new RuntimeException("No se pudo actualizar la semilla remota: " + e.getMessage(), e);
        }
    }

    /**
     * Resta stock: realiza GET para obtener la semilla, calcula la nueva cantidad y hace PUT con la nueva cantidad.
     * Lanza RuntimeException si stock insuficiente.
     */
    public SeedRemoteDTO reduceStock(Long seedId, int amountToReduce) {
        SeedRemoteDTO seed = getSeedById(seedId);
        if (seed == null) throw new IllegalArgumentException("Semilla no encontrada");
        int current = seed.getQuantity() == null ? 0 : seed.getQuantity();
        if (amountToReduce <= 0) throw new IllegalArgumentException("Cantidad a descontar debe ser mayor que 0");
        if (current < amountToReduce) throw new IllegalArgumentException("Stock insuficiente");
        int newQty = current - amountToReduce;

        SeedUpdateRequestDTO req = new SeedUpdateRequestDTO();
        req.setPlantName(seed.getPlantName());
        req.setVariety(seed.getVariety());
        req.setSupplier(seed.getSupplier());
        req.setQuantity(newQty);
        req.setAcquisitionDate(seed.getAcquisitionDate());
        req.setExpirationDate(seed.getExpirationDate());

        return updateSeed(seedId, req);
    }

    /**
     * Compensación: aumentar stock (usado si persistir la siembra falla después de descontar).
     */
    public SeedRemoteDTO increaseStock(Long seedId, int amountToAdd) {
        SeedRemoteDTO seed = getSeedById(seedId);
        if (seed == null) throw new IllegalArgumentException("Semilla no encontrada");
        int current = seed.getQuantity() == null ? 0 : seed.getQuantity();
        int newQty = current + amountToAdd;

        SeedUpdateRequestDTO req = new SeedUpdateRequestDTO();
        req.setPlantName(seed.getPlantName());
        req.setVariety(seed.getVariety());
        req.setSupplier(seed.getSupplier());
        req.setQuantity(newQty);
        req.setAcquisitionDate(seed.getAcquisitionDate());
        req.setExpirationDate(seed.getExpirationDate());

        return updateSeed(seedId, req);
    }
}
