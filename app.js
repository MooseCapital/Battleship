/*
import fetch from "node-fetch";
import {re} from "@babel/core/lib/vendor/import-meta-resolve";
*/



let gameData = (function () {

        function ship(typeOfPlayer) {
            //typeOfPlayer will have A for user, B for computer
            let timesHit = 0;
            let sunk = false;
            let length = Math.floor(Math.random() * 5) + 2; //random num 2-6, floor makes the random round down 5 to 4
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

        function gameBoard(typeOfPlayer ) {  //A for user, B for computer
                let ships = [];
                let missedAttacks = [];

                function placeShip(typeOfPlayer) {
                    for (let i = 0; i < 6; i++) {  //generate 6 ships, then add them to ships array
                        ships.push(ship(typeOfPlayer));

                    }
                    console.log(ships)
                }
                placeShip(typeOfPlayer);


                function allSunk() {
                    //determine if all ships have been sunk, to be called after every attack to check
                }
                function receiveAttack(pickedCoords) {
                    ships.forEach((currentShip) => {
                        if (pickedCoords === currentShip.coords) {  //get picked coords from classlist
                        // for each ship we need to test all the coords inside it, so another loop here
                            //ship of length 4 has 4 dif coordinates, we may need to loop to test each.
                            //will need to hit specific ship, add a hit() to it
                        } else {

                        }
                    })
                }

                return {placeShip, receiveAttack, ships, allSunk, missedAttacks }
        }

        function player(isComputer = false) {
                if (isComputer) {

                } else {

                }

            return {}
        }

        function gameLoop(initialStart = false) {
            let you = player();
            let computer = player()

        }

   return {ship, gameBoard, player, gameLoop }
})()


let dom = (function () {
    let playerGrid = document.querySelector(".playergrid");
    let computerGrid = document.querySelector(".computergrid");
    let startBtn = document.querySelector(".bottom > button");

    startBtn.addEventListener("click", () => {
        gameData.gameLoop()
    })

    for (let i = 0; i < 400; i++) {
        let div = document.createElement("div");
        let div1 = document.createElement("div");
        div.classList.add(`A${i + 1}`);
        div1.classList.add(`B${i + 1}`);
        playerGrid.appendChild(div);
        computerGrid.appendChild(div1);
    }

    return {}
})()
gameData.gameBoard("A")







//export {gameData};