import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter';
import { NotAcceptableException } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.enableCors({
    allowedHeaders:['authorization'],
    methods:['GET','POST','PUT','PATCH','DELETE'],
    optionSuccessStatus:200,
    origin:(reqOrigin,cd)=>{
      const allowedOrigins = process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(',')
      :'*';

    if(allowedOrigins.includes(reqOrigin)||allowedOrigins.includes('*'))
      return cd(null);
    else
      cd(
          new NotAcceptableException(
            `Sending request to ${reqOrigin} is forbidden!`
          ),
      );
    },
  });

  
  const config = new DocumentBuilder()
    .setTitle('Test mater')
    .setDescription('The test maker api description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const Port = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(Port,()=>{
    console.log(`http://localhost:${Port}`)
  })
}
bootstrap();
