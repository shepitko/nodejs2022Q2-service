import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAll(): User[] {
    return this.userService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') userId: string): User {
    const user = this.userService.getOne(userId);

    if (!user) {
      throw new NotFoundException(`User with id: ${userId} not found`);
    }

    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createData: CreateUserDto): User {
    const user = this.userService.create(createData);
    return new User({ ...user });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put('/:id')
  update(@Param('id') userId: string, @Body() updateData: UpdateUserDto): User {
    const user = this.userService.getOne(userId);

    if (!user) {
      throw new NotFoundException(`User with id: ${userId} not found`);
    }

    if (updateData.oldPassword !== user.password) {
      debugger;
      throw new ForbiddenException('Old password is wrong');
    }

    const updatedUser = this.userService.update(user.id, updateData);
    return new User({ ...updatedUser });
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') artistId: string) {
    this.userService.delete(artistId);
  }
}
