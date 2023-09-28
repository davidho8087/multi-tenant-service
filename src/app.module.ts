//src/app.module.ts

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantController } from './tenant/tenant.controller';
import { TenantService } from './tenant/service/tenant.service';
import { TenantModule } from './tenant/tenant.module';
import { TenantDbInitMiddleware } from './tenant/middleware/tenant-db-init.middleware';
import { TenantMiddleware } from './tenant/middleware/tenant.middleware';

@Module({
  imports: [TenantModule],
  controllers: [AppController, TenantController],
  providers: [AppService, TenantService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware, TenantDbInitMiddleware).forRoutes('*');
  }
}
