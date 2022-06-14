import './App.css';
import Hamburger from 'hamburger-react';
import React, { useEffect, useState } from "react";
import Logo from './assets/logo.png';
import Logo2 from './assets/logofav.png';
import Image1 from './assets/face-id-4841584-4034463.webp'
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
              <h3>Une Reconnaisance facial à toute épreuve</h3>
            </div>
            <div className="App-Cards">
              <h3>Un Suivie des élèves réfléchie</h3>
            </div>
            <div className="App-Cards">
              <h3>Une application approuvé par plusieur établissement</h3>          
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
