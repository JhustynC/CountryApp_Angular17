import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime, delay } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {

  //* Subject es un tipo especial de observable
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @ViewChild
  ('txtInput') textInput!: ElementRef<HTMLInputElement>;

  //! OJO tambien se puede hacer de otra forma para obtener el valor de input
  //! Seria de enviar directamente desde el html el valor de la caja de texto
  //! Y ya no tendriamos que crear el ViewChild, quedaria asi en el html
  //? (keyup.enter)="emitText(txtInput.value)"
  //? #txtInput>

  @Input()
  placeholderText: string = '';

  @Input()
  initialValue: string = '';

  @Output()
  public searchText: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();


  //* Implementacion de debounce
  ngOnInit(){
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(400)
    )
    .subscribe(value => {
      this.onDebounce.emit(value);
    })
  }

  //* Siempre que hacemos un subscribe de un observable que no sea de httpModule, hay que
  //* hacer la desubscripcion
  ngOnDetroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  emitText(): void{
    const text = this.textInput.nativeElement.value;
    this.searchText.emit(text);
  }

  onKeyPress(seachTerm: string){
    this.debouncer.next(seachTerm);
  }

}
