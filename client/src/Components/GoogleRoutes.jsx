import { useState } from 'react';
import { useGoogleLogin } from "@react-oauth/google"

const GoogleRoutes = () => {

    const [data, setData] = useState()
    const responceGoogle = async (authResult) => {
        try {

            if (authResult['code']) {

            }
            console.log(authResult);
            // setData(authResult)
        } catch (error) {
            console.log("error found ", error);
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: () => responceGoogle,
        onError: () => responceGoogle,
        flow: 'auth-code'

    })

    return (
        <div>

            {/* <h1> {data} after the login Data</h1> */}
            <button onClick={googleLogin}>
                Login With Google
            </button>
        </div>
    )
}

export default GoogleRoutes