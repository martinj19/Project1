package com.revature.DAOs;

import com.revature.models.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthDAO extends JpaRepository<Employees, Integer> {

    public Employees findByUsernameAndPassword(String username, String password);
}
