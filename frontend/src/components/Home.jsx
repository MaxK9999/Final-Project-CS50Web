import React from "react";
import "../components_styles/Heading.css";
import "../components_styles/Home.css";
import banner from "../videos/banner.mp4";
import balloon from "../images/balloon.jpg";
import holi from "../images/holi.jpg";
import tokyo from "../images/tokyo.jpg";
import forward from "../images/forward.jpg";
import Heading from "./Heading";

const Home = () => {

    const homeBanner = (
        <div className="home-banner">
            <video autoPlay muted loop width="100%" height="auto">
                <source src={banner} type="video/mp4" />
            </video>
        </div>
    )
    
    const heroSectionHome = (
        <div className="hero-section-home">
            <div className="heading">
                <Heading title="Home" />
                <p>
                    What do <strong>YOU</strong> define as home? <br />
                    We at OdysseyOpus believe that home is where the heart is.
                </p>
            </div>
        </div>
    )

    const landingPageImages = (
        <div className="landing-page-images">
            <img src={balloon} alt="balloon" />
            <img src={holi} alt="holi" />
            <img src={tokyo} alt="tokyo" />
        </div>
    )
        
    return (
        <section className="home-page">
            {homeBanner}
            {heroSectionHome}
            <br />
            <div className="landing-page">
                <h1>Our mission </h1>
                <p>
                    At OdysseyOpus, our mission is to provide inspiration and a delightful reading experience to our users. We believe that everyone's journey is a unique adventure, and we aim to share stories that resonate, uplift, and connect. Our team is dedicated to curating content that sparks creativity, fosters exploration, and brings joy to our community.
                    We invite users to be a part of this collective journey by sharing their own adventures and experiences. Whether it's a travel tale, a personal discovery, or a moment of triumph, we want to create a platform where individuals can express themselves and inspire others in the process.
                    Join us in celebrating the diversity of human experiences and let OdysseyOpus be the canvas for your stories. Together, let's build a community where inspiration knows no boundaries, and every narrative adds a unique brushstroke to the canvas of life.
                </p>
                <br />
                <br />
                <br />
                {landingPageImages}
            </div>
            <br />
            
            <div className="about-us">
                <h1>About us</h1>
                <p>
                    Currently our team exists of one extremely devoted individual who is passionate about travel and exploring the world. He has already seen most of Europe aswell as North America and Asia.
                    But of course you, the avid travel freak, already know that "seeing most of ___" is never enough. And that's what we at OdysseyOpus think aswell, we will not stop until we have explored all of the world.
                    <br /> 
                    <br />
                    So that's why we are here! We have procured this website for you, the likeminded individual who absolutely loves seeing every nook and cranny of the world, and in turn is not afraid to share their stories with the world.
                    <br />
                    The mastermind behind this team? Let us introduce him below:
                    <br />
                    <br />
                    <div className="team">
                        <div className="team1">
                            <p>
                                <strong>Maxim Koltypin</strong> <br />
                            <ul>
                                <li>Full Stack Developer</li>
                                <li>Marine</li>
                                <li>Travel Enthusiast</li>
                                <li>Loving boyfriend</li>
                            </ul>
                            </p>
                        </div>
                        <div className="team2">
                            <img src={forward} alt="forward" />
                        </div>
                    </div>
                </p>
                <p>
                    Maxim is a 24 year old marine and self taught full stack developer. So far he has already visited many continents and their countries and is planning on visiting many more!
                    When questioned about what countries were the most memorable for him, his top five would be:

                    <ul className="countries">
                        <li>Switzerland</li>
                        <li>Japan</li>
                        <li>Austria</li>
                        <li>France</li>
                        <li>USA</li>
                    </ul>
                    <br /><br />
                    <i>
                        "Being a massive fan of the outdoors, mountains and nature, Switzerland was an absolute no-brainer. Japan would be a very close second because of it's very rich culture
                        and history. Everything about Japan just absolutely makes me want to revisit it again someday! <br />
                        Austria will always and forever be in my heart because I grew up with skiing and what better place to shred some fresh snow than in Austria.
                        France is in here because I absolutely love the views, the food and the beaches. Of course I am talking about southern France here, Nice specifically. <br />
                        Lastly for my top 5 I'd choose the USA because of how different it is to the country I grew up in, The Netherlands. I really think the USA has amazing scenery (aswell as food lol)
                        and I will be sure to visit it again sometime to see what else it has to offer." <br /><br />
                        - Maxim Koltypin
                    </i>
                    <br /><br />
                </p>
            </div>


        </section>
    )

};
export default Home 