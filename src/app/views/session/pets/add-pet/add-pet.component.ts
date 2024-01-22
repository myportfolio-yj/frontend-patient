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
    this.validateAndSetControlValue('idSexo', event.value, this.myForm);
  }

  changeEspecie(event: any): void {
    this.validateAndSetControlValue('idEspecie', event.value, this.myForm);
    this.onSpeciesChange(event.name);
  }

  changeRaza(event: any): void {
    this.validateAndSetControlValue('idRaza', event.value, this.myForm);
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
      .postAddPetById(pet, '65a34a88a686cf3970887de1')
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
    this.validateAndSetControlValue('alergias', this.allergiesSelected, this.myForm);
  }

  validateVaccines(vaccineValue: string):void {
    const pos = this.vaccinesSelected.indexOf(vaccineValue);
    if(pos === -1){
      this.vaccinesSelected.push(vaccineValue);
    }else {
      this.vaccinesSelected.splice(pos, 1);
    }
    this.validateAndSetControlValue('vacunas', this.vaccinesSelected, this.myForm);
  }

  validateAndSetControlValue(controlName: string, controlValue: any, form: FormGroup): void {
    const controls = form.get(controlName);
    if (controls) {
      controls.setValue(controlValue);
    } else {
      console.error(`Control "${controlName}" no encontrado en el formulario.`);
    }
  }

}
