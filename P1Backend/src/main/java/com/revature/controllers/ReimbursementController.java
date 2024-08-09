package com.revature.controllers;

import com.revature.DAOs.EmployeeDAO;
import com.revature.models.DTOs.ReimbursementDTO;
import com.revature.models.Employees;
import com.revature.models.Reimbursement;
import com.revature.services.ReimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reimbursements")
@CrossOrigin
public class ReimbursementController {

    private ReimbursementService rs;
    private EmployeeDAO ed;

    @Autowired
    public ReimbursementController(ReimbursementService rs, EmployeeDAO ed) {
        this.rs = rs;
        this.ed = ed;
    }




    @PostMapping
    public ResponseEntity<Object> addReimbursement(@RequestBody ReimbursementDTO newReimbursement) {
        Reimbursement reimbursement = rs.addReimbursement(newReimbursement);

        if (reimbursement == null) {
            return ResponseEntity.status(400).body("Couldn't add reimbursement...");
        }

        return ResponseEntity.status(201).body(reimbursement);

    }

    @GetMapping
    public ResponseEntity<List<Reimbursement>> getAllReimbursements() {
        return ResponseEntity.ok(rs.getAllreimbursements());
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity<List<Reimbursement>> getReimbursementByEmployeeId(@PathVariable int employeeId) {
        return ResponseEntity.ok(rs.getReimbursementByEmployeeId(employeeId));
    }

    @PatchMapping("/{reimbId}")
    public ResponseEntity<Object> updateReimbursementStatus(@RequestBody String status, @PathVariable int reimbId) {

        Reimbursement updatedReimbursement = rs.updateReimbursementStatus(status, reimbId);

        if (updatedReimbursement == null) {
            return ResponseEntity.status(400).body("Couldn't update status...");
        }

        return ResponseEntity.ok(updatedReimbursement);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Reimbursement>> getPendingReimbursements(@PathVariable String status) {
        return ResponseEntity.ok(rs.getPendingReimbursements(status));
    }

    @GetMapping("/status/{status}/{employeeId}")
    public ResponseEntity<List<Reimbursement>> getPendingReimbById(@PathVariable String status, @PathVariable int employeeId) {
        return ResponseEntity.ok(rs.getPendingReimbById(status, employeeId));
    }

    @PatchMapping("/description/{reimbId}")
    public ResponseEntity<Object> updateReimbursementDescription(@RequestBody String description, @PathVariable int reimbId) {

        Reimbursement updatedReimbursement = rs.updateReimbursementDescription(description, reimbId);

        if (updatedReimbursement == null) {
            return ResponseEntity.status(400).body("Couldn't update description...");
        }

        return ResponseEntity.ok(updatedReimbursement);
    }


}
