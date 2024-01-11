import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Option } from './../../../../shared/components/select/option.interface';
import { PetService } from 'src/app/services/pet.service';
import { Raza } from 'src/app/interfaces/species-response.interface';
import { TypographyAlign } from 'src/app/shared/components/typography/typography.enum';
import { PetRequest } from 'src/app/interfaces/pet-request.interface';

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
  listAllergies: Option[] = [];
  listVaccines: Option[] = [];
  
  allergiesSelected: string[] = [];
  vaccinesSelected: string[] = [];

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private petService: PetService
  ) {
    this.allergiesSelected = [];
    this.vaccinesSelected = [];
    this.myForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      idSexo: ['', Validators.required],
      idEspecie: ['', Validators.required],
      idRaza: ['', Validators.required],
      esterilizado: [false, Validators.required],
      alergias: [[]],
      vacunas: [[]],
      foto: ['']
    });
  }

  get TypographyAlign(): typeof TypographyAlign {
    return TypographyAlign
  }

  ngOnInit(): void {
    this.getSexo();
    this.getSpecies();
    this.getAllergies();
    this.getVaccines();
    
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
      //this.postAddPetById(formData);
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

  getAllergies(): void {
    this.petService
      .getAllergies()
      .then((data) => {
        const newItems: Option[] = data.map((document) => ({
          name: document.alergia,
          value: document.id
        }));
        this.listAllergies = newItems;
      }).catch(err => {
        console.log(err);
      });
  }

  getVaccines(): void {
    this.petService
      .getVaccines()
      .then((data) => {
        const newItems: Option[] = data.map((document) => ({
          name: document.vacuna,
          value: document.id
        }));
        this.listVaccines = newItems;
      }).catch(err => {
        console.log(err);
      });
  }

  postAddPetById(pet: PetRequest): void {
    this.petService
      .postAddPetById(pet, '658482da6767c41116497027')
      .then((data) => {
        console.log(data);
        this.clearForm();
      }).catch(err => {
        console.log(err);
      });
  }

  onSpeciesChange(species: string): void {
    this.petService.setSelectedSpecies(species);
  }

  validateAllergies(allergyValue: string):void {
    const pos = this.allergiesSelected.indexOf(allergyValue);
    if(pos === -1){
      this.allergiesSelected.push(allergyValue);
    }else {
      this.allergiesSelected.splice(pos, 1);
    }

    const controls = this.myForm.get('alergias');
    if (controls) {
      controls.setValue(this.allergiesSelected);
    }
  }

  validateVaccines(vaccineValue: string):void {
    const pos = this.vaccinesSelected.indexOf(vaccineValue);
    if(pos === -1){
      this.vaccinesSelected.push(vaccineValue);
    }else {
      this.vaccinesSelected.splice(pos, 1);
    }

    const controls = this.myForm.get('vacunas');
    if (controls) {
      controls.setValue(this.vaccinesSelected);
    }
  }

}
