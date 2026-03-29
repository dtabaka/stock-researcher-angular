import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ContactRequest } from './contact.model';
import { ContactService } from './contact.service';

interface ContactForm {
  name: FormControl<string>;
  email: FormControl<string>;
  message: FormControl<string>;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JsonPipe,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contact = signal<ContactRequest>({
    name: '',
    email: '',
    message: ''
  });

  form: FormGroup<ContactForm>;

  constructor(
    private fb: FormBuilder,
    private service: ContactService
  ) {
    this.form = this.fb.group<ContactForm>({
      name: this.fb.control(this.contact().name, {
        validators: [Validators.required, Validators.minLength(2)],
        nonNullable: true
      }),
      email: this.fb.control(this.contact().email, {
        validators: [Validators.required, Validators.email],
        nonNullable: true
      }),
      message: this.fb.control(this.contact().message, {
        validators: [Validators.required, Validators.minLength(10)],
        nonNullable: true
      })
    });

    this.form.valueChanges.subscribe(value => {
      this.contact.update(() => ({
        name: value.name!,
        email: value.email!,
        message: value.message!
      }));
    });

  }

  ngOnInit() {
    this.service.getContact().subscribe(data => {
      this.contact.set(data);
      this.form.patchValue(data);
    });
  }

  submit() {
    if (this.form.invalid) return;

    const payload = this.contact();
    console.log('Submitting:', payload);

    this.service.submitContact(payload).subscribe(() => {
      console.log('Contact submitted successfully');
    });
  }
}
