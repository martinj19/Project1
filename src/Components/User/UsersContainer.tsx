import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserInterface } from "../../interfaces/UserInterface"
import axios from "axios"
import { User } from "./User"
import { store } from "../../globalData/store"


export const UsersContainer: React.FC<any> = ({users:any}) => {

    const [users,setUsers] = useState<UserInterface[]>([]) 

    const navigate = useNavigate()

    useEffect(()=> {
        gettAllUsers()
    }, [])

    const gettAllUsers = async () => {
        const response = await axios.get("http://localhost:8080/employees")
        .then(
            (response) => {
                console.log(response.data)
                setUsers(response.data)
            }
        )
    }

    return(

        <div style={{alignItems: "center"}}>
            <button onClick={() => navigate("/")} style={{border: "2px solid black"}}>Logout</button>
            <button onClick={() => navigate("/addreimbursement")} style={{border: "2px solid black"}}>Add Reimbursement</button>
            <button onClick={() => navigate("/pendingreimbursements")} style={{border: "2px solid black"}}>Your Pending Reimbursements</button>
            {store.loggedInUser.role === "Manager" ? <button onClick={() => navigate("/users")} style={{border: "2px solid black"}}>See Users</button>:<></>}
            {store.loggedInUser.role === "Manager" ? <button onClick={() => navigate("/allreimbursements")} style={{border: "2px solid black"}}>All Reimbursements</button>:<></>}
            {store.loggedInUser.role === "Manager" ? <button onClick={() => navigate("/allpendingreimbursements")} style={{border: "2px solid black"}}>All Pending Reimbursements</button>:<></>}
            <User users={users}></User>
            
        </div>

    )
}