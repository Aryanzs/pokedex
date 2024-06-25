import './Home.css';
import charizard from '../assets/images/wamp.gif';

function TextBlock() {
    return (
        <div id="textblock">
            <div id="textblock-content-container">
                <div id="textblock-image-container">
                    <img
                        id="textblock-gif"
                        src={charizard}
                        alt="Pokemon Charizard GIF"
                    /> 
                </div>
                <div id="textblock-text-container">
                    <h1 id="textblock-title">Your Ultimate Pokédex Adventure!</h1>
                    <p id="textblock-content">
                        Discover the fascinating world of Pokémon. Learn about their unique abilities, habitats, and evolutionary paths. Unleash your inner Pokémon Master and explore the endless possibilities!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default TextBlock;
