import { Request, Response } from 'express';
import Account from '../models/Account';

class AccountController {
  public async readAll(req: Request, res: Response) {
    const accounts = await Account.findAll();
    try {
      if (!accounts.length) res.status(404).send({ err: 'Account not found' });
      else res.send(accounts);
    } catch (err: any) {
      res.status(500).send(err);
    }
  }

  public async read(req: Request<{ id: string }>, res: Response) {
    const accounts = await Account.findById(req.params.id);
    console.log(req.params.id);
    try {
      if (!accounts.length) res.status(404).send({ err: 'Account not found' });
      else res.send(accounts);
    } catch (err: any) {
      res.status(500).send(err);
    }
  }

  public async write(req: Request, res: Response) {
    try {
      console.log(req.body);
      const bot = await Account.create(req.body);
      res.send(await bot.save());
    } catch (err: any) {
      res.status(500).send(err);
    }
  }

  public async delete(req: Request<{ id: string }>, res: Response) {
    try {
      await Account.deleteById(req.params.id);
      res.sendStatus(200);
    } catch (err: any) {
      res.status(500).send(err);
    }
  }
}

export default new AccountController();