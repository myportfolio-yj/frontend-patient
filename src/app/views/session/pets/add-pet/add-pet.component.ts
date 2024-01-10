import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Option } from './../../../../shared/components/select/option.interface';
import { PetService } from 'src/app/services/pet.service';
import { Raza } from 'src/app/interfaces/species-response.interface';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss']
})
export class AddPetComponent implements OnInit {

  myForm!: FormGroup;

  listSex: Option[] = [];
  listSpecies: Option[] = [];
  listBreed: Option[] = [];
  itemBreeds: Raza[] = [];

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private petService: PetService
  ) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      idSexo: ['', Validators.required],
      idEspecie: ['', Validators.required],
      idRaza: ['', Validators.required],
      //esterilizado: [false, Validators.required],
      //alergias: ['', Validators.required],
      //vacunas: ['', Validators.required],
      //foto: ['', Validators.required]
    });

    this.getSexo();
    this.getSpecies();
    this.petService.selectedSpecies$.subscribe((species) => {
      this.itemBreeds = this.petService.getBreedsBySpecies(species);
      const newItems: Option[] = this.itemBreeds.map((document) => ({
        name: document.raza,
        value: document.id
      }));
      this.listBreed = newItems;
    });
  }

  goBack(): void {
    this.location.back();
  }

  addPet() {
    if (this.myForm.valid) {
      // Realizar el registro si el formulario es válido
      const formData = this.myForm.value;
      //this.postRegister(formData);
      console.log(formData);
    } else {
      console.log('Formulario inválido. Por favor, complete todos los campos requeridos.');
    }
  }

  clearForm(): void {
    this.myForm.reset();
  }

  changeSexo(event: any): void {
    const nombresControl = this.myForm.get('idSexo');
    if (nombresControl) {
      nombresControl.setValue(event.value);
    } else {
      console.error('Control "nombres" no encontrado en el formulario.');
    }
  }

  changeEspecie(event: any): void {
    const nombresControl = this.myForm.get('idEspecie');
    if (nombresControl) {
      nombresControl.setValue(event.value);
      this.onSpeciesChange(event.name);
    } else {
      console.error('Control "nombres" no encontrado en el formulario.');
    }
  }

  changeRaza(event: any): void {
    const nombresControl = this.myForm.get('idRaza');
    if (nombresControl) {
      nombresControl.setValue(event.value);
    } else {
      console.error('Control "nombres" no encontrado en el formulario.');
    }
  }

  getSexo(): void {
    this.petService
      .getSex()
      .then((data) => {
        const newItems: Option[] = data.map((document) => ({
          name: document.sexo,
          value: document.id
        }));
        this.listSex = newItems;
      }).catch(err => {
        console.log(err);
      });
  }

  getSpecies(): void {
    this.petService
      .getSpecies()
      .then((data) => {
        const newItems: Option[] = data.map((document) => ({
          name: document.especie,
          value: document.id
        }));
        this.listSpecies = newItems;
      }).catch(err => {
        console.log(err);
      });
  }

  onSpeciesChange(species: string): void {
    this.petService.setSelectedSpecies(species);
  }

}
