import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './userRepository';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository:UserRepository,
    private jwtService:JwtService,
  ) {
  }


  async signUp(signUpDto:SignUpDto){
    return this.userRepository.createUser(signUpDto);
  }

  async signIn(signUpDto: SignUpDto) : Promise<{accessToken: string}>{
    const { username, password } = signUpDto;

    const user = await this.userRepository.findOneBy({username});

    if( user && await bcrypt.compare(password, user.password)){

      // payload만 넣으면 되네? header 정보는 알아서 생성하는 건가?
      const payload = { username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken }
    }
    else{
      throw new UnauthorizedException('login failed');
    }
  }

}
