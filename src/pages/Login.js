import "../App.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import GoogleLogin from "react-google-login";
import TextField from '@mui/material/TextField';
import { Container } from 'react-bootstrap'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

async function doLogin({ email, password }) {
    const response = await fetch("https://api-resto-auth.herokuapp.com/api/v1/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        })
    })

    const data = await response.json()

    return data.token
}

async function doLoginGoogle(token) {
    const response = await fetch(" ", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token
        })
    })

    const data = await response.json()

    return data.token
}

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    async function handleSubmit(e) {
        setIsLoading(true)
        e.preventDefault()

        const userAccepted = await doLogin({ email, password })

        if (!userAccepted) {
            alert("email atau password salah")
            setIsLoading(false)
            return
        }

        doLogin({ email, password })
            .then((token) => {
                localStorage.setItem("token", token)
                navigate("/")
            })
            .catch((err) => console.log(err.message))
            .finally(() => setIsLoading(false))
    }

    const responseSuccessGoogle = (response) => {
        console.log(response)
        if (response.credential) {
            doLoginGoogle(response.credential)
                .then((token) => {
                    localStorage.setItem("token", token)
                    console.log(token)
                    navigate("/")
                })
                .catch((err) => {
                    console.log('onSuccess', err.message)
                })
        }
    }

    return (
        <div className="App-header">
            <Container className="mb-5">
                <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        type="email"
                        placeholder="masukan email"
                        margin="normal"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        type="password"
                        placeholder="masukan password"
                        margin="normal"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <button type="submit" value={isLoading ? "Loading..." : "Login"} className="btn btn-success mt-3 px-4">{isLoading ? "Loading" : "Login"}</button>
                </form>
            </Container>
            <GoogleOAuthProvider clientId="785137861913-jraaaegd6mhuunhiuntrpighacick6ea.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        responseSuccessGoogle(credentialResponse)
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </GoogleOAuthProvider>

        </div>
    )
}

export default Login