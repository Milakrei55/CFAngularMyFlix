import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // You'll use this import to close the dialog on success
import { FetchApiDataService } from '../fetch-api-data.service'; // This import brings in the API calls we created in 6.2
import { MatSnackBar } from '@angular/material/snack-bar'; // This import is used to display notifications back to the user
import { Router } from '@angular/router';


@Component({     //  decorator tells Angular that the class (below) is a component, contains instructions for wiring up the class with its stylesheet and template file
  selector: 'app-user-login-form',    // selector property defines the custom HTML element, into which this component will render
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
/**
 * Component for user login form.
 */

export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };  // the decorator defines the component’s input.

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,      
    public snackBar: MatSnackBar,
    private router: Router,
  ) { }      

  ngOnInit(): void {        // method is called once the component has received all its inputs from the the calling component - real-life user
  }

  // This is the function responsible for sending the form inputs to the backend
  userLogin(): void {    
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result: any) => {

        // The route points to the MovieCardComponent
        this.router.navigate(['movies']);

        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open('Logged in successfully!', 'OK', {
          duration: 2000
        });
        // saving the user and token separately in localStorage
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
      }, 
      error: (error: any) => {
        this.snackBar.open(error, 'OK', {
          duration: 2000
        });
      }
    });
  }
}