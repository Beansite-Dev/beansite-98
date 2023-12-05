/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react'

const CMD = () => {
    const [dos, setDOS] = useState([]),
    prevCommands = [];
    let currentCMDindex = 0, i = 0;
    const generateNewID = () => {
        try {
            let length = 50,
                result = '', 
                characters = `0123456789!@#$%^&*()-_=+[{]}|;:"'<>,./?~aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ`, 
                charactersLength = characters.length,
                counter = 0;
            while (counter < length) {
                result += characters.charAt(Math.floor(Math.random() * 999));
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
    appendToConsole = (items) => {
        // console.log(`got items ${items}`)
        items.forEach((item) => {
            // console.log(`appending item ${item}`)
            setDOS([...dos, item])
        })
    },
    onKeyDown = (e) => {
        // e.preventDefault();
        if (e.key == "ArrowUp") {
            if (prevCommands[currentCMDindex+1]) {
                currentCMDindex=currentCMDindex+1;
                e.target.value = prevCommands[currentCMDindex];
            }
        }
        if (e.key == "ArrowDown") {
            if (prevCommands[currentCMDindex-1]) {
                currentCMDindex=currentCMDindex-1;
                e.target.value = prevCommands[currentCMDindex];
            }
        }
        if (e.key == "Enter") {
            appendToConsole([e.target.value])
            e.target.value=""
        }
    };
    return (
        <div id='cmd'>
            MicroBean (c) 1998<br/>
            Type "help" from help<br/>
            {dos.map((line) => 
                <p key={generateNewID()}>{line}<br/></p>
            )}
            {">_ "}<input id="cmd-input" type='text' onKeyDown={(e) => onKeyDown(e)}/>
        </div>
    )
} 
export default CMD;