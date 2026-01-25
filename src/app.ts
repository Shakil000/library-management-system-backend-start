import express, { Application, Request, Response } from 'express';

const app : Application = express();

app.get('/', (req: Request, res: Response) => {
  // console.log({req, res})
  res.send('Welcome to Library Management System Backend')
})


export default app;
