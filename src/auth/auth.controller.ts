import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService:AuthService) {
  }

  @Post('/signup')
  @HttpCode(201)
  signUp(@Body() authCredentialDto:AuthCredentialDto){
    return this.authService.signUp(authCredentialDto);
  }
}
