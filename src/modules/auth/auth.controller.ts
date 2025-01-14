import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggerApi, Public } from '@app/common';
import { AuthResponse, LoginDto, RegisterDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('authorize')
@LoggerApi()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: '[LoginUser]', description: 'Login user to app' })
  @ApiResponse({ type: AuthResponse, status: HttpStatus.OK })
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: LoginDto): Promise<AuthResponse> {
    return await this.authService.loginUser(data);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: '[Register]', description: 'Register user to app' })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ type: AuthResponse })
  async register(@Body() data: RegisterDto): Promise<AuthResponse> {
    return await this.authService.registerUser(data);
  }
}
