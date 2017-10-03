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

export function mapStoreToProvider(store: StoreService) {
  return [
    { provide: store, useFactory: _storeFactory, deps: [store.name] },
    { provide: store.name, useValue: new store }
  ]
}

// 这个函数不放到外面会出错：encountered resolving symbol values statically.
export function provideStore(...stores: Array<StoreService>): ModuleWithProviders {
  const providers = stores.map(mapStoreToProvider)
  return {
    ngModule: StoreModule,
    providers
  }
}

@NgModule({})
export class StoreModule { }
