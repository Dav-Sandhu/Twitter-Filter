import Items from './Items'

const Navbar = ({user, setUser, makeRequest}) => {

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
