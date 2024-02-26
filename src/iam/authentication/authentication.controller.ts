import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationCommonService } from './authentication.common.service';
import { SignInDto } from './dto/signin-auth.dto';

@ApiTags("Auth")
@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly authCommonService: AuthenticationCommonService){}

    @Post("signin")
    async singin(@Body() signInDto: SignInDto){
        return this.authCommonService.findUserAuthenticated(signInDto);
    }
}
