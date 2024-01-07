import { Injectable } from '@nestjs/common';

@Injectable()
export class VirtualTourService {
  getHello(): string {
    return 'Hello World!';
  }

  logInformations(informations: string) {
    console.log(informations);
  }
}
