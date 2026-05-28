import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  userData !: FormGroup;
  editMode = false;

  username = new FormControl('Lokesh Banda');
  email = new FormControl('lokesh@example.com');
  mobile = new FormControl('1234567890');

  constructor(
    
  ) {}

  ngOnInit() {
    this.userData = new FormGroup({
      username: new FormControl(this.username.value, Validators.required),
      email: new FormControl(this.email.value, [Validators.required, Validators.email]),
      mobile: new FormControl(this.mobile.value, [Validators.required, Validators.pattern('^[0-9]{10}$')])  
    });
  }


  
  toggleEditMode() {
    this.editMode = !this.editMode;
    console.log('userData', this.userData.value);
    if (!this.editMode) {
      this.username.setValue(this.userData.value.username);
      this.email.setValue(this.userData.value.email);
      this.mobile.setValue(this.userData.value.mobile); 
    }
  }
}
