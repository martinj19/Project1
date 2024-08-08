import { useEffect, useState } from "react"
import { ReimbInterface } from "../../interfaces/ReimbInterface"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Reimbursement } from "./Reimbursement"
import { store } from "../../globalData/store"
import "./ReimbursementContainer.css"

export const ReimbursementContainer:React.FC = () => {

    const [reimbursements, setReimbs] = useState<ReimbInterface[]>([])

    const navigate = useNavigate()


    useEffect(() => {
        getAllReimb()
    }, [])

    const getAllReimb = async () => {
        
        
        const response = await axios.get("http://localhost:8080/reimbursements/" + store.loggedInUser.employeeID)

        setReimbs(response.data)

        console.log(response.data)

    }

    return(

       

        <div className="collection-container">
         <div>
            <button onClick={() => navigate("/")}>Back to Login</button>
            <button onClick={() => navigate("/addReimb")}>Add Reimbursement</button>
            {store.loggedInUser.role === "Manager" ? <button onClick={() => navigate("/users")}>See Users</button>:<></>}
        </div>

            <Reimbursement reimbursements={reimbursements}></Reimbursement>

        </div>

    )


}