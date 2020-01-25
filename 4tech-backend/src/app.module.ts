import { Module } from '@nestjs/common';
import { secretKey, JwtStrategy } from './services/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from './app.controller';
import { UserController } from './controllers/user/user.controller'
import { AuthController } from './controllers/auth/auth.controller';
import { UserActivityController } from './controllers/user-activity/user-activity.controller';

import { UserService } from './services/user/user.service';
import { AppService } from './app.service';
import { AuthService } from './services/auth/auth.service';
import { UserActivityService } from './services/user-activity/user-activity.service'

import { UserRepository } from './repositories/user-repository/user-repository';

import { UserSchema } from './domain/schemas/user.schema';
import { UserActivitySchema } from './domain/schemas/user-activity.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/admin',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'UserActivity', schema: UserActivitySchema }
    ]),
    JwtModule.register({
      secret: secretKey, 
      signOptions: { expiresIn: '1m'}
    })
  ],
  controllers: [AppController, UserController, AuthController, UserActivityController],
  providers: [AppService, UserService, UserRepository, AuthService, UserActivityService, JwtStrategy],
})
export class AppModule {}
