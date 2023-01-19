import Logo from '../images/Logo.svg';

const Header = (props) => {
    return (
        <header className={props.className}>
            <img src={Logo} alt="Company logo"/>
        </header>
    );
};

export default Header;