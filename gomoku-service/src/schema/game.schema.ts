// import { type } from 'os';
// import { string, object, number, array, TypeOf} from 'zod';

// const payload = {
//     body: object({
//         userID: string({
//             required_error: 'User ID required'
//         }),
//         size: number({
//             required_error: "Size Required"
//         }),
//         moves: array(array(number({
//             required_error: "Moves Required"
//         }))),
//         date: string({
//             required_error: "Date Required"
//         }),
//         result: string({
//             required_error: "Result required",
//         })
//     })
// };

// const getParams = {
//     params: object({
//         id: string({
//             required_error: "Game ID required",
//         })
//     })
// };

// const updateDeleteParams = {
//     params: object({
//         id: string({
//             required_error: "Game ID required"
//         })
//     })
// };

// export const getGameByIDSchema = object({
//     ...getParams
// })
// export const createGameSchema = object({
//     ...payload
// })
// export const updateGameSchema = object({
//     ...payload,
//     ...updateDeleteParams
// })
// export const deleteGameSchema = object({
//     ...updateDeleteParams
// })

// export type RetrieveGameByIdInput = TypeOf<typeof getGameByIDSchema>;
// export type CreateGameInput = TypeOf<typeof createGameSchema>;
// export type UpdateGameInput = TypeOf<typeof updateGameSchema>;
// export type deleteGameSchema = TypeOf<typeof deleteGameSchema>;


import { string, object, number, array, TypeOf } from 'zod';

const payload = {
  body: object({
    userID: string({
      required_error: 'User ID required'
    }),
    size: number({
      required_error: "Size Required"
    }),
    moves: array(array(number({
      required_error: "Moves Required"
    }))),
    date: string({
      required_error: "Date Required"
    }),
    result: string({
      required_error: "Result required",
    })
  })
};

const getParams = {
  params: object({
    id: string({
      required_error: "Game ID required",
    })
  })
};

const updateDeleteParams = {
  params: object({
    id: string({
      required_error: "Game ID required"
    })
  })
};

export const getGameByIdSchema = object({
  ...getParams
});
export const createGameSchema = object({
  ...payload
});
export const updateGameSchema = object({
  ...payload,
  ...updateDeleteParams
});
export const deleteGameSchema = object({
  ...updateDeleteParams
});

export type RetrieveGameByIdInput = TypeOf<typeof getGameByIdSchema>;
export type CreateGameInput = TypeOf<typeof createGameSchema>;
export type UpdateGameInput = TypeOf<typeof updateGameSchema>;
export type DeleteGameInput = TypeOf<typeof deleteGameSchema>;
