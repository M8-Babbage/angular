import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public price: number = 0;

  ngOnInit(): void {
    console.log('OnInit Hijo Component')
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges Hijo Component')
  }
  ngOnDestroy(): void {
    console.log('OnDestroy Hijo Component')
  }

}
