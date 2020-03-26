import { Output, EventEmitter } from '@angular/core';

export class ParentComponent {
  @Output() updateAllEmit = new EventEmitter<any>();
  @Output() scrollViewToPanelEmit = new EventEmitter<any>();

  public updateAll() {
    this.updateAllEmit.emit();
  }

  public scrollViewToPanel(panelName: string) {
    this.scrollViewToPanelEmit.emit(panelName);
  }
}
