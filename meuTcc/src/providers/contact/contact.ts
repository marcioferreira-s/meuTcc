import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class ContactProvider {
  private PATH = 'contato/'
  constructor(private db : AngularFireDatabase) {
   

  }

  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('name'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }
  
  get(key:string){
    return this.db.object(this.PATH +key)
    .snapshotChanges()
    .map(c =>{
      return{key:c.key, ...c.payload.val()};
    })
  }

  save(contato: any) {
    return new Promise((resolve, reject) => {
      if (contato.key) {
        this.db.list(this.PATH)
          .update(contato.key, { name: contato.name, tel: contato.tel })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ name: contato.name, tel: contato.tel })
          .then(() => resolve());
      }
    })
  }


  remove(key:string){
    return this.db.list(this.PATH).remove(key);
  }
}
