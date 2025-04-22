
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './userRepository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userRepository:UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret1234',
    }as any);//as any 말고 방법이 없나 확인해보자..
  }

  //토큰에 있는 payload가 들어온다. 이게 언제 호출되지?
  async validate(payload: any) {
    const { username } = payload;

    const user = await this.userRepository.findOneBy({ username });

    if(!user){
      throw new UnauthorizedException();
    }

    return user;
  }
}
