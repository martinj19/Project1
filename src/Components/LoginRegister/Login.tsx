import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { store } from "../../globalData/store"
import "./Login.css"
import { toast, ToastContainer } from "react-toastify"


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

                toast.success(`Welcome, ${store.loggedInUser.firstName}`, {position:"top-center", autoClose:3000,
                    className:"custom-toast",
                    style: {color: "black"},
                    bodyClassName:"custom-toast-body",
                    icon: <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#4CAF50"/></svg>
                })
                

                
                setTimeout(() => {
                    if (response.data.role === "Employee") {
                        navigate("/reimbursements")
                    
                    }
                    if(response.data.role === "Manager") {
                        navigate("/users")
                    }
                }, 3000)

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