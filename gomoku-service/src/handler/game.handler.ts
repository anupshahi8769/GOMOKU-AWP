import express, { Request, Response } from "express";

import validateSchema from "../middleware/validateSchema";
import { createGame, deleteGame, getAllGames, updateGame } from "../service/game.service";
import { getGameById } from "../service/game.service";
import { createGameSchema, deleteGameSchema, getGameByIdSchema, updateGameSchema } from "../schema/game.schema";

const gameHandler = express.Router();

gameHandler.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await getAllGames();
    return res.status(200).send(
      result.map((m) => ({
        _id: m._id,
      }))
    );
  } catch (err) {
    return res.status(500).send(err);
  }
});

gameHandler.get(
  "/:id",
  validateSchema(getGameByIdSchema),
  async (req: Request, res: Response) => {
    const gameId = req.params.id;

    const game = await getGameById(gameId);
    if (!game) return res.sendStatus(404);
    return res.status(200).json({ ...game});
  }
);

//creating game
gameHandler.post("/", validateSchema(createGameSchema), async(req: Request, res:Response)=>{
  const userID = req.userId;
  const game = req.body;
  const newGame = await createGame({...game, userID});
  return res.status(200).send(newGame);
})

//updating game
gameHandler.put("/:id", validateSchema(updateGameSchema), async(req:Request, res:Response)=>{
  try{

      const userID = req.userId;
  const game = req.body;
  const gameID = req.params.id;
  const newGame = await updateGame(gameID, userID, {...game, userID});
  console.log(newGame);
  if(!newGame) return res.sendStatus(400);
  return res.status(200).json(newGame);
  }catch(err){
      console.log(err);
  }
  
})

//delete game
gameHandler.delete("/:id", validateSchema(deleteGameSchema), async(req: Request, res: Response)=>{
  const gameID = req.params.id;
  const userID = req.userId;
  await deleteGame(gameID, userID);
  return res.sendStatus(200);
})

export default gameHandler;


