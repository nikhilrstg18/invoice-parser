import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //@ states
  //===============================================================
  title:string ='soPOC';
  marcoPoloCheetSheet:string=null;
  code:string = `
    private _marcoPolo() {
      var cheetSheet = '';
      for (var i = 1; i <= 100; i++) {
        cheetSheet += this._testSequence(i)}+',';
      }
      cheetSheet = cheetSheet.substring(0, cheetSheet.length - 2);
    }
    
    private _testSequence(num) {
      if (num % 4==0 && num % 7 ==0) {
        return 'marcopolo';
      }
      if (num % 4 == 0) {
        return 'marco';
      }
      if (num % 7 == 0) {
        return 'polo';
      }
      return String(num);
    }`;

  //@ Public Methods
  //===============================================================
  marcoPoloHandler(){
    this._marcoPolo();
  }

  setDefaults(){
    this.marcoPoloCheetSheet= '';
  }

  //@ Private Methods
  //===============================================================
  private _marcoPolo() {
    var cheetSheet = '';
    for (var i = 1; i <= 100; i++) {
      cheetSheet += `${this._testSequence(i)},`;
    }
    this.marcoPoloCheetSheet = cheetSheet.substring(0, cheetSheet.length - 1);
    console.log(cheetSheet);
  }
  
  private _testSequence(num) {
    if (num % 4==0 && num % 7 ==0) {
      return 'marcopolo';
    }
    if (num % 4 == 0) {
      return 'marco';
    }
    if (num % 7 == 0) {
      return 'polo';
    }
    return String(num);
  }



  
}
