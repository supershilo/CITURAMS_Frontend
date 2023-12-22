// Importing necessary modules and styles
import React from "react";
import "../styles/AboutUsPage.css";
import NavBar from "../components/NavBar";

// Functional component for the About Us page
const AboutUsPage = () => { 
  return (
    <div className="about-us-page">
      <NavBar/>
      {/* Title */}
      <b className="about-us1">About Us</b>

      {/* Description */}
      <div className="were-a-focused">
        We're a focused team of students dedicated to creating a seamless asset
        repair and management system. Our aim: digitize and simplify. Submit a
        request and our admin team swiftly takes care of it, ensuring efficient
        resolution for all repair needs.
      </div>

      {/* Placeholder divs (you might want to add content here) */}
      <div style={{marginLeft:'0px'}}>
          <div className="adrian-rectangle" />
          <div className="mezon-rectangle" />
          <div className="cielo-rectangle" />
          <div className="eloisa-rectangle" />
      </div>

      {/* Team Members */}
      <div className="cielo-alegam">Cielo Alegam</div>
      <div className="elosia-j-espao">Elosia J. Españo</div>
      <div className="adrian-john-surigao">Adrian John Surigao</div>
      <div className="mezon-sotto">Mezon Sotto</div>


      {/* Team Members' Icons */}
      <img className="adi-icon" alt="" src="/Adi.png" />
      <img className="mezon-icon" alt="" src="/Mezon.png" />
      <img className="cielo-icon" alt="" src="/Cielo.png" />
      <img className="eloisa-icon" alt="" src="/Eloisa.png" />

      {/* Team Members' Additional Details */}
      <div className="full-stack-developer">Full Stack Developer</div>
      <div className="full-stack-developer1">Full Stack Developer</div>
      <div className="full-stack-developer2">Full Stack Developer</div>
      <div className="full-stack-developer3">Full Stack Developer</div>

      {/* Team Members' Quotes */}
      <div className="que-sera-sera">“Que Sera, Sera”</div>
      <div className="sleep-well-live">“Sleep Well Live Well”</div>
      <div className="stay-hydrated">“Code is Poetry”</div>
      <div className="stay-hydrated1">“Stay hydrated”</div>
    </div>
  );
};

// Exporting the component
export default AboutUsPage;
