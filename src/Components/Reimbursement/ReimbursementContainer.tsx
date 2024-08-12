import { useEffect, useState } from "react"
import { ReimbInterface } from "../../interfaces/ReimbInterface"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { Reimbursement } from "./Reimbursement"
import { store } from "../../globalData/store"
import "./ReimbursementContainer.css"
import { Nav, Navbar, NavDropdown } from "react-bootstrap"

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

    const refreshReimbs = async () => {
        if (store.loggedInUser.role === "Manager") {
            await getAllReimbTwo()
            navigate("/allreimbursements")
        }
        else {
            await getAllReimb()        
            navigate("/reimbursements")
        }
    }

     
    


        return (
            <div className="collection-container" style={{ alignItems: "center" }}>
                <Navbar bg="" variant="dark" expand="lg">
                    <Navbar.Brand onClick={() => navigate("/reimbursements")} style={{ cursor: 'pointer' }}>Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => navigate("/")}>Logout</Nav.Link>
                            <Nav.Link onClick={() => navigate("/addreimbursement")}>Add Reimbursement</Nav.Link>
                            <Nav.Link onClick={() => navigate("/reimbursements")}>Your Reimbursements</Nav.Link>
                            <Nav.Link onClick={() => navigate("/pendingreimbursements")}>Your Pending Reimbursements</Nav.Link>
                            {store.loggedInUser.role === "Manager" && (
                                <NavDropdown title="Manager Options" id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={() => navigate("/users")}>See Users</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => navigate("/allreimbursements")}>All Reimbursements</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => navigate("/allpendingreimbursements")}>All Pending Reimbursements</NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
    
                <Reimbursement reimbursements={reimbursements} refreshReimbs={refreshReimbs}></Reimbursement>
            </div>
        )
        


}