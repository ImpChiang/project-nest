import { Module } from '@nestjs/common'
import { fileController } from "./file.controller";
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import dayjs = require('dayjs');
import * as nuid from 'nuid';
var path = require("path");
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: path.join(__dirname,`../../fileUpload/${dayjs().format('YYYY-MM-DD')}`),
        filename: (req, file, callback) => {
          const filename = `${nuid.next()}.${file.mimetype.split('/')[1]}`
          return callback(null,filename)
        }
      })
    })
  ],
  controllers: [fileController],
})

export class fileModule{}
