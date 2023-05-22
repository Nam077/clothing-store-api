import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './modules/auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
@ApiBearerAuth()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    getHello(): string {
        return this.appService.getHello();
    }
}
