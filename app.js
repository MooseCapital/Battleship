/*
import fetch from "node-fetch";
import {re} from "@babel/core/lib/vendor/import-meta-resolve";
*/



let gameData = (function () {

        let ship = function (length, timesHit = 0, sunk = false) {
            let coords = [];
            function hit() {
                 return ++this.timesHit   //do not need to return to see value in log, because we check it with timesHit, the function just adds to that.
            }

            function isSunk() {
                return this.sunk = this.length <= this.timesHit;
            }
            function generateCoords() {
                //random 1 coord, then see if it will hit the wall, if not continue . if then move it left or right
                //might not need to put inside a function, maybe put in ship scope
                coords.push();
            }

            return {length, timesHit, sunk, hit, isSunk, coords, generateCoords}
        }

        let gameBoard = function () {
                let ships = []; //have for loop generating 6 ships above
                let missedAttacks = [];
                function placeShip(coords) {

                }
                function allSunk() {
                    //determine if all ships have been sunk, to be called after every attack to check
                }
                function receiveAttack(pickedCoords) {
                    ships.forEach((currentShip) => {
                        if (pickedCoords === currentShip.coords) {
                        // for each ship we need to test all the coords inside it, so another loop here
                            //ship of length 4 has 4 dif coordinates, we may need to loop to test each.
                            //will need to hit specific ship, add a hit() to it
                        } else {

                        }
                    })
                }

                return {placeShip, receiveAttack, ships, allSunk }
        }

        let player = function (isComputer = false) {
                if (isComputer) {

                } else {

                }

            return {}
        }

   return {ship, gameBoard, player }
})()

let gameLoop = (function () {


})()

let dom = (function () {

})()

let player1 = gameData.ship(3,1,false);
console.log(player1.hit())
console.log(player1.hit())
console.log(player1.isSunk())
console.log(player1)




//export {gameData};