import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input('cname') componantName: string;
  constructor() { }

  ngOnInit() {
    
    
    console.log("cname", this.componantName)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    
    
  }

}
