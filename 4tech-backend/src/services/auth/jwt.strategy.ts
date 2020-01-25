import { Injectable, PayloadTooLargeException } from "@nestjs/common";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

/* Essa chave nunca deve ser exposta públicamente.
Só está à mostra afim de deixar claro a sua função.
Em nível de produção, a chave deve estar protegida apropriadamente,
como secret vaults ou variáveis de ambiente por exemplo */

export const secretKey = 'wingardium leviosa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secretKey
        })
    }

    async validate(payload: any){
        return { userLogin: payload.userLogin };
    }
}