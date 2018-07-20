import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class MedicamentoProvider {
  private PATH = 'medicamento/';
  
   constructor(private db: AngularFireDatabase) {
   }
  
   getAll() {
     return this.db.list(this.PATH, ref => ref.orderByChild('name'))
       .snapshotChanges()
       .map(changes => {
         return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
       })
   }
  
   get(key: string) {
     return this.db.object(this.PATH + key).snapshotChanges()
       .map(c => {
         return { key: c.key, ...c.payload.val() };
       });
   }
  
   save(medicamento: any) {
     return new Promise((resolve, reject) => {
       if (medicamento.key) {
         this.db.list(this.PATH)
           .update(medicamento.key, { name: medicamento.name, dose: medicamento.dose,horario:medicamento.horario })
           .then(() => resolve())
           .catch((e) => reject(e));
       } else {
         this.db.list(this.PATH)
           .push({ name: medicamento.name, dose: medicamento.dose,horario:medicamento.horario })
           .then(() => resolve());
       }
     })
   }
  
   remove(key: string) {
     return this.db.list(this.PATH).remove(key);
   }

}
