import axios from "axios";

const api = axios.create({
    baceURL: 'http://localhost:8080'
})


export const googleAuth = (code) = api.get(`/google?code=${code}`)