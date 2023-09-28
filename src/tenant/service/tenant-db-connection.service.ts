import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Request } from 'express';
import { Articles } from '../entity/tenant.entity';

@Injectable({ scope: Scope.REQUEST })
export class TenantDbConnectionService {
  private dataSource: DataSource;

  constructor(@Inject(REQUEST) private readonly request: Request) {
    this.initConnection();
  }

  public async initConnection() {
    try {
      const tenantId = this.request['tenantId'];
      console.log('tenantId====>', tenantId);
      if (!tenantId) {
        throw new Error('Tenant ID not found in the request');
      }

      const dbOptions: DataSourceOptions = {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        database: `db_${tenantId}`,
        synchronize: true,
        entities: [Articles],
        username: 'postgres',
        password: 'postgres',
      };

      this.dataSource = new DataSource(dbOptions);
      await this.dataSource.initialize();

      // console.log('Data Source: ===>', this.dataSource);
      // console.log('Manager:===>', this.dataSource.manager);
    } catch (error) {
      console.error('Error initializing tenant database connection', error);
      throw error;
    }
  }

  getEntityManager() {
    if (!this.dataSource) {
      throw new Error('Data source is not initialized');
    }
    return this.dataSource.manager;
  }
}
