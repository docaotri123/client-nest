import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloController } from './hello/hello.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, HelloController],
  providers: [
    AppService,
    {
      provide: 'HELLO_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('HELLO_SERVICE_HOST'),
            port: configService.get('HELLO_SERVICE_PORT'),
          },
        }),
    },
  ],
})

export class AppModule { }