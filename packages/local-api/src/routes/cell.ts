import express from 'express';
import path from 'path';
import fs from 'fs/promises';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}
interface LocalApiError {
  code: string;
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  const fullPath = path.join(dir, filename);

  //middleware to parse req.body
  router.use(express.json());

  router.get('/cells', async (req, res) => {
    const isLocalApiError = (err: any): err is LocalApiError => {
      return typeof err.code === 'string';
    };
    try {
      // Read the file
      const result = await fs.readFile(fullPath, 'utf-8');
      console.log(`reading cells from file: ${result}`);
      res.send(JSON.parse(result));
    } catch (err) {
      //if the file does not exist then add in default content
      if (isLocalApiError(err)) {
        if (err.code === 'ENOENT') {
          // Add code to create a file and add default cells
          await fs.writeFile(fullPath, '[]', 'utf-8');
          res.send([]);
        }
      } else {
        throw err;
      }
    }
  });

  router.post('/cells', async (req, res) => {
    // take the list of cells from the obj
    // serialize them
    const { cells }: { cells: Cell[] } = req.body;

    // save cells to file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.send({ status: 'ok' });
  });

  return router;
};
