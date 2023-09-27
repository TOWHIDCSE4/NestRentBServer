import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entties/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { RegistrationDto } from './dtos/registrationDto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private userService: UserService,
  ) {}

  async register(data: RegistrationDto): Promise<User> {
    const user = await this.userRepository.save(data);
    return user;
  }
}
