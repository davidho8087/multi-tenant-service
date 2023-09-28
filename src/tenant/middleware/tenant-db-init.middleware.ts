// src/tenant/middleware/tenant-db-init.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TenantDbConnectionService } from '../service/tenant-db-connection.service';

@Injectable()
export class TenantDbInitMiddleware implements NestMiddleware {
  constructor(
    private readonly tenantDbConnectionService: TenantDbConnectionService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Initialize DB connection for this tenant
    await this.tenantDbConnectionService.initConnection();

    // Attach the DB connection to the request object
    req['dbConnection'] = this.tenantDbConnectionService.getEntityManager();

    next();
  }
}
