import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    trigger('selected', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(2000)
      ])
    ])

  ]
})
export class ContactComponent implements OnInit {

  form: FormGroup;

  constructor() { }

  ngOnInit(): void {

    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.minLength(2), Validators.maxLength(20), Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      textarea: new FormControl('', [Validators.minLength(10), Validators.maxLength(200), Validators.required])
    });
  }

  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('gmail1', 'lior_shmerling_website', e.target as HTMLFormElement, 'user_XBFtu8NrVM6bYRsMdNuSE')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    this.form.reset();
  }

}
