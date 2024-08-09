package com.revature.services;

import com.revature.DAOs.EmployeeDAO;
import com.revature.DAOs.ReimbursementDAO;
import com.revature.models.DTOs.ReimbursementDTO;
import com.revature.models.Employees;
import com.revature.models.Reimbursement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReimbursementService {

    private ReimbursementDAO rd;
    private EmployeeDAO ed;

    @Autowired
    public ReimbursementService(ReimbursementDAO rd, EmployeeDAO ed) {

        this.rd = rd;
        this.ed = ed;
    }

    public Reimbursement addReimbursement(ReimbursementDTO newReimbursement) {

        Reimbursement reimbursement = new Reimbursement(0, newReimbursement.getDescription(), newReimbursement.getAmount(), newReimbursement.getStatus(), null);
        Optional<Employees> employees = ed.findById(newReimbursement.getEmployeeId());

        if (employees.isPresent()) {
            reimbursement.setEmployee(employees.get());
            Reimbursement returnedReimbursement = rd.save(reimbursement);
            return returnedReimbursement;
        }

        else {
            return null;
        }
    }

    public List<Reimbursement> getAllreimbursements() {
        return rd.findAll();
    }

    public List<Reimbursement> getReimbursementByEmployeeId(int employeeId) {
        return rd.findByEmployeeEmployeeId(employeeId);
    }

    public Reimbursement updateReimbursementStatus(String newStatus, int reimbId) {
        Optional<Reimbursement> existingReimbursement = rd.findById(reimbId);

        if (existingReimbursement.isPresent()) {
            Reimbursement reimbursement = existingReimbursement.get();

            reimbursement.setStatus(newStatus);
            return rd.save(reimbursement);
        }

        return null;
    }

    public List<Reimbursement> getPendingReimbursements(String status) {
        return rd.findByStatus(status);
    }

    public List<Reimbursement> getPendingReimbById(String status, int employeeId) {
        return rd.findByStatusAndEmployeeEmployeeId(status, employeeId);
    }

    public Reimbursement updateReimbursementDescription(String newDescription, int reimbId) {
        Optional<Reimbursement> existingReimbursement = rd.findById(reimbId);

        if (existingReimbursement.isPresent()) {
            Reimbursement reimbursement = existingReimbursement.get();

            reimbursement.setDescription(newDescription);
            return rd.save(reimbursement);
        }

        return null;
    }
}
