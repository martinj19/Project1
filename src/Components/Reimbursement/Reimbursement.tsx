import { useEffect } from "react"
import { ReimbInterface } from "../../interfaces/ReimbInterface"
import { Button, Table } from "react-bootstrap"
import { store } from "../../globalData/store"
import "./Reimbursement.css"

export const Reimbursement:React.FC<{reimbursements:ReimbInterface[]}> = ({reimbursements}) => {

    useEffect(() => {
        console.log(reimbursements)
    }, [])

    return(

        <div className="container">

            <h3>{store.loggedInUser.firstName}'s Reimbursements:</h3>

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
                        <tr key={reimbursement.reimbId}>
                            <td>{reimbursement.reimbId}</td>
                            <td>{reimbursement.description}</td>
                            <td>{reimbursement.amount}</td>
                            <td>{reimbursement.status}</td>
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