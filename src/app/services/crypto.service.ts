import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Crypto } from '../interfaces/crypto';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(
    private http: HttpClient
  ) { }

  async getCryptos():Promise<Crypto[]>{
    const cryptos:Crypto[] = await this.http.get<Crypto[]>('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false').toPromise()
    return cryptos;    
  }
}
