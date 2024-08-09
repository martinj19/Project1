package com.revature.services;

import com.revature.DAOs.AuthDAO;
import com.revature.models.DTOs.LoginDTO;
import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.models.Employees;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private AuthDAO ad;

    @Autowired
    public AuthService(AuthDAO ad) {
        this.ad = ad;
    }

    public OutgoingUserDTO login(LoginDTO loginDTO, HttpSession session) {
        Employees e = ad.findByUsernameAndPassword(loginDTO.getUsername(), loginDTO.getPassword());

        if (e == null) {
            return null;
        }
        else {
            OutgoingUserDTO od = new OutgoingUserDTO(e.getEmployeeId(), e.getUsername(), e.getFirstName(), e.getLastName(), e.getRole());

            session.setAttribute("employeeId", e.getEmployeeId());
            session.setAttribute("username", e.getUsername());
            session.setAttribute("firstName", e.getFirstName());
            session.setAttribute("lastName", e.getLastName());
            session.setAttribute("role", e.getRole());

            return od;
        }

    }
}
