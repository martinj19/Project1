import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { store } from "../../globalData/store"
import "./Login.css"

export const Login:React.FC = () => {
    const [user,setUser] = useState({
        username:"",
        password:""
    })

    const navigate = useNavigate()

    const storeValues = (input:any) => {

        if (input.target.name === "username") {
            setUser((user) => ({...user, username:input.target.value}))
        }
        else {
            setUser((user) => ({...user, password:input.target.value}))
        }
    }

    const login = async () => {

        const response = await axios.post("http://localhost:8080/auth", user, {withCredentials:true})
        .then(
            (response) => {
                console.log(response.data)

                store.loggedInUser = response.data
                console.log(response.data)

                alert("Welcome, " + store.loggedInUser.firstName)

                if (response.data.role === "Employee") {
                    navigate("/reimbursements")
                }
                if(response.data.role === "Manager") {
                    navigate("/users")
                }

            }
        )
        .catch(
            (error) => {
                alert("Login failed!")
            }
        )
    }

    return(
        <div className="login">
            <div className="text-container">
                <h1>Welcome to the Company</h1>
                <h3>Log in to Create and View Reimbursements!</h3>

                <div className="input-container">
                    <input type="text" placeholder="username" name="username" onChange={storeValues}/>
                </div>

                <div className="input-container">
                    <input type="password" placeholder="password" name="password" onChange={storeValues}/>
                </div>

                <button className="login-button" onClick={login}>Login</button>
                <button className="login-button" onClick={() => navigate("/register")}>Create Account</button>
            </div>

        </div>
 
    )
}