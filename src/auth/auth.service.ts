import { Injectable } from '@nestjs/common';
import { UserRepository } from './userRepository';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository:UserRepository
  ) {
  }

  async signUp(signUpDto:SignUpDto){
    return this.userRepository.createUser(signUpDto);
  }
}
