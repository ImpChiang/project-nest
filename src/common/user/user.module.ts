import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { user } from './user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([user])],
  // controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}