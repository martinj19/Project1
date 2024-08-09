package com.revature.controllers;

import com.revature.models.DTOs.LoginDTO;
import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.services.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    private AuthService as;

    @Autowired
    public AuthController(AuthService as) {
        this.as = as;
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO, HttpSession session) {
        OutgoingUserDTO od = as.login(loginDTO, session);

        if (od == null) {
            return ResponseEntity.status(401).body("Invalid Credentials!");
        }

        return ResponseEntity.accepted().body(od);
    }


}
