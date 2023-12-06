/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */

import { useState, useEffect } from 'react';
import CMD from './cmd';
import Notepad from './notepad'
import './assets/style/style.css';

import beanIcon from './assets/bean-icon.png';
import smily from './assets/icons/smily.webp';
import game from './assets/icons/game.png';
import dosico from './assets/icons/dos.png';
import notepad from './assets/icons/notepad.png';

const toBool = (string) => {
  return string=="true" ? true : (string=="false") ? false : console.error('invalid input');
}, 
styleToString = (style) => {
  return Object.keys(style).reduce((acc, key) => (
      acc + key.split(/(?=[A-Z])/).join('-').toLowerCase() + ':' + style[key] + ';'
  ), '');
}

const App = () => {
  const generateNewID = (seed) => {
    try {
      let length = seed.length,
          result = '', 
          characters = `0123456789!@#$%^&*()-_=+[{]}|;:"'<>,./?~aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ`, 
          charactersLength = characters.length,
          counter = 0,
          seedSplit=seed.split('');
      while (counter < length) {
        result += characters.charAt(seedSplit[Number(counter)]);
        counter += 1;
      }
      let finalresult = btoa(result)
      // console.log(finalresult)
      return finalresult;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  WindowTemplates = {
    "GetStarted": {
      "name": "Get Started",
      "id": generateNewID('1326349405'),
      "icon": smily,
      "winContents":
      <>
        <h1>Welcome to Beansite 98</h1>
      </>,
      "defaultStyling": {
        "height": "350px",
        "width": "500px",
        "top": "5vmin",
        "left": "5vmin",
      },
      "incluseTitlebarButtons": {
        "close": true, 
        "maximize": true, 
        "minimize": true, 
      }
    },
    "Games": {
      "name": "Games",
      "id": generateNewID('7953467823'),
      "icon": game,
      "winContents":
      <>
        <h1>Games</h1>
      </>,
      "defaultStyling": {
        "height": "350px",
        "width": "500px",
        "top": "10vmin",
        "left": "10vmin",
      },
      "incluseTitlebarButtons": {
        "close": true, 
        "maximize": true, 
        "minimize": true, 
      }
    },
    "DOS": {
      "name": "MicroBean DOS",
      "id": generateNewID('0384023941'),
      "icon": dosico,
      "winContents":
      <>
        <CMD />
      </>,
      "defaultStyling": {
        "height": "350px",
        "width": "500px",
        "top": "15vmin",
        "left": "15vmin",
      },
      "incluseTitlebarButtons": {
        "close": true, 
        "maximize": true, 
        "minimize": true, 
      }
    },
    "Notepad": {
      "name": "Notepad",
      "id": generateNewID('8853467239'),
      "icon": notepad,
      "winContents":
      <>
        <Notepad />
      </>,
      "defaultStyling": {
        "height": "350px",
        "width": "500px",
        "top": "20vmin",
        "left": "20vmin",
      },
      "incluseTitlebarButtons": {
        "close": true, 
        "maximize": true, 
        "minimize": true, 
      }
    },
    "NotepadHTMLRender": {
      "name": "index.html",
      "id": generateNewID('8928409234'),
      "icon": notepad,
      "winContents":
      <>
        <iframe id="render" frameBorder="0">

        </iframe>
      </>,
      "defaultStyling": {
        "height": "350px",
        "width": "500px",
        "top": "25vmin",
        "left": "25vmin",
      },
      "incluseTitlebarButtons": {
        "close": true, 
        "maximize": true, 
        "minimize": true, 
      }
    },
  },
  [wins, setWins] = useState([
    //template
    WindowTemplates.GetStarted
  ]),
  // icons: 🗙 🗕 🗖 🗗
  Window = (prop) => {
    const handleClose = (e, id) => {
      e.preventDefault();
      setWins(wins.filter(data => data.id !== id))
    },
    handleMaximize = (e, id, defaultStyling) => {
      e.preventDefault();
      let isMaximized = document.getElementById(`${id}isMaximized`);
      let isMinimized = document.getElementById(`${id}isMinimized`);
      if (!toBool(isMinimized.content)) {
        if (toBool(isMaximized.content)) {
          document.getElementById(id).setAttribute('style', styleToString(defaultStyling))
          isMaximized.content = "false";
          e.target.innerHTML = "🗖";
        } else if (!toBool(isMaximized.content)) {
          document.getElementById(id).setAttribute('style', `
            height: calc(100dvh - 40px);
            width: 100dvw;
            top: 0;
            left: 0;
          `)
          isMaximized.content = "true";
          e.target.innerHTML = "🗗";
        }
      }
    },
    handleMinimize = (e, id, defaultStyling) => {
      e.preventDefault();
      let isMaximized = document.getElementById(`${id}isMaximized`);
      let isMinimized = document.getElementById(`${id}isMinimized`);
      if (toBool(isMinimized.content)) {
        document.getElementById(id).setAttribute('style', styleToString(defaultStyling));
        document.getElementById(`${id}content`).style.display = "block";
        document.getElementById(id).style.minHeight="240px";
        document.getElementById(id).style.resize="both";
        isMinimized.content="false";
      } else if (!toBool(isMinimized.content)) { 
        if (toBool(isMaximized.content)) {
          e.preventDefault();
          document.getElementById(id).setAttribute('style', styleToString(defaultStyling))
          isMaximized.content = "false";
          document.getElementById(`${id}max`).innerHTML = "🗖";
        }
        document.getElementById(`${id}content`).style.display = "none";
        document.getElementById(id).style.minHeight="27px";
        document.getElementById(id).style.height="27px";
        document.getElementById(id).style.resize="horizontal";
        isMinimized.content="true";
      }
    }
    function dragElement(elmnt, id) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
      }
    
      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }
    
      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        if (toBool(document.getElementById(`${id}isMaximized`).content)) {
          document.getElementById(`${id}max`).click();
        }
        // set the element's new position:
        elmnt.style.transition="0s";
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }
    
      function closeDragElement() {
        // stop moving when mouse button is released:
        elmnt.style.transition=".35s";
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
    useEffect(() => {
      dragElement(document.getElementById(prop.id), prop.id);
      new ResizeObserver(() => {
        document.getElementById(prop.id) 
        ? document.getElementById(prop.id).style.transition = "0s"
        : null
      }).observe(document.getElementById(prop.id));
      // document.getElementById('startmenu').style.left="-17dvw";
    }, []);
    return (
      <div className='window' id={prop.id} style={prop.defaultStyling}>
        <div className='titlebar' id={`${prop.id}header`}>
          <h1><img src={prop.icon}/>{prop.title}</h1>
          { prop.includeButtons.close ? <button id={`${prop.id}del`} onClick={() => handleClose(event, prop.id)}>🗙</button> : null}
          { prop.includeButtons.maximize ? <button id={`${prop.id}max`} onClick={() => handleMaximize(event, prop.id, prop.defaultStyling)}>🗖</button> : null}
          { prop.includeButtons.minimize ? <button id={`${prop.id}min`} onClick={() => handleMinimize(event, prop.id, prop.defaultStyling)}>🗕</button> : null}
        </div>
        <meta id={`${prop.id}isMaximized`} content="false" />
        <meta id={`${prop.id}isMinimized`} content="false" />
        <div className='contentWrapper' id={`${prop.id}content`}>
          {prop.children}
        </div>
      </div>
    )
  },
  toggleStartMenu = (e) => {
    e.preventDefault();
    const isOpen = document.getElementById('sm?isOpen');
    if (toBool(isOpen.content)) {
      document.getElementById('startmenu').style.left="-25dvw";
      isOpen.content = "false";
    } else if (!toBool(isOpen.content)) {
      document.getElementById('startmenu').style.left="0";
      isOpen.content = "true";
    }
  },
  Taskbar = (prop) => {
    return (
      <div id='taskbar'>
        <button id='start' onClick={(e) => toggleStartMenu(e)} ><img src={beanIcon} />Start</button>
        {prop.children}
      </div>
    )
  },
  StartMenu = (prop) => {
    return (
      <div id='startmenu'>
        <meta id="sm?isOpen" content='false' />
        <div className="sidebar">
          <h1>Windows 98</h1>
        </div>
        {prop.children}
      </div>
    )
  },
  createNewWindow = (e, windowTemplate) => {
    e.preventDefault();
    for (let i = 0;i < wins.length; i++) if ( wins[i].id==windowTemplate.id ) return null;
    setWins([
      ...wins,
      windowTemplate
    ])
  },
  StartMenuShortcut = (prop) => {
    return (
      <div className="shortcut" onClick={(e) => createNewWindow(e, prop.windowTemplate)}>
        <img src={prop.windowTemplate.icon} />
        <h1>{prop.windowTemplate.name}</h1>
      </div>
    )
  }
  const TaskbarIcon = (prop) => {
    return (
      <div className="taskbar-icon">
        <img src={prop.iconPath} />
        <h1>{prop.title}</h1>
      </div>
    )
  }
  return (
    <div className='main'>
      {wins.map((data) => 
        <Window key={data.id} id={data.id} title={data.name} icon={data.icon} defaultStyling={data.defaultStyling} includeButtons={ data.incluseTitlebarButtons }>
          {data.winContents}
        </Window>
      )}
      <StartMenu>
        <StartMenuShortcut windowTemplate={WindowTemplates.GetStarted} />
        <StartMenuShortcut windowTemplate={WindowTemplates.Games} />
        <StartMenuShortcut windowTemplate={WindowTemplates.DOS} />
        <StartMenuShortcut windowTemplate={WindowTemplates.Notepad} />
      </StartMenu>
      <Taskbar>
        {wins.map((data) => 
          <TaskbarIcon key={data.id} id={data.id} title={data.name} iconPath={data.icon} defaultStyling={data.defaultStyling} includeButtons={ data.incluseTitlebarButtons } />
        )}
      </Taskbar>
    </div>
  )
}

export default App;
