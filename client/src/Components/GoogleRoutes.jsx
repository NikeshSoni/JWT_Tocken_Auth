import { useState } from 'react';
import { useGoogleLogin } from "@react-oauth/google"

const GoogleRoutes = () => {

    const [data, setData] = useState()
    const responceGoogle = async (authResult) => {
        try {
            console.log(authResult, "code With Me");

            setData(authResult)

        } catch (error) {
            console.log("error found ", error);
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: () => responceGoogle,
        onError: () => (error) => console.log("Login Failed: ", error),
        flow: 'auth-code'

    })

    return (
        <div>

            <h1> {data} after the login Data</h1>
            <button onClick={googleLogin}>
                Login With Google
            </button>
        </div>
    )
}

export default GoogleRoutes