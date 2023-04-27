import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto/index';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private defaultLimit: number;
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.defaultLimit = configService.get<number>('defaultLimit');
  }

  async createUser(createUserDto: CreateUserDto) {
    createUserDto.email = createUserDto.email.toLowerCase();
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
    try {
      const user = await this.userModel.create(createUserDto);
      return user;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    try {
      const { password, email } = loginUserDto;
      // email = email.toLowerCase();
      const user = await this.userModel.findOne(
        { email },
        { __v: 0, fullName: 0, _id: 0 },
      );

      if (!user) throw new UnauthorizedException('Credentials are not valid');

      if (!bcrypt.compareSync(password, user.password))
        throw new UnauthorizedException('Credentials are not valid');

      return {
        user,
        token: this.getJwtToken({ id: user._id }),
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;
    return this.userModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ fullName: 1 })
      .select('-__v');
  }

  async findOne(term: string) {
    let user = User;

    // Búsqueda por UUID
    if (!user && isValidObjectId(term))
      user = await this.userModel.findById(term);

    //Búsqueda por Nombre
    if (!user)
      user = await this.userModel.findOne({
        fullName: term.toLowerCase(),
      });

    if (!user) throw new NotFoundException(`User ${term} not found`);

    return user;
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBExceptions(error: any): never {
    if (error.code === '23505') throw new BadGatewayException(error.detail);
    console.log(error);
    throw new InternalServerErrorException('Please check the logs');
  }
}
