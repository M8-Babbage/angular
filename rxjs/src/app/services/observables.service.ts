import { Observable } from 'rxjs';
export class ObservablesService {
  public getObservable(): Observable<string> {
    // Subscriber: lógica del observable "emisiones, errores, completado"
    return new Observable<string>((subscriber) => {
      subscriber.next('Observable creado desde el servicio');
      subscriber.complete();
    });
  }
}
