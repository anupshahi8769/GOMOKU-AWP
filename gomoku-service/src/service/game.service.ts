// import mongoose, { Document , Schema } from 'mongoose';
import mongoose, { DocumentDefinition } from "mongoose";
import GameModel, { GameDoc } from "../model/game.model";

//  This method resturns all games
export async function getAllGames() {
  return await GameModel.find().lean();
}

//  This method returns game by Id
export async function getGameById(id: string) {
  return await GameModel.findById(id).lean();
}

//  This method returns game by userId
export async function getGamesByUserID(userId: string) {
  return await GameModel.find({ userId }).lean();
}

//  Method to create new game
export async function createGame(input: DocumentDefinition<GameDoc>) {
  return GameModel.create(input);
}

//  Method to update game
export async function updateGame(
  id: string,
  userID: string,
  input: DocumentDefinition<GameDoc>
) {
  // userId added .
  return GameModel.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(id),
      userId: new mongoose.Types.ObjectId(userID),
    },
    input,
    { new: true }
  );
}

//  method to delete the game.
export async function deleteGame(id: string, userID: string) {
  return GameModel.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
    userID: new mongoose.Types.ObjectId(userID),
  });
}
