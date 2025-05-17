import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { IntentionModule } from './models/intention/intention.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LeadModule } from './models/lead/lead.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    })
    , TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      entities: [`${__dirname}/**/*entity{.js,.ts}`],
      migrations: [`${__dirname}/migrations/*{.ts,*.js}`],
      migrationsRun: true,
    })
    , MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      defaults: {
        from: '"Empresa Teste" <no-reply@empresateste.com>',
      },
    })
    , IntentionModule, LeadModule],
})

export class AppModule { }