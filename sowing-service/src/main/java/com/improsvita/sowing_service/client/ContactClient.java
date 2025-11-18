package com.improsvita.sowing_service.client;

import com.improsvita.sowing_service.dto.ContactRemoteDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Component
public class ContactClient {

    private final RestTemplate rest;
    private final String baseUrl;

    public ContactClient(RestTemplate rest,
                         @Value("${contact.service.url:http://contacts-service:8083}") String baseUrl) {
        this.rest = rest;
        this.baseUrl = baseUrl;
    }

    public ContactRemoteDTO getContactById(Long id) {
        try {
            String url = baseUrl + "/contacts/" + id;
            ResponseEntity<ContactRemoteDTO> resp = rest.getForEntity(url, ContactRemoteDTO.class);
            if (resp.getStatusCode().is2xxSuccessful()) return resp.getBody();
            return null;
        } catch (RestClientException e) {
            throw new RuntimeException("No se pudo obtener el contacto remoto: " + e.getMessage());
        }
    }
}
