import './App.css';
import Hamburger from 'hamburger-react';
import React, { useEffect, useState } from "react";
import Logo from './assets/logo.png';
import Logo2 from './assets/logofav.png';
import Image1 from './assets/face-id-4841584-4034463.webp'
import Card1 from './assets/card1.webp'
import Card2 from './assets/card2.webp'
import Card3 from './assets/card3.webp'
import { NavLink } from 'react-router-dom';

import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes"

function App() {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    console.log(theme);
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen)
  }
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

        <div id="contact" className="Main">
          <div className="Title-Contact">
            <h2 className="point_fort">Notre application en 3 points</h2>
          </div>
          <div className="Table-Cards">
            <div className="App-Cards">
              <h3>Une suivie des élèves réfléchies</h3>
              <img src={Card1} alt='Card1' className="Card-Logo"/>
            </div>
            <div className="App-Cards">
              <h3>Une reconnaisance facial à toute épreuve</h3>
              <img src={Card2} alt='Card2' className="Card-Logo"/>
            </div>
            <div className="App-Cards">
              <h3>Une application approuvée par plusieurs établissements</h3>   
              <img src={Card3} alt='Card3' className="Card-Logo"/>       
            </div>
          </div>
        </div>

        <div className="banniere2">
          <div className="Body-Dialog2">
            <span>A compléter</span>
          </div>
        </div>

        <div id="contact" className="Main2">
          <div className="Title-Contact">
            <h2 className="point_fort">L'équipe Ar U-Here</h2>
          </div>
          <div className="Table-Cards">
            <div className="App-Cards">
              <h3>Nicolas DASILVA</h3>
              <img src={Card1} alt='Card1' className="Card-Logo"/>
            </div>
            <div className="App-Cards">
              <h3>Anthony GOTI</h3>
              <img src={Card2} alt='Card2' className="Card-Logo"/>
            </div>
            <div className="App-Cards">
              <h3>Thomas BOUTET</h3>   
              <img src={Card3} alt='Card3' className="Card-Logo"/>       
            </div>
            <div className="App-Cards">
              <h3>Julien PAVONI</h3>   
              <img src={Card3} alt='Card3' className="Card-Logo"/>       
            </div>
            <div className="App-Cards">
              <h3>Federico MERETO</h3>   
              <img src={Card3} alt='Card3' className="Card-Logo"/>       
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
