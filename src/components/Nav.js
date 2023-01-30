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
        setIsClicked(true);
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
        if (!isVisible){
            setIsClicked(!isClicked);
        }
      }

    return (
        <div className={props.className}>
        {!isVisible && <img id='hamburguer' src={Hamburger} alt="Hamburger" onClick={handleClick}/>}
        {isClicked && (
        <nav id='menu'>
            <ul>
                <li> <Link to="/" onClick={handleClick}> <h2>Home</h2> </Link> </li>
                <li> <Link to="/about" onClick={handleClick}> <h2>About</h2> </Link> </li>
                <li> <Link to="/menu" onClick={handleClick}> <h2>Menu</h2> </Link> </li>
                <li> <Link to="/reservation" onClick={handleClick}> <h2>Reservation</h2> </Link> </li>
                <li> <Link to="/order" onClick={handleClick}> <h2>Order Online</h2> </Link> </li>
                <li> <Link to="/login" onClick={handleClick}> <h2>Login</h2> </Link> </li>
            </ul>
        </nav>)}
        </div>
    );
};

export default Nav;