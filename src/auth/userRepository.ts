import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialDto:AuthCredentialDto){
    const { username,password} = authCredentialDto;
    const user = await this.create({
      username,
      password,
    });

    await this.save(user);
    return user;
  }
}