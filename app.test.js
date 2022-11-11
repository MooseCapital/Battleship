import {gameData} from "./app";

test("ship object", () => {
    expect(gameData.ship(3,1,false)).toBe(1);
})