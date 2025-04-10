import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialDto:SignUpDto){
    const { username,password} = authCredentialDto;
    const salt = await bcrypt.genSalt();//로직이 바뀌었네
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({
      username,
      password: hashedPassword,
    });

    try{
      await this.save(user);
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