import './Home.css';
import gengar from '../assets/images/wamp.gif';
import charizard from '../assets/charizardfly.gif';
import darkrai from '../assets/darkrai.gif';
import mew from '../assets/mew.gif';
import pikachu from '../assets/pikarunning.gif'; // Import the Pikachu GIF

function TextBlock() {
    return (
        <>
            <div id="charizard-marquee">
                <marquee direction="left">
                    <img src={charizard} alt="Flying Charizard" className="pokemon-gif" />
                </marquee>
            </div>

            <div id="textblock">
                <div id="textblock-content-container">
                    <div id="textblock-image-container">
                        <img
                            id="textblock-gif"
                            src={gengar}
                            alt="Pokemon Gengar GIF"
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
            <div id="darkrai-container">
                <div className="darkrai-wrapper">
                    <img
                        src={darkrai}
                        alt="Darkrai GIF"
                        className="darkrai-gif"
                    />
                    <div className="darkrai-hover-text">
                        Be ready for nightmare
                    </div>
                </div>
            </div>
            <div id="mew-container">
                <div className="mew-wrapper">
                    <img
                        src={mew}
                        alt="Mew GIF"
                        className="mew-gif"
                    />
                    <div className="mew-hover-text">
                        mew!
                    </div>
                </div>
            </div>
            <div id="pikachu-marquee">
                <marquee direction="right">
                    <img src={pikachu} alt="Running Pikachu" className="pokemon-gif w-4 h-4" />
                </marquee>
            </div>

        </>
    );
}

export default TextBlock;
