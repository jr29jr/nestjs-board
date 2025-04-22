import { Body, CanActivate, Controller, HttpCode, Injectable, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthGuard } from '@nestjs/passport';

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

  @Post('/test')
  @UseGuards(AuthGuard() as unknown as CanActivate) // useGuards
  test(@Req() req){
    console.log(req);
  }
}

