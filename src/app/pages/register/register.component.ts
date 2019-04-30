import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';
import {VenderService} from "../../services/vender.services";
import {Router} from "@angular/router";

@Component({
  selector: 'register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {

  public form:FormGroup;
  public fname:AbstractControl;
  public lname:AbstractControl;
  public email:AbstractControl;
  public phone:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;

  public submitted:boolean = false;

  constructor(fb:FormBuilder,private _venderService: VenderService, protected router:Router) {

    this.form = fb.group({
      'fname': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'lname': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'phone': ['', Validators.compose([Validators.required])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.fname = this.form.controls['fname'];
    this.lname = this.form.controls['lname'];
    this.email = this.form.controls['email'];
    this.phone = this.form.controls['phone'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      let data = {
        "first_name": values['fname'],
        "last_name": values['lname'],
        "email": values['email'],
        "password":values['passwords']['password'],
        "phone": values['phone']
      };
      this._venderService.signup(data)
        .subscribe(res=>
          {
            if(res.success)
            {
              localStorage.setItem('user_token', res.token);
              this.router.navigate(['pages/subscription/addsubscription']);
            }
          }
        )
    }
  }
}
