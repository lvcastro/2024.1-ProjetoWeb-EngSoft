import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://mongoadmin:admin@127.0.0.1:27017/nest?authSource=admin',
    ),
  ],
})
export class DatabaseModule {}
