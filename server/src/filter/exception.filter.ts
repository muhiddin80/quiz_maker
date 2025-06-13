import { ArgumentsHost, Catch } from "@nestjs/common";
import { ExceptionFilter } from "@nestjs/common";
import { Response,Request } from "express";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const data = exception.getResponse();
        const status = exception.getStatus();
        response
            .status(status)
            .json({
                statusCode:status,
                message:data.message,
                timeStamp:new Date().toISOString(),
                path:request.url
            })
    }
}