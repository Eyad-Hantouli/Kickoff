package com.yu.kickoff.api;

import com.yu.kickoff.model.Contacts;
import com.yu.kickoff.service.ContactsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/system")
public class ContactsController {

    @Autowired
    private  ContactsService contactsService;


    @GetMapping("/getContacts")
    public ResponseEntity<List<Contacts>> getAllContacts() {
        List<Contacts> contacts = contactsService.getAllContacts();
        return new ResponseEntity<>(contacts, HttpStatus.OK);
    }

    @PostMapping("/contacts")
    public ResponseEntity<Contacts> createContact(@RequestBody Contacts contact) {
        Contacts newContact = contactsService.createContact(contact);
        return new ResponseEntity<>(newContact, HttpStatus.CREATED);
    }
}
