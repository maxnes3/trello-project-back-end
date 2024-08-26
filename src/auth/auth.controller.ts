import { Body, Controller, HttpCode, Post, Req, Res, UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { Response } from 'express';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('signup')
  async signUp(
    @Body() dto: SignUpDto, 
    @Res({ passthrough: true }) res: Response
  ){
    const {refreshToken, ...response} = await this.authService.signUp(dto);
    this.authService.injectRefreshToken(res, refreshToken);
    return response;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('signin')
  async signIn(
    @Body() dto: SignInDto, 
    @Res({ passthrough: true }) res: Response
  ){
    const {refreshToken, ...response} = await this.authService.signIn(dto);
    this.authService.injectRefreshToken(res, refreshToken);
    return response;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('signin/access-token')
  async getFreshTokens(
    @Req() req: Request, 
    @Res({ passthrough: true }) res: Response
  ){
    const cookieRefreshToken = req.cookies[this.authService.REFRESH_TOKEN_NAME];

    if (!cookieRefreshToken) {
      this.authService.removeRefreshToken(res);
      throw new UnauthorizedException('Refresh token not passed');
    }

    const { refreshToken, ...response } = await this.authService.getFreshTokens(cookieRefreshToken);

    return response;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('logout')
  async logout(
    @Res({ passthrough: true }) res: Response
  ){
    this.authService.removeRefreshToken(res);
    return true;
  }
}
