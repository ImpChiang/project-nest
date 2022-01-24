import { Module } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '72h' } // token 过期时效
    }),
    UserModule
  ],
  providers: [JwtStrategy,AuthService],
  exports: [AuthService]
})
export class AuthModule {}
