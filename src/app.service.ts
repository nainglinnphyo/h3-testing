import { Injectable } from '@nestjs/common';
import { latLngToCell, cellToBoundary, gridDisk, getHexagonEdgeLengthAvg, UNITS, gridDiskDistances } from "h3-js"

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }


   latLngToBoundary(lat: string, lng: string){
    const latData = parseInt(lat)
    const lngData = parseInt(lng)

    const h3Index = latLngToCell(latData,lngData,7)
    const hexBoundary = cellToBoundary(h3Index)
    return hexBoundary
  }

  latLngToNearByBoundary(lat:string,lng:string){
    const latData = parseInt(lat)
    const lngData = parseInt(lng)

    const h3Index = latLngToCell(latData,lngData,7)
    console.log('h3',h3Index)
    const disk = gridDisk(h3Index,1)
    console.log(disk)
    let data = []
    for (let index = 0; index < disk.length; index++) {
      const res = this.indexToHexagon(disk[index])
      data.push(res)
    }
    return data
   
  }
  indexToHexagon(index:string){
      const hex = cellToBoundary(index)
      return {latLng:hex,index:index}
  }
}
