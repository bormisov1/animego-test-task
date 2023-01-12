import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    TaskModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      debug: true,
      playground: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
