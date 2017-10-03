import { Component, OnInit, OnDestroy } from "@angular/core"
import { AppStore } from "./app.store"
import { dispatch, Subscription } from "ractor"
import { Increment } from "./Increment"
import { Decrement } from "./Decrement"

@Component({
  selector: "app-root",
  template: `
		<p>
			Clicked: {{value}} times
			&nbsp;&nbsp;
			<button (click)="increment()">
				+
			</button>
			&nbsp;&nbsp;
			<button (click)="decrement()">
				-
			</button>
			&nbsp;&nbsp;
			<button (click)="incrementIfOdd(this)">
				Increment if odd
			</button>
			&nbsp;&nbsp;
			<button (click)="incrementAsync()">
				Increment async
			</button>
		</p>
    `
})
export class AppComponent implements OnInit, OnDestroy {
  public value: number
  public subscription: Subscription

  constructor(public appStore: AppStore) { }

  public ngOnInit() {
    this.subscription = this.appStore.subscribe(state => {
      this.value = state.value
    })
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  public increment() {
    dispatch(new Increment)
  }

  public decrement() {
    dispatch(new Decrement)
  }

  public incrementIfOdd() {
    if (this.value % 2 === 1) {
      dispatch(new Increment)
    }
  }

  public incrementAsync() {
    setTimeout(() => dispatch(new Increment), 1000)
  }
}
