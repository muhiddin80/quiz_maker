import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules';

@Module({
  imports: [PrismaModule,ConfigModule.forRoot({isGlobal:true}),UserModule],
})
export class AppModule {}
