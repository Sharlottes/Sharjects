import { Controller, Get, Render } from '@nestjs/common'

@Controller('/')
export class ViewController {
  @Get()
  @Render('index')
  public index() {
    console.log('ahhhhh');
    return {}
  }
}