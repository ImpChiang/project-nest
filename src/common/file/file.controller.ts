import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";

@Controller('file')
export class fileController{
  constructor() {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file,'upload--------------file')
    return {
      code: 200,
      data: file,
      msg: 'Success'
    }
  }
}
