import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class InfoProvider {
private PATH = 'info/';

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
 
  save(info: any) {
    return new Promise((resolve, reject) => {
      if (info.key) {
        this.db.list(this.PATH)
          .update(info.key, {
            name: info.name, 
            rua: info.rua,
            municipio: info.municipio,
            numero: info.numero,
            telefone:info.telefone,
            rg:info.rg,
            doencas:info.doencas
            
           })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ name: info.name, 
            rua: info.rua,
            municipio: info.municipio,
            numero: info.numero,
            telefone:info.telefone,
            rg:info.rg,
            doencas:info.doencas })
          .then(() => resolve());
      }
    })
  }
 
  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

}




