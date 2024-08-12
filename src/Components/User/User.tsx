import { useNavigate } from "react-router-dom"
import { UserInterface } from "../../interfaces/UserInterface"
import { useEffect, useState } from "react"
import axios from "axios"
import { Button, Container, Nav, Navbar, Table } from "react-bootstrap"
import { toast, ToastContainer } from "react-toastify"


export const User:React.FC<{users:UserInterface[], refreshUsers:() => void}> = ({users, refreshUsers}) => {

    const navigate = useNavigate()
    const [userList, setUserList] = useState<UserInterface[]>(users)


    useEffect(() => {
        console.log(users)
        setUserList(users)
    }, [users])

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
            setUserList(prevList =>
                prevList.map(user => 
                    user.employeeId === selectedUser.employeeId
                    ? {...user, username:newUsername}
                    :user
                )

            )
            setUserOptions(false)


            toast.success("Updated Username!", {
                position: "top-center",
                autoClose: 3000
                
            })
            refreshUsers()
        }

    }
    const updateRole = async () => {
        if(newRole) {
            const response = await axios.patch("http://localhost:8080/employees/" + selectedUser.employeeId, newRole, {
                headers: {"Content-Type": "text/plain"}
            })
            setUserList(prevList =>
                prevList.map(user => 
                    user.employeeId === selectedUser.employeeId
                    ? {...user, role:newRole}
                    :user
                )

            )
            setUserOptions(false)


            toast.success("Updated Role!", {
                position: "top-center",
                autoClose: 3000
                
            })
            refreshUsers()
        }
    }
    const updateFirst = async () => {
        if(newFirst) {
            const response = await axios.patch("http://localhost:8080/employees/firstname/" + selectedUser.employeeId, newFirst, {
                headers: {"Content-Type": "text/plain"}
            })

            setUserList(prevList =>
                prevList.map(user => 
                    user.employeeId === selectedUser.employeeId
                    ? {...user, firstName:newFirst}
                    :user
                )

            )
            setUserOptions(false)


            toast.success(`Updated First Name!`, {
                position: "top-center",
                autoClose:3000
                
            })
            refreshUsers()

            console.log(selectedUser.firstName)
        
            
            
        }
    }
    const updateLast = async () => {
        if(newLast) {
            const response = await axios.patch("http://localhost:8080/employees/lastname/" + selectedUser.employeeId, newLast, {
                headers: {"Content-Type": "text/plain"}
            })
            setUserList(prevList =>
                prevList.map(user => 
                    user.employeeId === selectedUser.employeeId
                    ? {...user, lastName:newLast}
                    :user
                )

            )
            setUserOptions(false)

            toast.success("Updated Last Name!", {
                position: "top-center",
                autoClose: 3000
                
            })
            refreshUsers()
        }
    }

    const deleteUser = async () => {

        const response = await axios.delete("http://localhost:8080/employees/" + selectedUser.employeeId)
        .then((response) => {
            console.log("User Deleted:" + response.data)

            toast.success("Deleted User!", {
                position: "top-center",
                autoClose: 3000
                
            })

            refreshUsers()
        })

        
    }


    

    
    return(

        <div className="container">

            <h3 style={{color: "white"}}>All Users:</h3>
            <div className="d-flex justify-content-center">

                {/*Updates username */}  
                {userOptions?
                <div className="m-5 w-25 d-flex flex-column align-items-start p-3" style={{border: '2px solid black', borderRadius: "15px"}}>
                    <p className="m-2" style={{color: "white"}}>Username</p>
                    <input className="m-2" type="text" placeholder="new username" onChange={(input) => {
                        setNewUsername(input.target.value)
                    }} />

                    <div className="d-flex">
                        <button className="m-2" onClick={updateUsername}>Submit</button>
                        <button className="m-2" onClick={() => setUserOptions(false)}>Cancel</button>
                    </div>
                </div>
                :
                <></>
                }

                {/*Updates role */} 
                {userOptions?
                <div className="m-5 w-25 d-flex flex-column align-items-start p-3" style={{border: '2px solid black', borderRadius: "15px"}}>
                    <p className="m-2" style={{color: "white"}}>Role</p>
                    <input className="m-2" type="text" placeholder="new role" onChange={(input) => {
                        setNewRole(input.target.value)
                    }} />

                    <div className="d-flex">
                        <button className="m-2" onClick={updateRole}>Submit</button>
                        <button className="m-2" onClick={() => setUserOptions(false)}>Cancel</button>
                    </div>
                </div>
                :
                <></>
                }
            </div>

            <div className="d-flex justify-content-center">

            {/*Updates first name */}
            {userOptions?
            <div className="m-5 w-25 d-flex flex-column align-items-start p-3" style={{border: '2px solid black', borderRadius: "15px"}}>
                <p className="m-2" style={{color: "white"}}>First Name</p>
                <input className="m-2" type="text" placeholder="new first name" onChange={(input) => {
                    setNewFirst(input.target.value)
                }} />

                <div className="d-flex">
                    <button className="m-2" onClick={updateFirst}>Submit</button>
                    <button className="m-2" onClick={() => setUserOptions(false)}>Cancel</button>
                </div>
            </div>
            :
            <></>
            }

            {/*Updates last name */} 
            {userOptions?
            <div className="m-5 w-25 d-flex flex-column align-items-start p-3" style={{border: '2px solid black', borderRadius: "15px"}}>
                <p className="m-2" style={{color: "white"}}>Last Name</p>
                <input className="m-2" type="text" placeholder="new last name" onChange={(input) => {
                    setNewLast(input.target.value)
                }} />

                <div className="d-flex">
                    <button className="m-2" onClick={updateLast}>Submit</button>
                    <button className="m-2" onClick={() => setUserOptions(false)}>Cancel</button>
                </div>
            </div>
            :
            <></>
            }
            </div>

            <Table striped bordered hover variant="dark">
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