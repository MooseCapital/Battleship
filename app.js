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
            let coordNum = Math.floor(Math.random() * 400) + 1;
            let coord = `${typeOfPlayer}${coordNum}` ;
            //let coordNums = [];

            // to make it so the ships do not cross over to the next line, we can make it divisible by 20
            //and test if it includes that and the next num in coordNums array
            for (let i = 0; i < length; i++) {
               if (i === 0) {
                    coords.push(coord)
                    //coordNums.push(coordNum);
               } else {
                   coord = `${typeOfPlayer}${coordNum + i}`
                    coords.push(coord);
                    //coordNums.push(coordNum + i);
               }
            }

            function hit() {
                 return ++this.timesHit;
            }

            function isSunk() {  //run after every hit to see if a ship is sunk
                return this.sunk = this.length <= this.timesHit;
            }

            return {length, timesHit, sunk, hit, isSunk, coords}
        }

        function gameBoard(typeOfPlayer ) {
                let ships = [];
                let missedAttacks = [];

                for (let i = 0; i < 2; i++) {  //for testing we want 1 ship
                    ships.push(ship(typeOfPlayer));

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
                    for(let s = 0; s < ships.length; s++) {
                         //possibly use the child for loop below that loops through coords, in an if statement, to see if its true
                            for (let i = 0; i < ships[s].coords.length; i++) {
                                if (pickedCoords === ships[s].coords[i]) {
                                    e.target.classList.add(".hit")
                                    return true
                                } else {



                                }

                            }

                            //  e.target.classList.add(".miss")
                            //need to use .hit()  and push failed hits to missedAttacks.
                            //also add class .hit and .miss
                            e.target.classList.add(".hit")
                    }
                    missedAttacks.push(pickedCoords)


                }
                let testCoord = ships[0].coords[0];
            return { testCoord, receiveAttack, ships, allSunk, missedAttacks  }
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
                //create receiveattack before going further
            }

            return {playerBoard, computerBoard, gameStarted}
        }

   return {ship, gameBoard, player, gameLoop}
})()


let dom = (function () {
    let playerGrid = document.querySelector(".playergrid");
    let computerGrid = document.querySelector(".computergrid");
    let gameCounter = 0;
    let gameLoopDom;

    document.querySelector("body").addEventListener("click", (e) => {
        if (e.target.closest(".bottom > button")) {
            gameLoopDom = gameData.gameLoop();
            e.target.innerText = "Reset Game";
            //disable button for 500ms then settimeout to enable
            //add class to make innertext reset game, then start game when its over
        }

        if (e.target.closest(".computergrid > div")) {
            console.log(e.target.getAttribute("data-coordinate")) //need to test data-attribute on change

            if (gameLoopDom.gameStarted) {
                console.log( gameLoopDom.computerBoard.ships)
                //console.log( gameLoopDom.playerBoard)
                gameLoopDom.computerBoard.receiveAttack(e, e.target.getAttribute("data-coordinate"));
                console.log(gameLoopDom.computerBoard.allSunk());
            }

        }

    })

    for (let i = 0; i < 400; i++) {
        let div = document.createElement("div");
        let div1 = document.createElement("div");
        // div.classList.add(`A${i + 1}`);
        // div1.classList.add(`B${i + 1}`);
        div.setAttribute("data-coordinate",`A${i + 1}`);
        div1.setAttribute("data-coordinate",`B${i + 1}`);
        playerGrid.appendChild(div);
        computerGrid.appendChild(div1);
    }

    return {}
})()








//export {gameData};