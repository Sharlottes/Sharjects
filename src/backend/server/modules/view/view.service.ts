import { Injectable, OnModuleInit } from '@nestjs/common';
import Next from 'next';
import { NextServer } from 'next/dist/server/next';

@Injectable()
export class ViewService implements OnModuleInit {
  private server: any;

  async onModuleInit(): Promise<void> {
    this.server = Next({ dev: true, dir: './src/frontend/client' });
    try {
      await this.server.prepare()
    } catch (e) {
      console.log(e);
    }
  }

  getNextServer(): NextServer {
    return this.server;
  }
}