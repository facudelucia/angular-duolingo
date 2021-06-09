import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stage } from '../interfaces/stage.interface'
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getJSON(): Observable<Stage[]> {
    return this.http.get<Stage[]>('../assets/data.json')
  }
}
