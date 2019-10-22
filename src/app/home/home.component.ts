import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../login.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {HomeService} from './home.service';

export interface DialogData {
  counter: string;
  nextCounter: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  counter = '0';
  nextCounter: string;

  constructor(private router: Router,
              public dialog: MatDialog,
              private homeService: HomeService,
              private loginService: LoginService) { }

  ngOnInit() {
     this.updateNextCounter();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(HomeDialogComponent, {
      width: '250px',
      data: { counter: this.counter, nextCounter: this.nextCounter}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.counter != result) {
        this.counter = result;
        this.updateNextCounter();
      }
      console.log('The dialog was closed');
    });
  }

  updateNextCounter() {
    this.homeService.nextCounter(this.counter).subscribe( data => {
      console.log(data);
      this.nextCounter = data;
    });
  }

  logout() {
    console.log('logout');
    this.loginService.logout();
    this.router.navigate(['login']);
  }
}


@Component({
  selector: 'app-dialog',
  templateUrl: 'home-dialog.html',
})
export class HomeDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<HomeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onCancel(): void {
    this.dialogRef.close(this.data.counter);
  }
  onConfirm(): void {
    this.dialogRef.close(this.data.nextCounter);
  }
}
