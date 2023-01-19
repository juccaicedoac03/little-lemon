const Nav = (props) => {
    return (
        <nav className={props.className}>
            <ul>
                <li> <a href="/"> <h2>Home</h2> </a> </li>
                <li> <a href="/"> <h2>About</h2> </a> </li>
                <li> <a href="/"> <h2>Menu</h2> </a> </li>
                <li> <a href="/"> <h2>Reservation</h2> </a> </li>
                <li> <a href="/"> <h2>Order Online</h2> </a> </li>
                <li> <a href="/"> <h2>Login</h2> </a> </li>
            </ul>
        </nav>
    );
};

export default Nav;