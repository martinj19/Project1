import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserInterface } from "../../interfaces/UserInterface"
import axios from "axios"
import { User } from "./User"
import { store } from "../../globalData/store"
import { Navbar, Container, Nav } from "react-bootstrap"


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

    const refreshUsers = async () => {
      await gettAllUsers()
    }

    return (
        <div>
          {/* Navbar */}
          <Navbar bg="" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand onClick={() => navigate("/reimbursements")} href="#">Home</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link onClick={() => navigate("/")}>Logout</Nav.Link>
                <Nav.Link onClick={() => navigate("/addreimbursement")}>
                  Add Reimbursement
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/reimbursements")}>
                  Your Reimbursements
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/pendingreimbursements")}>
                  Your Pending Reimbursements
                </Nav.Link>
                {store.loggedInUser.role === "Manager" && (
                  <>
                    <Nav.Link onClick={() => navigate("/users")}>See Users</Nav.Link>
                    <Nav.Link onClick={() => navigate("/allreimbursements")}>
                      All Reimbursements
                    </Nav.Link>
                    <Nav.Link onClick={() => navigate("/allpendingreimbursements")}>
                      All Pending Reimbursements
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Container>
          </Navbar>
    
          <User users={users} refreshUsers={refreshUsers}></User>
        </div>
      )

    
}