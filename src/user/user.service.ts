import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4, validate as validateUUID } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  getOne(id: string): User {
    if (!validateUUID(id)) {
      throw new BadRequestException(`User's id is invalid`);
    }
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  create(createData: CreateUserDto): User {
    const user = {
      id: uuidv4(),
      createdAt: Date.now() / 1000,
      updatedAt: Date.now() / 1000,
      version: 1,
      ...createData,
    };

    this.users.push(user);

    return user;
  }

  update(id: string, updateData: UpdateUserDto): User {
    if (!validateUUID(id)) {
      throw new BadRequestException(`User's id is invalid`);
    }

    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          password: updateData.newPassword,
          version: user.version + 1,
          updatedAt: Date.now() / 1000,
        };
      }

      return user;
    });

    return this.getOne(id);
  }

  delete(id: string): void {
    if (!validateUUID(id)) {
      throw new BadRequestException(`User's id is invalid`);
    }

    const user = this.getOne(id);
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    this.users = this.users.filter((user) => user.id !== id);
  }
}
