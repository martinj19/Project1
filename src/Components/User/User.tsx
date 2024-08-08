import { useNavigate } from "react-router-dom"
import { UserInterface } from "../../interfaces/UserInterface"
import { useEffect, useState } from "react"
import axios from "axios"
import { Button, Table } from "react-bootstrap"

export const User:React.FC<{users:UserInterface[]}> = ({users}) => {

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
                        <tr key={user.employeeId} onClick={() => {selectUserData(user)}}>
                            <td>{user.employeeId}</td>
                            <td>{user.username} </td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.role}</td>
                            <td><Button variant="outline-danger">Fire User</Button></td>
                        </tr>
                    ))}
                </tbody>

            </Table>

        </div>

    )
}