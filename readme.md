# ractor-angular

## 安装

```shell
npm i ractor-angular
```

## 配置

```ts
@NgModule({
  imports: [
    BrowserModule,
    StoreModule.provideStore(AppStore)
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## 使用

```ts
export class AppComponent implements OnInit, OnDestroy {
  public value: number
  public unsubscribe: () => void

  constructor(public appStore: AppStore) { }

  public ngOnInit() {
    this.unsubscribe = this.appStore.subscribe(state => {
      this.value = state.value
    })
  }

  public ngOnDestroy() {
    this.unsubscribe()
  }

  public increment() {
    dispatch(new Increment)
  }

  public decrement() {
    dispatch(new Decrement)
  }
  ```