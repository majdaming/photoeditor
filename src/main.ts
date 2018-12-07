import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import {PhotoEditorModule} from "./app/photo-editor/photo-editor.module";

if (environment.production) {
  enableProdMode();
}


platformBrowserDynamic().bootstrapModule(PhotoEditorModule)
  .catch(err => console.log(err));

