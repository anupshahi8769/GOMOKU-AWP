import express, { Request, Response } from "express";

import validateSchema from '../middleware/validateSchema'
import { getAllGames } from "../service/game.service";
import { getGameById } from "../service/game.service";
import { getGameByIdSchema } from "../schema/game.schema";


const gameHandler = express.Router();

gameHandler.get("/", async (req: Request, res: Response) => {
    try {
        const result = await getAllGames()
        return res.status(200).send(
          result.map((m) => ({
            _id: m._id,
          }))
        )
      } catch (err) {
        return res.status(500).send(err)
      }    
})

// GET movie by ID, expecting movie + session info
gameHandler.get(
    '/:id',
    validateSchema(getGameByIdSchema),
    async (req: Request, res: Response) => {
      const gameId = req.params.id
  
      const game = await getGameById(gameId)
      if (!game) return res.sendStatus(404)
      const sessions = await getSessionsByGameId(gameId)
      return res.status(200).json({ ...game, sessions })
    }
  )

export default gameHandler;

function getSessionsByGameId(gameId: string) {
  throw new Error("Function not implemented.");
}
