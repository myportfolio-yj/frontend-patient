import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Option } from './../../../../shared/components/select/option.interface';
import { PetService } from 'src/app/services/pet.service';
import { Raza } from 'src/app/interfaces/species-response.interface';
import { TypographyAlign } from 'src/app/shared/components/typography/typography.enum';
import { PetRequest } from 'src/app/interfaces/pet-request.interface';
import { VaccinesForm } from 'src/app/interfaces/vaccines-form.interface';
import { LOCAL_STORAGE } from 'src/app/utils/constants';
import { DataService } from 'src/app/services/data.service';

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
  listVaccines: VaccinesForm[] = [];

  allergiesSelected: string[] = [];
  //vaccinesSelected: string[] = [];
  idClient = ''

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private petService: PetService,
    private dataService: DataService
  ) {
    this.allergiesSelected = [];
    //this.vaccinesSelected = [];
    this.myForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      idSexo: ['', Validators.required],
      idEspecie: ['', Validators.required],
      idRaza: ['', Validators.required],
      esterilizado: [false, Validators.required],
      alergias: [[]],
      vacunas: this.formBuilder.array([]),
      foto: [''],
      clientes: this.formBuilder.array([])
    });

    this.idClient = localStorage.getItem(LOCAL_STORAGE.USER) || '';
  }

  get TypographyAlign(): typeof TypographyAlign {
    return TypographyAlign
  }

  get listFechaVacuna() : FormArray  {
    return this.myForm.get('vacunas') as FormArray;
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
      console.log('this.itemBreeds',this.itemBreeds)
    });

    const clientArray = this.myForm.get('clientes') as FormArray;
    clientArray.push(this.formBuilder.control(this.idClient));
  }

  goBack(): void {
    this.location.back();
  }

  addPet() {
    if (this.myForm.valid) {
      // Realizar el registro si el formulario es válido
      const formData = this.myForm.value;
      console.log(JSON.stringify(formData));
      this.postAddPetById(formData);
    } else {
      this.dataService.setAlert({ showAlert: true, message: 'Complete todos los campos' })
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
    console.log(event.value)
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
        const newItems: VaccinesForm[] = data.map((document) => ({
          name: document.vacuna,
          value: document.id,
          selected: false,
          date: ''
        }));
        this.listVaccines = newItems;
        console.log(this.listVaccines)
      }).catch(err => {
        console.log(err);
      });
  }

  postAddPetById(pet: PetRequest): void {
    this.dataService.setLoading(true);
    this.petService
      .postAddPetById(pet)
      .then((data) => {
        this.dataService.setLoading(false);
        this.dataService.setAlert({ showAlert: true, message: 'Se agregó la mascota' })
        console.log(data);
        this.clearForm();
      }).catch(err => {
        console.log(err);
        this.dataService.setLoading(false);
      });
  }

  onSpeciesChange(species: string): void {
    this.petService.setSelectedSpecies(species);
  }

  validateAllergies(allergyValue: string): void {
    const pos = this.allergiesSelected.indexOf(allergyValue);
    if (pos === -1) {
      this.allergiesSelected.push(allergyValue);
    } else {
      this.allergiesSelected.splice(pos, 1);
    }
    this.validateAndSetControlValue('alergias', this.allergiesSelected, this.myForm);
  }

  validateVaccines(vaccine: VaccinesForm): void {
    vaccine.selected = !vaccine.selected;
    console.log('vaccine', vaccine);
    this.selectVaccine(vaccine.value);
  }

  selectVaccine(idVacuna: string): void {
    const vacunasArray = this.myForm.get('vacunas') as FormArray;
    const existingVaccineIndex = vacunasArray.controls.findIndex(
      (control) => control.get('idVacuna')?.value === idVacuna
    );

    console.log('existingVaccineIndex', existingVaccineIndex);
    if (existingVaccineIndex !== -1) {
      // Si la vacuna ya está en la lista, eliminarla
      vacunasArray.removeAt(existingVaccineIndex);
    } else {
      // Si la vacuna no está en la lista, agregar un nuevo FormGroup vacío
      vacunasArray.push(this.formBuilder.group({
        idVacuna: [idVacuna, Validators.required],
        fecha: ['', [Validators.required, Validators.minLength(10)]]
      }));
    }
  }

  getNameVacune(idVacuna: string): string {
    const vacine: VaccinesForm | undefined = this.listVaccines.find((x) => x.value === idVacuna);
    if (vacine) {
      return vacine.name
    }
    return '';
  }

  isListFechaVacunaNotEmpty(): boolean {
    return this.listFechaVacuna.controls.length > 0;
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
