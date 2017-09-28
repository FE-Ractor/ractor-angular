import { NgModule, ModuleWithProviders } from "@angular/core"
import { Store, system } from "ractor"

export function _storeFactory(store: Store<any>) {
  system.actorOf(store, "__store__")
  return store
}

export type StoreService = {
  new(): Store<any>
  name: string
}

@NgModule({})
export class StoreModule {
  static provideStore(...stores: Array<StoreService>): ModuleWithProviders {
    const providers = stores.map(store => {
      return [
        { provide: store, useFactory: _storeFactory, deps: [store.name] },
        { provide: store.name, useValue: new store }
      ]
    })
    return {
      ngModule: StoreModule,
      providers: providers
    }
  }
}
