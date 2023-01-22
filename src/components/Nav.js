import Hamburger from '../images/hamburgerMenu.svg';
import {useState, useEffect} from 'react';

const Nav = (props) => {

    const [isVisible, setIsVisible] = useState(true);

    const handleResize = () => {
        if (window.innerWidth <= 600) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
    };

    useEffect(() => {
        if (window.innerWidth <= 600) {
            setIsVisible(false);
        }
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className={props.className}>
        {!isVisible && <img src={Hamburger} alt="Hamburger"/>}
        {isVisible && (
        <nav >
            <ul>
                <li> <a href="/"> <h2>Home</h2> </a> </li>
                <li> <a href="/"> <h2>About</h2> </a> </li>
                <li> <a href="/"> <h2>Menu</h2> </a> </li>
                <li> <a href="/"> <h2>Reservation</h2> </a> </li>
                <li> <a href="/"> <h2>Order Online</h2> </a> </li>
                <li> <a href="/"> <h2>Login</h2> </a> </li>
            </ul>
        </nav>)}
        </div>
    );
};

export default Nav;