package com.revature.services;

import com.revature.DAOs.EmployeeDAO;
import com.revature.models.Employees;
import com.revature.models.Reimbursement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private EmployeeDAO ed;

    @Autowired
    public EmployeeService(EmployeeDAO ed) {

        this.ed = ed;
    }

    public Employees registerEmployee(Employees newEmployee) {

        return ed.save(newEmployee);
    }

    public List<Employees> getAllUsers() {
        return ed.findAll();
    }

    public void deleteUserById(int employeeId) {
        Employees employee = ed.findById(employeeId).get();

        employee.getReimbursements().remove(employee);

        ed.deleteById(employeeId);
    }

    public Employees updateRole(String newrole, int employeeId) {
        Optional<Employees> existingEmployee = ed.findById(employeeId);

        if (existingEmployee.isPresent()) {
            Employees employee = existingEmployee.get();

            employee.setRole(newrole);
            return ed.save(employee);
        }

        return null;
    }

    public Employees updateUsername(String newUsername, int employeeId) {
        Optional<Employees> existingEmployee = ed.findById(employeeId);

        if (existingEmployee.isPresent()) {
            Employees employee = existingEmployee.get();

            employee.setUsername(newUsername);
            return ed.save(employee);
        }

        return null;
    }

    public Employees updatePassword(String newPassword, int employeeId) {
        Optional<Employees> existingEmployee = ed.findById(employeeId);

        if (existingEmployee.isPresent()) {
            Employees employee = existingEmployee.get();

            employee.setPassword(newPassword);
            return ed.save(employee);
        }

        return null;
    }
}
