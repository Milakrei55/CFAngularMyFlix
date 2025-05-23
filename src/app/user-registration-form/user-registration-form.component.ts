import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({     //  decorator tells Angular that the class (below) is a component, contains instructions for wiring up the class with its stylesheet and template file
  selector: 'app-user-registration-form',    // selector property defines the custom HTML element, into which this component will render
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

/**
 * Component for user registration form.
 */

export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };  // the decorator defines the component’s input.

  constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
      public snackBar: MatSnackBar) { }

  ngOnInit(): void {        // method is called once the component has received all its inputs from the the calling component - real-life user
  }

  
  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (result: any) => {
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open('Registered successful!', 'OK', {
          duration: 2000
        });        
      }, 
      error: (error) => {
        console.error('Registration error:', error);
        this.snackBar.open(error, 'OK', {
          duration: 2000
        });
      }
    });
  }
}