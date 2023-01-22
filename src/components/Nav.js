import Hamburger from '../images/hamburgerMenu.svg';
import {useState, useEffect} from 'react';

const Nav = (props) => {

    const [isVisible, setIsVisible] = useState(true);
    const [isClicked, setIsClicked] = useState(false);

    const handleResize = () => {
        if (window.innerWidth <= 600) {
            setIsVisible(false);
            setIsClicked(false);
          } else {
            setIsVisible(true);
            setIsClicked(true);
          }
    };

    useEffect(() => {
        if (window.innerWidth <= 600) {
            setIsVisible(false);
            setIsClicked(false);
        }
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
    }, []);

    function handleClick() {
        setIsClicked(!isClicked);
      }
    
    return (
        <div className={props.className}>
        {!isVisible && <img id='hamburguer' src={Hamburger} alt="Hamburger" onClick={handleClick}/>}
        {isClicked && (
        <nav id='menu'>
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