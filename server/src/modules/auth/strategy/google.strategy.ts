import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyFunction } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy,'google'){
    constructor(){
        super({
            clientID:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            callbackURL:process.env.GOOGLE_CALLBACK_URL,
            scope:['email','profile']
        })
    }
    async validate(accessToken:string,refreshToken:string,profile: any,done:VerifyFunction): Promise<any> {
        const user = {
            email:profile._json.email,
            firstName:profile._json.name
        }

        return done(null,user)
    }
}