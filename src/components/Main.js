const Main = (props) => {
    return (
        <main className={props.className}>
            <div id="allWidth">
            </div>
            <article id="slogan">
                <h1>Little Lemon</h1>
                <h3>Chicago</h3>
                <p id="text_slogan">
                    We are a family owned Mediterranean restaurant, focused on traditional 
                    recipes served with a moderntwist.
                </p>
                <button id="smallButton">Reserve a table</button>
            </article>
        </main>
    );
};

export default Main;