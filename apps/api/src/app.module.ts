import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { GameModule } from './models/game/game.module';
import { GenreModule } from './models/genre/genre.module';
import { PlatformModule } from './models/platform/platform.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './models/user/user.module';
import { MailModule } from './mail/mail.module';
import { FeedbackModule } from './models/feedback/feedback.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      introspection: true,
      fieldResolverEnhancers: ['guards'],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: { numberScalarMode: 'integer' },
      context: ({ req }) => ({ req }),
    }),
    PrismaModule,
    MailModule,
    AuthModule,
    UserModule,
    GameModule,
    GenreModule,
    PlatformModule,
    FeedbackModule,
  ],
})
export class AppModule {}
