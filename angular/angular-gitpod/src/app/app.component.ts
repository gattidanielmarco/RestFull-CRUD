
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Unit } from './unit.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  obsUnit: Observable<Unit[]>; //L’observable che sta in attesa dei dati
  data: Unit[];
  postObserver : Observable<Object>;
  postData : Object;
  constructor(private http: HttpClient) { } //Dependency injection
  getUnitList(): void {
    //Qui va sostituito l’url con quello delle vostre api
    this.obsUnit = this.http.get<Unit[]>('https://3000-e7cb9e93-198e-4371-8fe7-faefb7130778.ws-eu01.gitpod.io/users');
    //Mi sottoscrivo all’observable e scrivo la arrow function che riceve i dati
    console.log(this.obsUnit.subscribe((data: Unit[]) => {this.data = data;}));
  }
  addUnit(newUnit: HTMLInputElement, newCost: HTMLInputElement, newHitSpeed: HTMLInputElement,newSpeed: HTMLInputElement,newDeployTime: HTMLInputElement,newRange: HTMLInputElement,newTarget: HTMLInputElement,newCount: HTMLInputElement,newTransport: HTMLInputElement,newType: HTMLInputElement,newRarity: HTMLInputElement): boolean {
    let newData: Unit = new Unit();
    newData.Unit = newUnit.value;
    newData.Cost = newCost.value;
    newData.Hit_Speed = newHitSpeed.value;
    newData.Speed=newSpeed.value;
    newData.Deploy_Time=newDeployTime.value;
    newData.Range=newRange.value;
    newData.Target=newTarget.value;
    newData.Count=newCount.value;
    newData.Transport=newTransport.value;
    newData.Type=newType.value;
    newData.Rarity=newRarity.value;
    let headers =  {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    this.postObserver = this.http.post('https://3000-e7cb9e93-198e-4371-8fe7-faefb7130778.ws-eu01.gitpod.io/users/', JSON.stringify(newData),headers)
    return false;
  }
}
