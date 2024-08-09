import { useEffect, useState } from "react"
import { ReimbInterface } from "../../interfaces/ReimbInterface"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { Reimbursement } from "./Reimbursement"
import { store } from "../../globalData/store"
import "./ReimbursementContainer.css"

export const ReimbursementContainer:React.FC = () => {

    const [reimbursements, setReimbs] = useState<ReimbInterface[]>([])

    const navigate = useNavigate()

    const location = useLocation();


    useEffect(() => {
        if(location.pathname === "/reimbursements") {
            getAllReimb()
        }
        else if(location.pathname === "/pendingreimbursements") {
            getPending()
        }
        else if(location.pathname === "/allpendingreimbursements") {
            getAllPending()
        }
        else {
            getAllReimbTwo()
        }
    }, [location.pathname])

    const getAllReimb = async () => {
        
        
        const response = await axios.get("http://localhost:8080/reimbursements/" + store.loggedInUser.employeeID)

        setReimbs(response.data)

        console.log(response.data)

    }

    const getAllReimbTwo = async () => {
        
        
        const response = await axios.get("http://localhost:8080/reimbursements")

        setReimbs(response.data)

        console.log(response.data)

    }

    const getPending = async () => {

        const response = await axios.get("http://localhost:8080/reimbursements/status/PENDING/" + store.loggedInUser.employeeID)
        setReimbs(response.data)

        console.log(response.data)
    }

    const getAllPending = async () => {
        const response = await axios.get("http://localhost:8080/reimbursements/status/PENDING" )
        setReimbs(response.data)
        
        console.log(response.data)
    }



    return(

       

        <div className="collection-container">
         <div>
            <button onClick={() => navigate("/")}>Back to Login</button>
            <button onClick={() => navigate("/addreimbursement")}>AddReimbursement</button>
            <button onClick={() => navigate("/pendingreimbursements")}>Pending Reimbursements</button>
            {store.loggedInUser.role === "Manager" ? <button onClick={() => navigate("/users")}>See Users</button>:<></>}
            {store.loggedInUser.role === "Manager" ? <button onClick={() => navigate("/allreimbursements")}>All Reimbursements</button>:<></>}
            {store.loggedInUser.role === "Manager" ? <button onClick={() => navigate("/allpendingreimbursements")}>All Pending Reimbursements</button>:<></>}
        </div>

            <Reimbursement reimbursements={reimbursements}></Reimbursement>

        </div>

    )


}