import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  readonly isLoadingStream = new Subject<boolean>()

  constructor() {}

  setIsLoading (value: boolean) {
    this.isLoadingStream.next(value)
  }

  getIsLoadingStream () {
    return this.isLoadingStream
  }
}
