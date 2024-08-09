package com.revature.controllers;


import com.revature.models.Employees;
import com.revature.models.Reimbursement;
import com.revature.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
@CrossOrigin
public class EmployeeController {

    private EmployeeService es;

    @Autowired
    public EmployeeController(EmployeeService es) {

        this.es = es;
    }

    @PostMapping
    public ResponseEntity<Employees> registerEmployee(@RequestBody Employees newEmployee) {
        Employees e = es.registerEmployee(newEmployee);

        return ResponseEntity.status(201).body(e);
    }

    @GetMapping
    public ResponseEntity<List<Employees>> getAllUsers() {

        return ResponseEntity.ok(es.getAllUsers());
    }

    @DeleteMapping("/{employeeId}")
    public ResponseEntity<Object> deleteCarById(@PathVariable int employeeId) {
        es.deleteUserById(employeeId);
        return ResponseEntity.ok("Employee " + employeeId + " deleted");
    }

    @PatchMapping("/{employeeId}")
    public ResponseEntity<Object> updateEmployeeRole(@RequestBody String role, @PathVariable int employeeId) {

        Employees updatedEmployee = es.updateRole(role, employeeId);

        if (updatedEmployee == null) {
            return ResponseEntity.status(400).body("Couldn't update role...");
        }

        return ResponseEntity.ok(updatedEmployee);
    }
    @PatchMapping("/username/{employeeId}")
    public ResponseEntity<Object> updateEmployeeUsername(@RequestBody String username, @PathVariable int employeeId) {

        Employees updatedEmployee = es.updateUsername(username, employeeId);

        if (updatedEmployee == null) {
            return ResponseEntity.status(400).body("Couldn't update username...");
        }

        return ResponseEntity.ok(updatedEmployee);
    }

    @PatchMapping("/password/{employeeId}")
    public ResponseEntity<Object> updateEmployeePassword(@RequestBody String password, @PathVariable int employeeId) {

        Employees updatedEmployee = es.updatePassword(password, employeeId);

        if (updatedEmployee == null) {
            return ResponseEntity.status(400).body("Couldn't update password...");
        }

        return ResponseEntity.ok(updatedEmployee);
    }
}
