import { useNavigate } from "react-router-dom"
import { UserInterface } from "../../interfaces/UserInterface"
import { useEffect, useState } from "react"
import axios from "axios"
import { Button, Table } from "react-bootstrap"

export const User:React.FC<{users:UserInterface[]}> = ({users}) => {

    const navigate = useNavigate()

    useEffect(() => {
        console.log(users)
    })

    const [selectedUser, setSelectedUser] = useState<UserInterface>({
        employeeId:0,
        firstName:"",
        lastName:"",
        username:"",
        role:""
    })

    const [userOptions, setUserOptions] = useState<boolean>(false)

    //Set new username
    const [newUsername, setNewUsername] = useState<string>("")

    //Set role
    const [newRole, setNewRole] = useState<string>("")

    //Set firstname
    const [newFirst, setNewFirst] = useState<string>("")

    //Set lastname
    const [newLast, setNewLast] = useState<string>("")

    const selectUserData = (user:UserInterface) => {
        setSelectedUser(user)
        setUserOptions(!userOptions)
    }

    //Sends patch request to update username
    const updateUsername = async () => {

        if(newUsername) {
            const response = await axios.patch("http://localhost:8080/employees/username/" + selectedUser.employeeId, newUsername, {
                headers: {"Content-Type": "text/plain"}
            })

            alert(response.data)
        }

    }
    const updateRole = async () => {
        if(newRole) {
            const response = await axios.patch("http://localhost:8080/employees/" + selectedUser.employeeId, newRole, {
                headers: {"Content-Type": "text/plain"}
            })
        }
    }
    const updateFirst = async () => {
        if(newFirst) {
            const response = await axios.patch("http://localhost:8080/employees/firstname/" + selectedUser.employeeId, newFirst, {
                headers: {"Content-Type": "text/plain"}
            })
            alert(response.data)
        }
    }
    const updateLast = async () => {
        if(newLast) {
            const response = await axios.patch("http://localhost:8080/employees/lastname/" + selectedUser.employeeId, newLast, {
                headers: {"Content-Type": "text/plain"}
            })
            console.log("hey i'm here")
        }
    }

    const deleteUser = async () => {

        const response = await axios.delete("http://localhost:8080/employees/" + selectedUser.employeeId)
        .then((response) => {
            console.log("User Deleted:" + response.data)
            navigate("/users")
        })

        
    }

    return(

        <div className="container">

            <h3>All Users:</h3>

            {/*Updates username  */} 
            {userOptions?
            <div className="m-5 w-25 d-flex flex-row">
                <p className="m-2">{selectedUser.username}</p>
                <input className="m-2" type="text" placeholder="new username" onChange={(input) => {
                    setNewUsername(input.target.value)
                }} />

                <button className="m-2" onClick={updateUsername}>Submit</button>
                <button className="m-2">delete</button>
            </div>
            :
            <></>
            }

            {/* Updates role */}
            {userOptions?
            <div className="m-5 w-25 d-flex flex-row">
                <p className="m-2">{selectedUser.role}</p>
                <input className="m-2" type="text" placeholder="new role" onChange={(input) => {
                    setNewRole(input.target.value)
                }} />

                <button className="m-2" onClick={updateRole}>Submit</button>
                <button className="m-2">delete</button>
            </div>
            :
            <></>
            }

            {/* Updates first name */}
            {userOptions?
            <div className="m-5 w-25 d-flex flex-row">
                <p className="m-2">{selectedUser.firstName}</p>
                <input className="m-2" type="text" placeholder="new first name" onChange={(input) => {
                    setNewFirst(input.target.value)
                }} />

                <button className="m-2" onClick={updateFirst}>Submit</button>
                <button className="m-2">delete</button>
            </div>
            :
            <></>
            }

            {/* Updates last name */}
            {userOptions?
            <div className="m-5 w-25 d-flex flex-row">
                <p className="m-2">{selectedUser.lastName}</p>
                <input className="m-2" type="text" placeholder="new last name" onChange={(input) => {
                    setNewLast(input.target.value)
                }} />

                <button className="m-2" onClick={updateLast}>Submit</button>
                <button className="m-2">delete</button>
            </div>
            :
            <></>
            }

            <Table striped bordered hover variant="primary">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Role</th>
                        <th>Options</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user,index) => (
                        <tr key={user.employeeId} >
                            <td onClick={() => {selectUserData(user)}}>{user.employeeId}</td>
                            <td onClick={() => {selectUserData(user)}}>{user.username} </td>
                            <td onClick={() => {selectUserData(user)}}>{user.firstName}</td>
                            <td onClick={() => {selectUserData(user)}}>{user.lastName}</td>
                            <td onClick={() => {selectUserData(user)}}>{user.role}</td>
                            <td><Button variant="outline-danger" onClick={deleteUser}>Fire User</Button></td>
                        </tr>
                    ))}
                </tbody>

            </Table>

        </div>

    )
}