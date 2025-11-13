package com.improsvita.contacts_service.repository;

import com.improsvita.contacts_service.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    Optional<Contact> findByIdentification(String identification);
    List<Contact> findByContactType(Contact.ContactType contactType);
    List<Contact> findByActive(Boolean active);
    List<Contact> findByContactTypeAndActive(Contact.ContactType contactType, Boolean active);
    boolean existsByIdentification(String identification);
}