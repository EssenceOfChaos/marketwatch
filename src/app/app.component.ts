import { Component, OnInit, isDevMode} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(){}
  title = 'marketwatch';
  ngOnInit() {
    if (isDevMode()) {
      console.log('👋 Running in Development! ');
    } else {
      console.log('💪 Running in Production! ');
    }
  }
}
