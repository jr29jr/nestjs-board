import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialDto:SignUpDto){
    const { username,password} = authCredentialDto;
    const user = await this.create({
      username,
      password,
    });

    await this.save(user);
    return user;
  }
}