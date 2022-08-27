import axios from 'axios'
import {useState} from 'react'

const User = () => {

    const[user, setUser] = useState("")

    const makeRequest = async () => {
        await axios.post(`http://localhost:8000/addUser`, {
            user : user
        }).then(() => {
            setTimeout(() => {window.location.reload(false)}, 1250)
        })
    }

    return [user, setUser, makeRequest]
}

export default User