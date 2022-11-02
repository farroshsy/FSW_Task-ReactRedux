import "/Users/farros/Downloads/Kampus Merdeka/Studi Independen/Binar Academy/Chapter 7/nyoba_ch7/src/App.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import TextField from '@mui/material/TextField';
import LoadingSpinner from "../LoadingSpinner";
import logo from '/Users/farros/Downloads/Kampus Merdeka/Studi Independen/Binar Academy/Chapter 7/nyoba_ch7/src/logo.svg';

async function doLogin({ email, password }) {
    const response = await fetch("http://localhost:8046/api/v1/login", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:8046"

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
    const response = await fetch("http://localhost:8046/api/v1/auth/google", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:8046"
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
        setIsLoading(true)
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
                .finally(() => setIsLoading(false))
        }
    }

    return (
        <div className="App-header">
            <img width="100" src={logo} alt="react img"/>
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
                    <button type="submit" value={isLoading ? "Loading" : "Login"} className="btn btn-success mt-3 px-4">{isLoading ? <LoadingSpinner /> : "Login"}</button>
                </form>
            </Container>
            <GoogleOAuthProvider clientId="34592998401-8sgn4k8qlohescn593f971p4gm8hrh61.apps.googleusercontent.com">
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