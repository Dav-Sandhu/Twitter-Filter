import Items from './Items'
import {useState} from 'react'
import axios from 'axios'

const Navbar = () => {

    const[user, setUser] = useState("")

    const makeRequest = async () => {
        await axios.post(`http://localhost:8000/addUser`, {user : user.toString()}).then(() => {
            setTimeout(() => {window.location.reload(false)}, 1250)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        makeRequest()
    }

    return(
        <div id="navbar" className="navbar">
            <button className="item-label">Users</button>&nbsp;&nbsp;
            <Items />
            <form className="add-item" onSubmit={handleSubmit}>
                <input type="submit" value="Add User"/>
                <input type="text" value={user} onChange={(e) => setUser(e.target.value)} required />
            </form>
        </div>
    );
}

export default Navbar
