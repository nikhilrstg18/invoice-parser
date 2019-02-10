import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'user-story1',
  templateUrl: './user-story1.component.html',
  styleUrls: ['./user-story1.component.css']
})
export class UserStory1Component implements OnInit {

  //@ states
  //===============================================================
  text: string;
  linesRead: string[];
  number: any[];
  parsedDigitsToLookup: any[];
  parsedInvoiceNumbers: any[];
  textFilePath:string;
  isParseCompleted:boolean;
  files:string[];
  validFile:number;

  //@ Constructor only for DI
  //===============================================================
  constructor(private dataService: DataService) { }

  //@ Life Cycle Hook
  //===============================================================
  // UserStory1Component Initialization
  ngOnInit() {
    this.setDefaults();
  }
 

  //@ Public Methods
  //===============================================================
  parseInvoicesHandler(){
    if(!this.isParseCompleted) this._parseInvoiceNumbers();

    //@ step 5 : test output on console
    // console.log(`Total Invoice parsed - ${this.parsedInvoiceNumbers.length}.`)
    // this.parsedInvoiceNumbers.forEach(invoice => {
    //   console.log(invoice);
    // });
  }

  generateTextFile(){
    this.dataService.saveText(this.parsedInvoiceNumbers);
  }

  setDefaults(){
    this.text = '';
    this.validFile = 0;
    this.linesRead = [];
    this.number = [];
    this.parsedDigitsToLookup = [];
    this.parsedInvoiceNumbers = [];
    this.isParseCompleted =false;
    this.files= [`assets/files/raw_invoices_from_old_system.txt`, `assets/files/raw_invoices_from_old_system-invalid.txt`]
    this.validFileHandler(this.validFile);
  }

  isValid(invoice:string){
    return invoice.indexOf('Invalid')>=0;
  }

  validFileHandler(value:number){
    this.textFilePath = this.files[value];
  }
 

  //@ Private methods
  //===============================================================

  private _parseInvoiceNumbers() {
    this.dataService.readText(this.textFilePath).subscribe(
      (text: string) => {
        //@ step 1 : full text file read - job done by DataService

        //@ step 2 : split line by line and remove empty line
        this.linesRead =
          text
            .split('\n')
            .filter(line => line != '');
        //@ step 3 : prepare digits for each invoice for lookup
        for (var lineNumber = 0; lineNumber < this.linesRead.length; lineNumber += 3) {
          this.parsedDigitsToLookup
            .push(
              this._parseDigitsForLookup(
                this.linesRead[lineNumber],
                this.linesRead[lineNumber + 1],
                this.linesRead[lineNumber + 2]
              )
            );
        }

        //@ step 4 : parse digits from lookupInvoice
        this.parsedDigitsToLookup.forEach((digitsInLine: string[]) => {
          let invoiceNumber: string = '';
          digitsInLine.forEach(digitToLookup => {
            invoiceNumber += this._getDigit(digitToLookup)
          });

          // test for valid invoice number after parsing
          // assuming valid invoice should have 9 digits
          if (invoiceNumber.length<9 || invoiceNumber.indexOf('?')>=0) {
            this.parsedInvoiceNumbers.push(`${invoiceNumber} - Invalid`);
          } else {
            this.parsedInvoiceNumbers.push(invoiceNumber);
          }
        });
        this.isParseCompleted = true;
                
      },
      err => console.log("Something unexpected error occured while reading text file", err)
    );
  }



  private _getDigit(parsedLookup: string) {
    var num: string;
    switch (parsedLookup) {
      case '     |  |':
        num = '1';
        break;
      case ' _  _||_ ':
        num = '2';
        break;
      case ' _  _| _|':
        num = '3';
        break;
      case '   |_|  |':
        num = '4';
        break;
      case ' _ |_  _|':
        num = '5';
        break;
      case ' _ |_ |_|':
        num = '6';
        break;
      case ' _   |  |':
        num = '7';
        break;
      case ' _ |_||_|':
        num = '8';
        break;
      case ' _ |_| _|':
        num = '9';
        break;
      case ' _ | ||_|':
        num = '0';
        break;
      default:
        num = '?';
        break;
    }
    return num;
  }

  // assuming each line to have character count = multiple of 3 
  private _parseDigitsForLookup(line1: string, line2: string, line3: string): string[] {
    let digits: string[] = [];
    for (var pos = 0; pos < line1.length; pos += 3) {
      digits.push(line1.substr(pos, 3) + line2.substr(pos, 3) + line3.substr(pos, 3))
    }
    return digits;
  }


}
