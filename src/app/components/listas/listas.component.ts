import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Lista } from '../../model/lista.model';
import { DeseosService } from '../../services/deseos.service';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent  {

  @ViewChild(IonList) lista: IonList;
  @Input() terminada = true;

  constructor(
    private router: Router,
    public deseosService: DeseosService,
    public alertController: AlertController
  ) { }

  listaSeleccionda( lista: Lista ){
  
    if(this.terminada){
      const id = lista.id;
      this.router.navigate(['/tabs/tab2/agregar', id])
    }else{
      const id = lista.id;
      this.router.navigate(['/tabs/tab1/agregar', id])
    }


  }

  async editarTitulo(lista: Lista){
    const alert = await this.alertController.create({
        
      header: 'Editar titulo',
      inputs:[
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Edita el nombre de la lista'
        }
      ],
      buttons:[
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar');
          this.lista.closeSlidingItems();
        }
      },
      {
        text: 'Crear',
        handler: ( data ) => {
          console.log(data)
          if(data.titulo.length === 0){
            return;
          }
          lista.titulo = data.titulo;
          this.deseosService.guardarStorage();
          this.lista.closeSlidingItems();
        }
      }
    ]

    })

    alert.present();
  }


  borrarLista( lista: Lista ){
    this.deseosService.borrarLista(lista)
  }

    
}
