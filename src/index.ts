import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const port = 3001;
const app = express();
app.use(express.json());
const prisma = new PrismaClient();

app.post('/create-user', async (req: Request, res: Response) => {
  const { username } = req.body;
  const createdUser = await prisma.user.create({
    data: {
      username,
      // bio: bio ? bio : null,
      cars: {
        createMany: {
          data: [{ model: 'Ford Mustang' }, { model: 'Bugatti Chiron' }],
        },
      },
    },
    include: {
      cars: true,
    },
  });
  res.json(createdUser);
});

app.get('/get-user/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      cars: true,
    },
  });
  res.json(user);
});

app.listen(port, () => {
  console.log(`servers is listening at http://localhost:${port}`);
});
