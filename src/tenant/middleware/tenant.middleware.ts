// src/tenant/middleware/tenant.middleware.ts

import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // Retrieve the tenant ID from the request header
    const tenantId = req.headers['tenant-id'] as string;

    if (!tenantId) {
      throw new NotFoundException(
        `Tenant ID must be provided in the request headers.`,
      );
    }

    // Add the tenant ID to the request object for subsequent middleware and route handlers
    req['tenantId'] = tenantId;

    next();
  }
}
