/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body,Query, HttpCode, HttpStatus, Param, Delete, Patch} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'List of users', type: [UserEntity] })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<{ data: UserEntity[]; count: number; page: number; limit: number }> {
    const [data, count] = await this.userService.findAll(page, limit);
    return {
      data,
      count,
      page: Number(page),
      limit: Number(limit),
    };
  }

   @Get('hi')
  getHi():string{
    return "Hi";
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteUserById(@Param('id') id: number): Promise<{ message: string }> {
    await this.userService.deleteUserById(id);
    return { message: `User ${id} Delete successfully` };
  }

  @Patch()
  async updateUser(@Body() updateUserDto:UpdateUserDto): Promise<{ message: string}>{ 
   await this.userService.updateUserById(updateUserDto.email,updateUserDto);
    return { message: `User ${updateUserDto.email} :Update successfully` };
  }

}
