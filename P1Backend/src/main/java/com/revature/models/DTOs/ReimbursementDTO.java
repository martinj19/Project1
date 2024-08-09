package com.revature.models.DTOs;

import com.revature.models.Employees;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class ReimbursementDTO {



    private String description;

    private int amount;


    private String status;


    private Employees employee;

    private int employeeId;

    public ReimbursementDTO() {
    }

    public ReimbursementDTO(String description, int amount, String status, Employees employee, int employeeId) {
        this.description = description;
        this.amount = amount;
        this.status = status;
        this.employee = employee;
        this.employeeId = employeeId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Employees getEmployee() {
        return employee;
    }

    public void setEmployee(Employees employee) {
        this.employee = employee;
    }

    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    @Override
    public String toString() {
        return "ReimbursementDTO{" +
                "description='" + description + '\'' +
                ", amount=" + amount +
                ", status='" + status + '\'' +
                ", employee=" + employee +
                ", employeeId=" + employeeId +
                '}';
    }
}
