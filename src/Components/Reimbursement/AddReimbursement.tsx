import { FormControl } from "react-bootstrap"

export const AddReimbursement:React.FC = () => {

    return(

        <div className="container">
            <h3>Enter Reimbursement info:</h3>

            <FormControl type="text" placeholder="Enter Description" name="description"></FormControl>
            <FormControl type="text" placeholder="Enter Amount" name="amount"></FormControl>
            <FormControl type="text" placeholder="Enter Status" name="status"></FormControl>
        </div>

    )

}