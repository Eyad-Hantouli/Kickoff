package com.yu.kickoff.service;

import com.yu.kickoff.model.Contacts;
import com.yu.kickoff.repository.ContactsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactsService {
    @Autowired
    private ContactsRepository contactsRepository;


    public List<Contacts> getAllContacts() {
        return contactsRepository.findAll();
    }

    public Contacts createContact(Contacts contact) {
        return contactsRepository.save(contact);
    }
}
