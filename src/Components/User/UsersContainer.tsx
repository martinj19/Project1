import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserInterface } from "../../interfaces/UserInterface"
import axios from "axios"
import { User } from "./User"

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

        <div>
            <button onClick={()=>navigate("/reimbursements")}>See Your Reimbursements</button>
            <User users={users}></User>
        </div>

    )
}