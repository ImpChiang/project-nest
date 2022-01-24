
import { Controller, Request, Post, Body, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { CommodityService } from './commodity.service';
import { RbacInterceptor } from '../../interceptor/rbac.interceptor'; // 引入 RBAC 拦截器
import { RbacGuard } from "../../guards/rbac.guard"; // 引入 RBAC 守卫
import { roleConstans as role } from '../auth/constants' // 引入角色常量

@Controller('commodity')
export class CommodityController {
  constructor(private readonly commodityService:CommodityService) {}
  // 查询商品列表 RbacGuard 要在 AuthGuard 的上面，不然获取不到用户信息
  @UseGuards(new RbacGuard(role.HUMAN))
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(new RbacInterceptor(role.HUMAN)) // 调用 RBAC 拦截器
  @Post('list')
  async queryColumnList(@Body() body:any) {
    return await this.commodityService.queryCommodityList(body)
  }
  //新建商品
  @UseGuards(new RbacGuard(role.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(new RbacInterceptor(role.DEVELOPER))
  @Post('create')
  async createCommodity(@Body() body: any, @Request() req:any) {
    return await this.commodityService.createCommodity(body,req.user.username)
  }
  //修改商品
  @UseGuards(new RbacGuard(role.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(new RbacInterceptor(role.DEVELOPER))
  @Post('update')
  async updateCommodity(@Body() body: any,@Request() req: any): Promise<any> {
    return await this.commodityService.updateCommodity(body,req.user.username)
  }
  // 删除商品
  @UseGuards(new RbacGuard(role.SUPER_ADMIN))
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(new RbacInterceptor(role.SUPER_ADMIN))
  @Post('delete')
  async deleteCommodity(@Body() body: any) {
    return await this.commodityService.deleteCommodity(body)
  }
}
