import { useState } from 'react'

export const Auth = ({ isModalOpen, closeModal }) => {
    return (
        <>
            <Register isModalOpen={isModalOpen} closeModal={closeModal} />
        </>
    )
}

const Register = ({ isModalOpen, closeModal }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex justify-center items-center">
                    <div className="max-w-md w-[50%] z-9 mx-auto p-4 bg-white shadow-lg rounded-lg">
                        <form className="space-y-4 ">
                            <h2 className="text-2xl text-left text-black font-semibold">Register</h2>
                            <div>
                                <label htmlFor='username' className="block text-sm text-left font-medium text-gray-700">UserName:</label>
                                <input
                                    type='text'
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="mt-1 text-black block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor='password' className="block text-sm text-left font-medium text-gray-700">Password:</label>
                                <input
                                    type='password'
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 text-black block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex gap-5 justify-center">
                                <button
                                    type="submit"
                                    className=" py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Register
                                </button>

                                <button
                                    type="submit"
                                    onClick={closeModal}
                                    className=" py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Close Model
                                </button>

                            </div>
                        </form>
                        {/* Close Button */}

                    </div>
                </div>
            )}
        </>
    )
}




const Form = ({ username, setUsername, password, setPassword, closeModal, isModalOpen }) => {
    return (
        <>
            {/* <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
                <form className="space-y-4">
                    <h2 className="text-2xl font-semibold text-center">Register</h2>
                    <div>
                        <label htmlFor='username' className="block text-sm font-medium text-gray-700">UserName:</label>
                        <input
                            type='text'
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type='password'
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div> */}

        </>
    )
}
