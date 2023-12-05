/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */

import { useState, useEffect, Fragment, useRef } from 'react'
var prevCommands = [], currentCMDindex = 0;

const CMD = () => {
    const checkEcho = (type) => { switch (type) {
        case "": 
        case "error": 
        case "success": 
        case "rainbow": 
        case "red": case "orange": case "yellow": case "green": case "blue": case "purple":
        case "darkred": case "darkorange": case "darkgreen": case "darkblue":
        case "lightyellow": case "lightgreen": case "lightblue":
        return true;

        default: 
        return false;
    }};
    const [dos, setDOS] = useState([]);
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    },
    generateNewID = () => {
        try {
            let length = 50,
                result = '', 
                characters = `0123456789!@#$%^&*()-_=+[{]}|;:"'<>,./?~aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ`, 
                charactersLength = characters.length,
                counter = 0;
            while (counter < length) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
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
    appendToConsole = (items, type="", gap=true) => {
        // console.log(`got items ${items}`)
        gap ? setDOS(dos => [...dos, ""]) : null
        items.forEach((item) => {
            let passCheck = checkEcho(type)
            setDOS(dos => [...dos, <div className={passCheck ? type : ""}>{item}</div>])
        })
    },
    Run = (commandValue) => {
        currentCMDindex=prevCommands.push(commandValue);
        console.log(`${currentCMDindex}: ${prevCommands[currentCMDindex-1]}`)
        appendToConsole([`>_ ${commandValue}`]);
        let cmdVSplit = commandValue.match(/\\?.|^$/g).reduce((p, c) => {
            if(c === '"'){
                p.quote ^= 1;
            }else if(!p.quote && c === ' '){
                p.a.push('');
            }else{
                p.a[p.a.length-1] += c.replace(/\\(.)/,"$1");
            }
            return  p;
        }, {a: ['']}).a;
        var passCheck;
        switch (cmdVSplit[0]) {
            case "": break;
            case "help": appendToConsole([
                `Welcome to MicroBean DOS`,
                `Here are all avliable commands:`,
                `> help`,
                `> echo -msg -type:opt`,
            ]); break;
            case "echo":
                passCheck = cmdVSplit[2] ? checkEcho(cmdVSplit[2]) : true;
                if (passCheck) appendToConsole([
                    cmdVSplit[1],
                ], cmdVSplit[2] ? cmdVSplit[2] : ""); 
                else appendToConsole([
                    `echo: The term '${cmdVSplit[2]}' is not recognized`,
                    `At line:1 char:${cmdVSplit[0].length+cmdVSplit[1].length+5}`,
                    `+ ${cmdVSplit[2]}`,
                    `+ ${`~`.repeat(cmdVSplit[2].length)}`,
                ], "error");
                break;
            default: appendToConsole([
                `${commandValue}: The term '${commandValue}' is not recognized`,
                `At line:1 char:1`,
                `+ ${commandValue}`,
                `+ ${`~`.repeat(commandValue.length)}`,
            ], "error");
        }
    },
    onKeyDown = (e) => {
        // e.preventDefault();
        if (e.key == "ArrowUp") {
            if (prevCommands[currentCMDindex-1]) {
                currentCMDindex--;
                e.target.value=prevCommands[currentCMDindex];
                e.target.value.length 
                    ? window.setTimeout(() => 
                        e.target.setSelectionRange(e.target.value.length,e.target.value.length))
                    : null;
            }
        } else if (e.key == "ArrowDown") {
            if (prevCommands[currentCMDindex+1]) {
                currentCMDindex++;
                e.target.value=prevCommands[currentCMDindex];
            } else {
                e.target.value="";
                currentCMDindex=prevCommands.length;
            }
            e.target.setSelectionRange(e.target.value.length,e.target.value.length);
        } else if (e.key == "Enter") {
            Run(e.target.value);
            e.target.value="";
        }
    };
    useEffect(() => {
        scrollToBottom()
    }, [dos]);
    return (
        <div id='cmd'>
            MicroBean DOS<br/>
            Copyright (C) MicroBean<br/>
            {dos.map((line) => <Fragment key={generateNewID()}>
                <div>{line}</div><br/>
            </Fragment>)}<br/>
            {">_ "}<input id="cmd-input" type='text' onKeyDown={(e) => onKeyDown(e)}/>
        </div>
    )
} 
export default CMD;