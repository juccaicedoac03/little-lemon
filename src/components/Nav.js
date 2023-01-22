import Hamburger from '../images/hamburgerMenu.svg';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

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
                <li> <Link to="/"> <h2>Home</h2> </Link> </li>
                <li> <Link to="/about"> <h2>About</h2> </Link> </li>
                <li> <Link to="/menu"> <h2>Menu</h2> </Link> </li>
                <li> <Link to="/reservation"> <h2>Reservation</h2> </Link> </li>
                <li> <Link to="/order"> <h2>Order Online</h2> </Link> </li>
                <li> <Link to="/login"> <h2>Login</h2> </Link> </li>
            </ul>
        </nav>)}
        </div>
    );
};

export default Nav;