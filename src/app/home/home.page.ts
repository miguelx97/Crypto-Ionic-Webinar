import { Component } from '@angular/core';
import { Crypto } from '../interfaces/crypto';
import { CryptoService } from '../services/crypto.service';
import { Browser } from '@capacitor/browser';
import { Share } from '@capacitor/share';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private cryptoSvc:CryptoService
    , private toastController: ToastController
  ) {}

  cryptos:Crypto[];

  async ionViewWillEnter(){
    this.cryptos = await this.cryptoSvc.getCryptos();
    console.log(this.cryptos);    
  }

  roundedNumber = (number:number) => Math.round(number * 1000) / 1000;  

  async moreInfo(coinId:string){
    //https://capacitorjs.com/docs/apis/browser
    await Browser.open({ url: 'https://coinmarketcap.com/es/currencies/'+ coinId});
  }

  async shareCoin(crypto:Crypto){
    // https://capacitorjs.com/docs/apis/share
    try{
      await Share.share({
        title: crypto.name,
        text: `${crypto.name} ahora cuesta ${crypto.current_price}€. Ha tenido una variación de ${crypto.price_change_24h} €`,
        url: 'https://coinmarketcap.com/es/currencies/'+ crypto.id,
      });

      this.message( `Abre la aplicación para compartir ${crypto.name}`);
    }
    catch(e){
      this.message( `Abre la aplicación para compartir ${crypto.name}`);
    }
  }
  
  async message(message:string){
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
