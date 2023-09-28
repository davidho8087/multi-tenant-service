// tenant.module.ts
import { Module } from '@nestjs/common';

import { TenantService } from './service/tenant.service';
import { TenantDbConnectionService } from './service/tenant-db-connection.service';

@Module({
  imports: [],
  providers: [TenantService, TenantDbConnectionService],
  exports: [TenantService, TenantDbConnectionService],
})
export class TenantModule {}
