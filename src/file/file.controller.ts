
import { Controller, Get, Post, UseInterceptors, Res, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import * as path from "path";

interface FileParams {
  fileName : string;
}


@Controller('/api/file')
export class FileController {
  
  @Post("upload")
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
      destination: "./assets",
      filename: (req, file, cb) => {
        const extArray = file.mimetype.split("/");
        const extension = extArray[extArray.length-1];
        const newFilename = "Fileupload-"+Date.now()+"."+extension;
        cb(null, newFilename)
      }
    })
  }))
  async uploadFile() {
    return 'success';
  }

  @Get(':fileName')
  getFile(@Res() res: Response , @Param() file: FileParams) {
    res.sendFile(path.join(__dirname, "../../assets/" + file.fileName));
  }
}
