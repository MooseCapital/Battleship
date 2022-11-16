/*
import fetch from "node-fetch";
import {re} from "@babel/core/lib/vendor/import-meta-resolve";
*/



let gameData = (function () {

        function ship(typeOfPlayer) {

            let timesHit = 0;
            let sunk = false;
            let length = Math.floor(Math.random() * 5) + 2;
            let coords = [];
           let coordNum = Math.floor(Math.random() * 100) + 1;

            let coord = `${typeOfPlayer}${coordNum}` ;


            // to make it so the ships do not cross over to the next line, we can make it divisible by 20
            //and test if it includes that and the next num in coordNums array
            for (let i = 0; i < length; i++) {
               if (i === 0) {
                    coords.push(coord)

               } else {
                    if (coordNum + i > 100) {
                      return  ship(typeOfPlayer)

                      //break and continue simply stop a ship with length 6, starts at 99. coords would be 99,100.. stop. we need to rerun
                    }

                   coord = `${typeOfPlayer}${coordNum + i}`
                    coords.push(coord);
                    //if coord starts at 400 above, and has a length going beyond the grid, it will be impossible to hit it, so we need to rerun
                    //the function ship(type) if its greater
                    //regenerate if it matches another ship also
               }
            }

            function hit() {
                 return ++this.timesHit;
            }

            function isSunk() {  //run after every hit to see if a ship is sunk
                return this.sunk = this.length <= this.timesHit;
            }

            return {coords, length, timesHit, sunk, hit, isSunk}
        }

        function gameBoard(typeOfPlayer ) {
                let ships = [];
                let Attacks = [];

                for (let i = 0; i < 6; i++) {
                    ships.push(ship(typeOfPlayer));

                    for (let ship of ships) {
                        for (let coord of ship.coords) {
                            let coordMatch = 0;
                            //for every coord, we need to loop back through every ship
                            for (let ship1 of ships) {
                                for (let coord1 of ship1.coords) {

                                    if (coord === coord1) {
                                        ++coordMatch

                                        if (coordMatch === 2) {
                                            return gameBoard(typeOfPlayer)
                                        }
                                        //coord will always = coord1 once, because we test it against ourself, we want to see if it hits twice, ANOTHER NUM
                                    }
                                }
                            }

                        }
                    }
                }


                function allSunk() {
                    //determine if all ships have been sunk, to be called after every attack to check
                    for(let i = 0; i < ships.length; i++) {
                        if (!ships[i].isSunk()) {
                            return false
                        }
                    }
                    return true;

                }
                //when we find a hit, we can break,to keep .hit class, but on misses we need to search every single ship
                function receiveAttack(e, pickedCoords) {
                        for (let ship of ships) {

                            for (let coord of ship.coords) {
                                if (coord === pickedCoords) {
                                    if (e.target.classList.contains("miss")) {
                                        e.target.classList.remove("miss")
                                    }
                                    ship.hit();
                                    if (ship.isSunk()) {
                                        //do something like display message of sunk ship
                                    }
                                    if (allSunk()) {
                                        //end the game
                                    }
                                    e.target.classList.add("hit")
                                    if (Attacks.includes(pickedCoords)) {
                                        Attacks.splice(Attacks.indexOf(pickedCoords),1)
                                    }
                                    Attacks.push(pickedCoords)
                                    return
                                } else {
                                    if (e.target.classList.contains("hit")) {
                                        e.target.classList.remove("hit")
                                    }
                                    e.target.classList.add("miss")
                                    if (Attacks.includes(pickedCoords)) {
                                        Attacks.splice(Attacks.indexOf(pickedCoords),1)
                                    }
                                    Attacks.push(pickedCoords)

                                }

                            }

                        }
                    console.log(Attacks)

                }

            return {receiveAttack, ships, allSunk, Attacks  }
        }

        function player(isComputer = false) {
                if (isComputer) {

                } else {

                }

            return {}
        }

        function gameLoop() {
            let you = player();
            let computer = player();
            let gameStarted = true;
                //when it is our turn, we would do from opposite viewpoint, such as computer.receiveAttack("B122"))
            let playerBoard = gameBoard("A");
            let computerBoard = gameBoard("B");
            
            function passInClassValue() {
                //after generating the coords, test if any ships have the same coords, if so regenerate
            }

            return {playerBoard, computerBoard, gameStarted}
        }

   return {ship, gameBoard, player, gameLoop}
})()


let dom = (function () {
    let playerGrid = document.querySelector(".playergrid");
    let computerGrid = document.querySelector(".computergrid");
    let playerGridDiv = document.querySelectorAll(".playergrid > div");
    let computerGridDiv = document.querySelectorAll(".computergrid > div");
    console.log(playerGridDiv)
    console.log(computerGridDiv)
    let gameCounter = 0;
    let gameLoopDom;

    function isCoordUsed(coord) {
        for (let randomcoord of gameLoopDom.playerBoard.Attacks) {
            if (randomcoord === coord) {
                return true
            }
        }
    }
    function computerClick() {
        let simCoord = `A${Math.floor(Math.random() * 100) + 1}`;
            if (isCoordUsed(simCoord)) {
                computerClick()
                return
            }
        console.log(simCoord)
        document.querySelector(`.playergrid > div[data-coordinate=${simCoord}`).click()
    }
    
    document.querySelector("body").addEventListener("click", (e) => {
        if (e.target.closest(".bottom > button")) {
            gameLoopDom = gameData.gameLoop();
            e.target.innerText = "Reset Game";

            if (e.target.innerText === "Reset Game") {
                console.log("reset innertext test")

                playerGridDiv.forEach((div) => {
                    div.className = "";
                })
                computerGridDiv.forEach((div) => {
                    div.className = ""
                })
            }
            //disable button for 500ms then settimeout to enable
            //add class to make innertext reset game, then start game when its over
        }

        if (e.target.closest(".computergrid > div")) {
           // console.log(e.target.getAttribute("data-coordinate")) //need to test data-attribute on change

            if (gameLoopDom.gameStarted) {
                console.log( gameLoopDom.computerBoard.ships)
                //console.log( gameLoopDom.playerBoard)
                gameLoopDom.computerBoard.receiveAttack(e, e.target.getAttribute("data-coordinate"));
                // make function inside listener that will simulate click for computer and call gameLoopDom.playerBoard.receiveAttack
            }
            setTimeout(computerClick,1000)

        }
        if (e.target.closest(".playergrid > div")) {
           // console.log(e.target.getAttribute("data-coordinate"))

            if (gameLoopDom.gameStarted) {
               console.log( gameLoopDom.playerBoard.ships)
                //console.log( gameLoopDom.playerBoard)
                gameLoopDom.playerBoard.receiveAttack(e, e.target.getAttribute("data-coordinate"));
                // make function inside listener that will simulate click for computer and call gameLoopDom.playerBoard.receiveAttack
            }
        }

    })

    for (let i = 0; i < 100; i++) {
        let div = document.createElement("div");
        let div1 = document.createElement("div");
        // div.classList.add(`A${i + 1}`);
        // div1.classList.add(`B${i + 1}`);
        div.setAttribute("data-coordinate",`A${i + 1}`);
        div1.setAttribute("data-coordinate",`B${i + 1}`);
        div.className = ""
        div1.className = ""
        playerGrid.appendChild(div);
        computerGrid.appendChild(div1);
    }

    return {}
})()






//export {gameData};