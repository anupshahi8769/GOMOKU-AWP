import 'dotenv/config';
import connect from './connectDB';

import UserModel from "../model/user.model";
import users from "../data/users.json";

import MovieModel from '../model/game.model';
import games from '../data/games.json';

// import SessionModel from '../model/session.model';
// import sessions from '../data/sessions.json';


const run = async () => {
  try {
    await connect();

    await UserModel.deleteMany();
    await UserModel.create(users);

    await MovieModel.deleteMany();
    await MovieModel.insertMany(games);

    // await SessionModel.deleteMany();
    // await SessionModel.insertMany(sessions);

    process.exit(0)
  } catch (err) {
    console.log(err);
    process.exit(1)
  }
}

run();
