import './App.css';
import Hamburger from 'hamburger-react';
import React, { useState } from "react";
import Logo from './assets/logo.png';
import Logo2 from './assets/logofav.png';
import Image1 from './assets/face-id-4841584-4034463.webp'
import Card1 from './assets/card1.webp'
import Card2 from './assets/card2.webp'
import Card3 from './assets/card3.webp'
import Nicolas from './assets/nicolas.jpg';
import Anthony from './assets/anthony.jpg';
import Thomas from './assets/thomas.jpg';
import Julien from './assets/julien.jpg';
import Federico from './assets/federico.jpg';

import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes"

function App() {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [theme] = useState('light');
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <>
    <GlobalStyles/>
    <div className="App">
      <header className="App-header">
        <div>
          <a href="/"><img src={Logo2} alt='logo' className="Logo"/></a>
        </div>
        <nav className="App-nav">
          <a data-text="&nbsp;Get started" href="/">&nbsp;Get started&nbsp;</a>
          <a data-text="&nbsp;Contact" href="#contact">&nbsp;Contact&nbsp;</a>
        </nav>
        <div>
          <Hamburger toggled={navbarOpen} toggle={setNavbarOpen} className="App-hamburger"/>
          <nav className="navBar">
            <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
              <section className="hamopen">
                <a data-text="&nbsp;Get started" href="/">&nbsp;Get started&nbsp;</a>
                <a data-text="&nbsp;Contact" href="#contact">&nbsp;Contact&nbsp;</a>
              </section>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* <button onClick={themeToggler}>Switch Theme</button> */}
        <div className="Top-View">
          <h1 className="Body-Title">Welcome to <span className="Title">AR U-Here</span> !</h1>
          <img src={Logo} alt='logo' className="Body-Logo"/>
        </div>

        <div className="banniere">
          <img src={Image1} alt='logo' className="Body-Logo"/>
          <div className="Body-Dialog">
            <span>With us, you will be able to monitor and check the attendance of your students</span>
          </div>
        </div>

        <div className="Main" id="contact">
          <div className="Title-Contact">
            <h2 className="point_fort">Our application in 3 points</h2>
          </div>
          <div className="Table-Cards">
            <div className="App-Cards">
              <h3>Reflective student tracking</h3>
              <img src={Card1} alt='Card1' className="Card-Logo"/>
            </div>
            <div className="App-Cards">
              <h3>Uncompromising facial recognition</h3>
              <img src={Card2} alt='Card2' className="Card-Logo"/>
            </div>
            <div className="App-Cards">
              <h3>An application approved by several institutions</h3>   
              <img src={Card3} alt='Card3' className="Card-Logo"/>       
            </div>
          </div>
        </div>

        <div className="banniere2">
          <div className="Body-Dialog2">
            <span>"We seek to follow up on your students"</span>
          </div>
        </div>

        <div id="contact" className="Main2">
          <div className="Title-Contact">
            <h2 className="point_fort">Ar U-Here Team</h2>
          </div>
          <div className="Table-Cards">
            <div className="App-Cards">
              <span>Backend Manager</span>
              <h3>Nicolas DASILVA</h3>
              <img src={Nicolas} alt='Card1' className="Card-Logo Card-Radius"/>
            </div>
            <div className="App-Cards">
              <span>Project manager & Scrum master</span>
              <h3>Anthony GOTI</h3>
              <img src={Anthony} alt='Card2' className="Card-Logo Card-Radius"/>
            </div>
            <div className="App-Cards">
              <span>Back&Front Assistant</span>
              <h3>Thomas BOUTET</h3>
              <img src={Thomas} alt='Card3' className="Card-Logo Card-Radius"/>       
            </div>
            <div className="App-Cards">
              <span>Frontend Manager</span>
              <h3>Julien PAVONI</h3>
              <img src={Julien} alt='Card3' className="Card-Logo Card-Radius"/>       
            </div>
            <div className="App-Cards">
              <span>Design UI/UX & Backend</span>
              <h3>Federico MERETO</h3>
              <img src={Federico} alt='Card3' className="Card-Logo Card-Radius"/>       
            </div>
          </div>
        </div>

      </main>

      <footer>
        <div className="Footer">
          <span className="Copyright">AR U-Here - &copy; 2022</span>
        </div>
      </footer>
    </div>
    </>
    </ThemeProvider>
  );
}

export default App;
