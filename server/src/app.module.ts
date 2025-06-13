import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma';
import { ConfigModule } from '@nestjs/config';
import { CollectionModule, UserModule } from './modules';
import { QuizesModule } from './modules/quizes';
import { AnswerModule } from './modules/answers';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [PrismaModule,
      ConfigModule.forRoot({isGlobal:true}),
      UserModule,QuizesModule,
      AnswerModule,AuthModule,CollectionModule],
})
export class AppModule {}
