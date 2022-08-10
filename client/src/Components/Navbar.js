import Items from './Items'

const Navbar = () => {
    return(
        <div id="navbar" className="navbar">
            <button id="item-label" className="item-label">Users</button>&nbsp;&nbsp;
            <Items />
            <button id="item-label" className="item-label">Add User</button>&nbsp;&nbsp;
            <button id="item-label" className="item-label">Remove User</button>
        </div>
    );
}

export default Navbar