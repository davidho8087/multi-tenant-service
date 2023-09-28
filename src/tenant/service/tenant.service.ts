// src/tenant.service.ts
import { Articles } from '../entity/tenant.entity';
import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class TenantService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  async findAll() {
    // Retrieve the entity manager from the request object
    const entityManager = this.request['dbConnection'];
    if (!entityManager) {
      throw new Error('Database connection not initialized');
    }

    const connection = entityManager.connection;

    const repository = connection.getRepository(Articles);
    return await repository.find();
  }
}
