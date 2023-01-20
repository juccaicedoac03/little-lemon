import Copy from '../images/copy.svg';

const Footer = (props) => {
    return (
        <footer className={props.className}>
            <img src={Copy} alt="Copy"/>
        </footer>
    );
};

export default Footer;