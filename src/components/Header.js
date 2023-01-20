import Logo from '../images/Logo.svg';
import Hamburger from '../images/hamburgerMenu.svg';
import Basket from '../images/Basket.svg'
import {useState, useEffect} from 'react';

const Header = (props) => {

    const [isVisible, setIsVisible] = useState(false);

    const handleResize = () => {
        if (window.innerWidth <= 600) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
    };

    useEffect(() => {
        if (window.innerWidth <= 600) {
            setIsVisible(true);
        }
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <header className={props.className}>
            {isVisible && <img src={Hamburger} alt="Hamburger"/>}
            <img src={Logo} alt="Company logo"/>
            {isVisible && <img src={Basket} alt="Basket"/>}
        </header>
    );
};

export default Header;