// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from 'nativescript-angular/platform';

// Importtaa sosiaalisen median alustat ensimmäisen importin jälkeen
import { configureOAuthProviders } from './app/auth-providers';

import { AppModule } from './app/app.module';

// Aja sosiaalisen median alustat ennen viimeistä ajoa
configureOAuthProviders();

platformNativeScriptDynamic({ createFrameOnBootstrap: true }).bootstrapModule(AppModule);
