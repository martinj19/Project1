import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const Register:React.FC = () => {

    const[user, setUser] = useState({
        firstName:"",
        lastName:"",
        username:"",
        password:"",
        role:"Employee"
    })

    const navigate = useNavigate()

    const storeValues = (input:any) => {

        if(input.target.name === "firstName") {
            setUser((user) => ({...user, firstName:input.target.value}))
        }
        if(input.target.name === "lastName") {
            setUser((user) => ({...user, lastName:input.target.value}))
        }
        if(input.target.name === "username") {
            setUser((user) => ({...user, username:input.target.value}))
        }
        else{
            setUser((user) => ({...user, password:input.target.value}))
        }
    }

    const register = async () => {

        const response = await axios.post("http://localhost:8080/employees", user)
        .then((response) => {
            console.log(response.data)
            toast.success("User Created!", {
                position: "top-center",
                autoClose: 3000
                
            })
            navigate("/")
        })
        .catch((error) => {
            toast.error("Couldn't register user:" + error.message)
        })
    }

    return(

        <div>
            <div className="text-container">
                <h3>Register for a new account here!</h3>

                <div className="input-container">
                    <input type="text" placeholder="firstname" name="firstName" onChange={storeValues}/>
                </div>
                <div className="input-container">
                    <input type="text" placeholder="lastname" name="lastName" onChange={storeValues}/>
                </div>
                <div className="input-container">
                    <input type="text" placeholder="username" name="username" onChange={storeValues}/>
                </div>
                <div className="input-container">
                    <input type="password" placeholder="password" name="password" onChange={storeValues}/>
                </div>

                <button className="login-button" onClick={register}>Submit</button>
                <button className="login-button" onClick={() => navigate("/")}>Back</button>

            </div>
        </div>

    )

}