import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import {
  WebComponentWrapper,
  WebComponentWrapperOptions,
} from '@angular-architects/module-federation-tools';
import { ReactWrapperComponent } from './react-wrapper/react-wrapper.component';

export const routes: Routes = [
  {
    path: 'angularremote',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './Component',
      }).then((m) => m.AppComponent),
  },
  {
    path: 'reactapp',
    component: ReactWrapperComponent,
    // loadChildren: () =>
    //   loadRemoteModule({
    //     type: 'module',
    //     remoteEntry: 'http://localhost:4202/remoteEntry.js',
    //     exposedModule: './ReactApp',
    //   }).then((m) => m.ReactApp),
  },
  //   {
  //     path: 'reactapp',
  //     component: WebComponentWrapper,
  //     data: {
  //       remoteEntry: 'http://localhost:4202/remoteEntry.js',
  //       remoteName: 'reactapp',
  //       exposedModule: './ReactApp',
  //       elementName: 'react-element',
  //     } as WebComponentWrapperOptions,
  //   },
];
