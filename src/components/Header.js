import OG_image from '../images/restaurant_chef_B.jpg';

const Header = () => {
    return (
        <header>
            <meta name="description" content="Little Lemon restaurant web page"/>
            <meta name="og:title" content="Little Lemon"/>
            <meta name="og:description" content="Little Lemon restaurant web page"/>
            <meta name="og:image" content={OG_image}/>
        </header>
    );
};

export default Header;