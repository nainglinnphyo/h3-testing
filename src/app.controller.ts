import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
// import {} from "h3-js";
import { latLngToCell, cellToBoundary, gridDisk, getHexagonEdgeLengthAvg, UNITS } from "h3-js"


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('h3')
  getHello(@Query('latLng') latLng: string) {
    const h3Index = latLngToCell(16.8190984, 96.1920635, 9);
    const data = gridDisk('88648c82a7fffff', 2)
    const length = getHexagonEdgeLengthAvg(7, UNITS.km)
    console.log(data);

    let res = []
    data.forEach(element => {
      const gg = this.indexToHexagon(element)
      res.push(gg)
    });

    // const data = splitLongToH3Index()

    return res;
  }

  @Get('index-to-hexagon')
  indexToHexagon(@Query('index') index: string) {
    const hex = cellToBoundary(index)
    return { latLng: hex, index: index };
  }

  //testing
  @Get('test1')
  async testOne() {
    console.log('process id ', process.pid)
    console.log(new Date())
    const result = await this.delayWithReturnValue(20000, "Delayed Result");
    console.log(new Date(), ' delayed finish')
    return result
  }

  @Get('test2')
  async testTwo() {
    console.log('process id ', process.pid)
    console.log(new Date(), ' form test 2')
    return 'result'
  }

  delayWithReturnValue(ms, value) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(value);
      }, ms);
    });
  }

  @Get('latLng-to-boundary')
  latLngToBoundary(@Query() data:{lat:string,lng:string}){
    return this.appService.latLngToBoundary(data.lat,data.lng);
  }

  @Get('latLng-to-near-by-boundary')
  latLngToNearByBoundary(@Query() data:{lat:string,lng:string}){
    return this.appService.latLngToNearByBoundary(data.lat,data.lng);
  }

}
