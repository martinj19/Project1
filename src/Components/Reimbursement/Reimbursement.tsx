import { useEffect, useState } from "react"
import { ReimbInterface } from "../../interfaces/ReimbInterface"
import { Button, Table } from "react-bootstrap"
import { store } from "../../globalData/store"
import "./Reimbursement.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const Reimbursement:React.FC<{reimbursements:ReimbInterface[], refreshReimbs: () => void}> = ({reimbursements, refreshReimbs}) => {

    const navigate = useNavigate()
    const [reimbList, setReimbList] = useState<ReimbInterface[]>(reimbursements)



    useEffect(() => {
        console.log(reimbursements)
        setReimbList(reimbursements)
    }, [])

    const [selectedReimb, setSelectedReimb] = useState<ReimbInterface>({
        reimbId:0,
        description:"",
        amount:0,
        status:"",
        employeeId:0
    })

    

    const [userOptions, setUserOptions] = useState<boolean>(false)

    //Set new description
    const [newDescription, setNewDescription] = useState<string>("")

    //Set status
    const [newStatus, setNewStatus] = useState<string>("")


    const selectReimbData = (reimbursement:ReimbInterface) => {
        setSelectedReimb(reimbursement)
        setUserOptions(!userOptions)
    }

    const handleCancel = () => {
       setUserOptions(false)
        
    }

    const handleUpdate = async () => {
        // Perform update operations
        if (newDescription) {
            // Navigate based on user role
            if (store.loggedInUser.role === "Manager") {
                refreshReimbs()
                navigate("/allreimbursements");
            } else {
                navigate("/reimbursements");
            }
        }
    }



    const updateDescription = async () => {
        
        if(newDescription) {
            try{
                const response = await axios.patch("http://localhost:8080/reimbursements/description/" + selectedReimb.reimbId, newDescription, {
                    headers: {"Content-Type": "text/plain"}
                })

           
                setReimbList(prevList =>
                    prevList.map(reimbursement => 
                        reimbursement.reimbId === selectedReimb.reimbId
                        ? {...reimbursement, description:newDescription}
                        :reimbursement
                    )

                )

                refreshReimbs()

            
            


                toast.success("Updated Description!", {
                    position: "top-center",
                    autoClose: 3000
                
                })
            } catch(error) {
                console.error("Error updating description:", error)
                toast.error("Failed to update description")
            }
            


        }
        setUserOptions(false)

    }
    const updateStatus = async () => {
        if(newStatus) {
            try{
            const response = await axios.patch("http://localhost:8080/reimbursements/" + selectedReimb.reimbId, newStatus, {
                headers: {"Content-Type": "text/plain"}
            })

            setReimbList(prevList =>
                prevList.map(reimbursement => 
                    reimbursement.reimbId === selectedReimb.reimbId
                    ? {...reimbursement, status:newStatus}
                    :reimbursement
                )

            )


            toast.success("Updated Status!", {
                position: "top-center",
                autoClose: 3000
                
            })
            
            refreshReimbs()
            } catch(error) {
                console.error("Error updating status:", error)
                toast.error("Failed to update status")
            }

            
        }
    }



    return(

        <div className="container">

            <h3 style={{color: "white"}}>Reimbursements:</h3>

            <div className="d-flex justify-content-center">
                {/* Updates description */}
                {userOptions && (
                <div className="m-5 w-25 d-flex flex-column align-items-start p-3" style={{border: '2px solid black', borderRadius: "15px"}}>
                    <p className="m-2" style={{color: "white"}}>Description</p>
                    <input className="m-2" type="text" placeholder="new description" onChange={(input) => {
                        setNewDescription(input.target.value)
                    }} />
                    <div className="d-flex">
                        <button className="m-2" onClick={updateDescription}>Submit</button>
                        <button className="m-2" onClick={handleCancel}>Cancel</button>
                    </div>
                
                </div>
                
                )}
                
                {/* Updates status */}
                
                {userOptions && store.loggedInUser.role === "Manager" &&(
                <div className="m-5 w-25 d-flex flex-column align-items-start p-3" style={{border: '2px solid black', borderRadius: "15px"}}>
                    <p className="m-2" style={{color: "white"}}>Status</p>
                    <input className="m-2" type="text" placeholder="new status" onChange={(input) => {
                        setNewStatus(input.target.value)
                    }} />

                    <div className="d-flex">
                        <button className="m-2" onClick={updateStatus}>Submit</button>
                        <button className="m-2" onClick={handleCancel}>Cancel</button>
                        
                    </div>
                </div>
                
                )}
               
            </div>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Options</th>
                    </tr>
                </thead>

                <tbody>
                    {reimbursements.map((reimbursement, index) => (
                        <tr key={reimbursement.reimbId} onClick={() => {selectReimbData(reimbursement)}}>
                            <td>{reimbursement.reimbId}</td>
                            <td>{reimbursement.description}</td>
                            <td>{reimbursement.amount}</td>
                            <td style={{
                                color: reimbursement.status === "APPROVED"? "#90ee90": reimbursement.status === "PENDING"? "yellow"
                            : reimbursement.status === "DECLINED" ? "red":"white"}}>
                                    {reimbursement.status}
                                    </td>
                            <td>
                                <Button variant="outline-info">Update</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>

        </div>

    )

}