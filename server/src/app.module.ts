import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma';
import { ConfigModule } from '@nestjs/config';
import { CollectionModule, UserModule } from './modules';
import { QuizesModule } from './modules/quizes';
import { AnswerModule } from './modules/answers';
import { AuthModule } from './modules/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from "node:path"

@Module({
  imports: [PrismaModule,
      ConfigModule.forRoot({isGlobal:true}),
      ServeStaticModule.forRoot({
              rootPath:path.join(process.cwd(),'uploads'),
              serveRoot:'/uploads'
      }),
      UserModule,QuizesModule,
      AnswerModule,AuthModule,CollectionModule],
})
export class AppModule {}
