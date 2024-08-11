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

       

        <div className="collection-container" style={{alignItems: "center"}}>
         <div style={{alignItems: "center"}}>
            <button onClick={() => navigate("/")} style={{border: "2px solid black"}}>Logout</button>
            <button onClick={() => navigate("/addreimbursement")} style={{border: "2px solid black"}}>Add Reimbursement</button>
            <button onClick={() => navigate("/pendingreimbursements")} style={{border: "2px solid black"}}>Your Pending Reimbursements</button>
            {store.loggedInUser.role === "Manager" ? <button onClick={() => navigate("/users")} style={{border: "2px solid black"}}>See Users</button>:<></>}
            {store.loggedInUser.role === "Manager" ? <button onClick={() => navigate("/allreimbursements")} style={{border: "2px solid black"}}>All Reimbursements</button>:<></>}
            {store.loggedInUser.role === "Manager" ? <button onClick={() => navigate("/allpendingreimbursements")} style={{border: "2px solid black"}}>All Pending Reimbursements</button>:<></>}
        </div>

            <Reimbursement reimbursements={reimbursements}></Reimbursement>

        </div>

    )


}