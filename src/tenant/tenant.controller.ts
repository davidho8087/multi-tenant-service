// src/tenant/tenant.controller.ts

import { Controller, Get, Post, Body } from '@nestjs/common';
import { TenantService } from './service/tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  // @Post()
  // async create(@Body() createTenantDto: CreateTenantDto) {
  //   return this.tenantService.create(createTenantDto);
  // }

  @Get()
  async findAll() {
    return this.tenantService.findAll();
  }
}
