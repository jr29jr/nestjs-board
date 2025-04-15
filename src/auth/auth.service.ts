import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './userRepository';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userRepository:UserRepository
  ) {
  }


  async signUp(signUpDto:SignUpDto){
    return this.userRepository.createUser(signUpDto);
  }

  async signIn(signUpDto: SignUpDto){
    const { username, password } = signUpDto;

    const user = await this.userRepository.findOneBy({username});

    //이러면 user가 null 처리가 된다
    //응답 코드를 스트링으로 주는게 맞나?
    if( user && await bcrypt.compare(password, user.password)){
      return 'login success';
    }
    else{
      throw new UnauthorizedException('login failed');
    }
  }

}
