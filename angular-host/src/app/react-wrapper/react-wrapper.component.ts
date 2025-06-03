import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, ElementRef, ViewChild } from '@angular/core';
import React from 'react';
import ReactDOM from 'react-dom/client';

@Component({
  selector: 'app-react-wrapper',
  imports: [],
  templateUrl: './react-wrapper.component.html',
  styleUrl: './react-wrapper.component.scss',
})
export class ReactWrapperComponent {
  private root: ReactDOM.Root | null = null;
  @ViewChild('reactContainer', { static: true }) reactContainer!: ElementRef;

  constructor() {}

  async ngOnInit() {
    const { default: ReactApp } = await loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      exposedModule: './ReactApp',
    });

    const container = this.reactContainer.nativeElement;
    if (container) {
      this.root = ReactDOM.createRoot(container);
      this.root.render(React.createElement(ReactApp));
    }
  }

  ngOnDestroy() {
    this.root?.unmount();
  }
}
