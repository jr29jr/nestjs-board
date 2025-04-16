import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService:AuthService) {
  }

  @Post('/signup')
  @HttpCode(201)
  signUp(@Body() signUpDto:SignUpDto){
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  singIn(@Body() signUpDto:SignUpDto): Promise<{accessToken: string}>{
    return this.authService.signIn(signUpDto);
  }
}
