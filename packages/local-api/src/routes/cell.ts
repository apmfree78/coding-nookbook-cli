import express from 'express';

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();

  router.get('/cells', async (req, res) => {
    // make sure the cells storage file exists
    //if the file does not exist then add in default content
    //Read the file
    // parse the list of cells
    // send the list back to browser as response
  });

  router.post('/cells', async (req, res) => {
    // make sure file exits
    // if not, create it
    // take the list of cels from the obj
    // serialize them
    // write cells into file
  });

  return router;
};
