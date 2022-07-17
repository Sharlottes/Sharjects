import { Request, Response } from 'express';
import Bot from '../models/bot';

class BotlistController {
  public async readAll(req: Request, res: Response) {
    const bots = await Bot.findAll();
    try {
      if (!bots.length) res.status(404).send({ err: 'Bots not found' });
      else res.send(`find successfully: ${bots}`);
    } catch (err: any) {
      res.status(500).send(err);
    }
  }

  public async read(req: Request<{ id: string }>, res: Response) {
    const bots = await Bot.findById(req.params.id);
    try {
      if (bots.length === 0) res.status(404).send({ err: 'Bots not found' });
      else res.send(`find successfully: ${bots}`);
    } catch (err: any) {
      res.status(500).send(err);
    }
  }

  public async write(req: Request, res: Response) {
    try {
      console.log(req.body);
      const bot = await Bot.create(req.body);
      res.send(await bot.save());
    } catch (err: any) {
      res.status(500).send(err);
    }
  }

  public async delete(req: Request<{ id: string }>, res: Response) {
    try {
      await Bot.deleteById(req.params.id);
      res.sendStatus(200);
    } catch (err: any) {
      res.status(500).send(err);
    }
  }
}

export default new BotlistController();