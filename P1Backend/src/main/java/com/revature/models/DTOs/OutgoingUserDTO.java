package com.revature.models.DTOs;

public class OutgoingUserDTO {

    private int employeeId;

    private String username;

    private String firstName;
    private String lastName;
    private String role;

    public OutgoingUserDTO() {
    }

    public OutgoingUserDTO(int employeeId, String username, String firstName, String lastName, String role) {
        this.employeeId = employeeId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }

    public int getEmployeeID() {
        return employeeId;
    }

    public void setEmployeeID(int employeeID) {
        this.employeeId = employeeID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Override
    public String toString() {
        return "OutgoingUserDTO{" +
                "employeeId=" + employeeId +
                ", username='" + username + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
