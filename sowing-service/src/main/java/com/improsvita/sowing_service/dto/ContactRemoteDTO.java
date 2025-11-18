package com.improsvita.sowing_service.dto;

import lombok.Data;

@Data
public class ContactRemoteDTO {
    private Long id;
    private String name;
    private String identification;
    private String phone;
    private String email;
    private Boolean active;
}
