import axios from "axios"
import { useEffect, useState } from "react"
import { FormControl } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { ReimbInterface } from "../../interfaces/ReimbInterface"

export const AddReimbursement:React.FC = () => {

    const[reimb, setReimb] = useState({
        description:"",
        amount:Number,
        status:"PENDING",
        employeeId:Number
    })

    const navigate = useNavigate()

    const storeValues = (input:any) => {

        if(input.target.name === "description") {
            setReimb((reimb) => ({...reimb, description:input.target.value}))
        }
        if(input.target.name === "amount") {
            setReimb((reimb) => ({...reimb, amount:input.target.value}))
        }

        else{
            setReimb((reimb) => ({...reimb, employeeId:input.target.value}))
        }
    }

    const addReimb = async () => {

        const response = await axios.post("http://localhost:8080/reimbursements", reimb)
        .then((response) => {
            console.log(response.data)
            alert("Reimbursement was created!")
            navigate("/reimbursements")
        })
        .catch((error) => {
            alert("Reimbursement failed -_-: " + error.message)
        })
    }

    return(

        <div className="container">
            <div>
                <h3>Add Reimbursement!</h3>

                <div className="input-container">
                    <input type="text" placeholder="description" name="description" onChange={storeValues}/>
                </div>
                <div className="input-container">
                    <input type="number" placeholder="amount" name="amount" onChange={storeValues}/>
                </div>


                <div className="input-container">
                    <input type="number" placeholder="employeeId" name="employeeId" onChange={storeValues}/>
                </div>

                <button className="login-button" onClick={addReimb}>Submit</button>
                <button className="login-button" onClick={() => navigate("/reimbursements")}>Back</button>

            </div>
        </div>

    )

}