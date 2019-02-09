import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import * as FileSaver from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private client:HttpClient) { }  

  readText(textFilePath:string):Observable<any>{    
    return this.client.get(textFilePath, { responseType: 'text' });
  }

  saveText(lines:any[]){
    let delimetedLines = lines.map(line=> line+'\n');
    const blob = new Blob(delimetedLines, { type: 'text/plain' });
    FileSaver.saveAs(blob, 'output_user_story_1.txt');
  }

}
