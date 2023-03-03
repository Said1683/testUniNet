import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  contactForm!: FormGroup;

  constructor(
    private readonly formbuild: FormBuilder,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.contactForm = this.initForm();
  }
  //Mostramos los datos en consola y formateamos entradas
  onSubmit(): void {
    console.log('Datos del formulario: ', this.contactForm.value);
    this.contactForm.reset();
    this.toastr.success(' Revise la consola','Formulario enviado exitosamente');
    
  }
  //Formulario reactivo con validaciones
  initForm(): FormGroup {
    return this.formbuild.group({
      Nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i)]],
      Apellido: ['', [Validators.required, Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i)]],
      FechaNacimiento: ['', [Validators.required, this.ageValidator(18)]],
    })
  }
  //validador personalizado, verifica que sea mayor de edad 
  ageValidator = (minAge: number): ValidatorFn => control =>
  moment().diff(moment(control.value), 'years') < 18  
  ? { age: { minAge } } 
    : null;
}
