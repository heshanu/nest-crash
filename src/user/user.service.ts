/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInterface } from './model/user.interface';

@Injectable()
export class UserService {

  users: UserInterface[] = [
    { id: "1", name: "Heshan", email: "h@gmail.com", role: "INTERN" },
    { id: "2", name: "Kasun", email: "k@gmail.com", role: "ENGINEER" }, 
    { id: "3", name: "Priya", email: "p@gmail.com", role: "INTERN" },
  ];


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
