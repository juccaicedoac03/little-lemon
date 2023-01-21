import Restaurant from '../images/restauranfood.jpg';
import Salad from '../images/greeksalad.jpg';
import Bruchetta from '../images/bruchetta.jpg';
import LemonDessert from '../images/lemondessert.jpg';
import Card from './Card';
import {useState, useEffect} from 'react';

const cards = [
    {image: Salad,
            alt: "Greek salad",
            tittle: "Greek salad",
            price: "$24.46",
            description: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
            },
    {image: Bruchetta,
        alt: "Bruchetta",
        tittle: "Bruchetta",
        price: "$5.99",
        description: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
        },
    {image: LemonDessert,
        alt: "Lemon Dessert",
        tittle: "Lemon Dessert",
        price: "$5.00",
        description: "This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
        }
    ];

const Main = (props) => {

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
        <main className={props.className}>
            <div id='promo'>
                <div id="allWidth">
                </div>
                <article id="slogan">
                    <h1 id='promo_tittle'>Little Lemon</h1>
                    <h3>Chicago</h3>
                    <p id="text_slogan">
                        We are a family owned Mediterranean restaurant, focused on traditional 
                        recipes served with a modern twist.
                    </p>
                    <button id="smallButton">Reserve a table</button>
                </article>
                <img src={Restaurant} alt="Restaurant"/>
            </div>
            <div id='tittle_specials'>
                <h1 id='specials'>This week specials!</h1>
                {isVisible && <button id="bigButton">Online Menu</button>}
            </div>
            {/*<div id='cardsContainer'>
                {cards.map((card,index) => {
                    return (
                    <Card key={index}
                        image={card.image}
                        alt={card.alt}
                        tittle={card.tittle}
                        price={card.price}
                        description={card.description}
                    />
                    )
                })}
            </div>*/}
        </main>
    );
};

export default Main;