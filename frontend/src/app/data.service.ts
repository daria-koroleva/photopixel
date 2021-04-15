import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class DataService{

  private messageSource = new BehaviorSubject<string>('Change this latter');
  currentMessage = this.messageSource.asObservable();

  constructor(){  }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

}
