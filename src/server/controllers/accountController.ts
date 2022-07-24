import type { Request, Response } from 'express'
import AccountModel, { IAccount } from '../models/Account'
import type { ParamsDictionary } from 'express-serve-static-core'

const createControllerMethod = <
  Params = ParamsDictionary,
  Query = qs.ParsedQs,
  >(callback: (req: Request<Params, any, any, Query>, res: Response) => void | Promise<void>) => callback

interface ReadControllerQuery {
  id?: string
  userId?: string
}

interface DeleteControllerParams {
  userId: string
}

class AccountController {
  public read = createControllerMethod<{}, ReadControllerQuery>(async (req, res) => {
    console.log(req.query)
    const account = await (async () => {
      const { id, userId } = req.query;
      if (id) return await AccountModel.findOne({ _id: id });
      else if (userId) return await AccountModel.findOne({ userId });
      else return await AccountModel.find();
    })();
    try {
      if (account === null || (Array.isArray(account) && account.length === 0)) res.status(404).send({ err: 'AccountModel not found' })
      else res.send(account)
    } catch (err: any) {
      res.status(500).send(err)
    }
  })

  public write = createControllerMethod<IAccount>(async (req, res) => {
    try {
      console.log(req.body)
      const account = await (await AccountModel.create(req.body)).save()
      res.send(account)
    } catch (err: any) {
      res.status(500).send(err)
    }
  })

  public delete = createControllerMethod<DeleteControllerParams>(async (req, res) => {
    try {
      await AccountModel.deleteOne({ userId: req.params.userId })
      res.sendStatus(200)
    } catch (err: any) {
      res.status(500).send(err)
    }
  })
}

export default new AccountController()