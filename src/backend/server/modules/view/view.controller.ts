import { Controller, Get, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';

import { ViewService } from './view.service';

@Controller('/')
export class ViewController {
  constructor(private ViewService: ViewService) { }

  @Get('*')
  static(@Req() req: Request, @Res() res: Response) {
    const handle = this.ViewService.getNextServer().getRequestHandler();
    handle(req, res);
  }
}