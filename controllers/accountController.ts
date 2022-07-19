import { Request, Response } from 'express';
import Account, { IAccount } from '../models/Account';

class AccountController {
  public async readAll(req: Request, res: Response) {
    const accounts = await Account.findAll();
    try {
      if (!accounts.length) res.status(404).send({ err: 'Accounts not found' });
      else res.send(accounts);
    } catch (err: any) {
      res.status(500).send(err);
    }
  }

  public async read(req: Request<{ userId: string }>, res: Response) {
    const account = await Account.findOne({ userId: req.params.userId });
    console.log(req.params.userId);
    try {
      if (!account) res.status(404).send({ err: 'Account not found' });
      else res.send(account);
    } catch (err: any) {
      res.status(500).send(err);
    }
  }

  public async write(req: Request<IAccount>, res: Response) {
    try {
      console.log(req.body);
      const account = await (await Account.create(req.body)).save();
      res.send(account);
    } catch (err: any) {
      res.status(500).send(err);
    }
  }

  public async delete(req: Request<{ userId: string }>, res: Response) {
    try {
      await Account.deleteOne({ userId: req.params.userId });
      res.sendStatus(200);
    } catch (err: any) {
      res.status(500).send(err);
    }
  }
}

export default new AccountController();