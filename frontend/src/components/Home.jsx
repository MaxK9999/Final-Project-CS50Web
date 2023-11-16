import React from "react";
import "../components_styles/Heading.css";
import "../components_styles/Home.css";
import banner from "../videos/banner.mp4";
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
        
    return (
        <section className="home-page">
            {homeBanner}
            {heroSectionHome}
            <br />
            <div className="landingpage">
                <h2>Our Story</h2>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure, reiciendis. Eos nam quos dicta rem ipsam enim, repellendus beatae delectus similique debitis quaerat itaque natus mollitia perferendis vel commodi consequuntur?
                    Error debitis ex, iste, libero ab labore ad nemo, quas accusamus dicta repellat deserunt voluptatum asperiores soluta expedita! Tempora atque error placeat repudiandae laboriosam! Aliquam distinctio eius ea ipsam amet.
                    Repellendus alias vitae impedit odio voluptatem a, tenetur illum porro voluptates est assumenda, inventore rem, repudiandae accusantium! Dignissimos nostrum dolorum eos nemo suscipit dolorem odio possimus veritatis tenetur, culpa illum?
                    Iste maxime officia cum soluta omnis alias delectus a ad. Labore, debitis maiores quos consectetur quod nobis earum veniam. Atque blanditiis distinctio delectus inventore corrupti quibusdam saepe maxime aperiam asperiores?
                    Blanditiis, expedita obcaecati? Ex enim cum neque dolorem, reiciendis tempore sed, earum temporibus nihil nostrum impedit. Magnam tenetur sint nam adipisci tempore harum error blanditiis! Aliquid veritatis facere omnis sit!
                </p>
            </div>
        </section>
    )

};
export default Home 