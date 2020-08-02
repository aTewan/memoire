import { Controller, Get, Req, Query, HttpService, Param } from '@nestjs/common';
import { Request } from 'express'

@Controller('deezer')
export class DeezerController {
  constructor(private httpService: HttpService) {}

  @Get('/search/album')
  async getSearchAlbum(@Req() req: Request, @Query('q') q) {
    const url = "https://api.deezer.com/search/album?q=" + q;
    const res = await this.httpService.get(url).toPromise();
    return res.data
  }

  @Get('/album/:id')
  async getAlbum(@Param('id') id: string) {
    const url = `https://api.deezer.com/album/${id}`;
    const res = await this.httpService.get(url).toPromise();
    return { data: res.data }
  }

  @Get('/genre')
  async getGenre(@Req() req: Request, @Query('q') q) {
    const url = "https://api.deezer.com/genre?q=" + q;
    const res = await this.httpService.get(url).toPromise();
    return { data: res.data }
  }
}
