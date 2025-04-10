import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
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

    try{
      await this.save(user);
      return user;
    }
    catch (error) {
      if(error.code === '23505'){
        throw new ConflictException('existing username'); //409 오류구나.
      }
      else{
        throw new InternalServerErrorException();
      }
    }
  }
}