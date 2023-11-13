import { expect, test } from "vitest";
import BowlingGame from "./bowling";

test("bowling",()=>{

    const game = new BowlingGame();
   [6,4,10,5,5,4,3,0,6,5,2,10,10,10,10,5,5].forEach(pin=>{
       game.roll(pin)
        console.log(game.score())

   })
   expect(game.score()).toBe(179)

})