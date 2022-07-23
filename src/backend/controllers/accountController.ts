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
  public readAll = createControllerMethod(async (_req, res) => {
    const accounts = await AccountModel.find()
    try {
      if (accounts.length === 0) res.status(404).send({ err: 'Accounts not found' })
      else res.send(accounts)
    } catch (err: any) {
      res.status(500).send(err)
    }
  })

  public read = createControllerMethod<{}, ReadControllerQuery>(async (req, res) => {
    console.log(req.query)
    const account = await AccountModel.findOne(req.query.id ? { id: req.query.id } : { userId: req.query.userId })
    try {
      if (account !== null) res.status(404).send({ err: 'AccountModel not found' })
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