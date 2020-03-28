import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EquipmentService } from 'src/app/services/equipment.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-equipment-form',
  templateUrl: './equipment-form.component.html',
  styleUrls: ['./equipment-form.component.css']
})
export class EquipmentFormComponent implements OnInit {

  equipmentForm: FormGroup;
  isSubmitted = false;
  message: String;
  list;
  id: number;
  editMode = false;
  isError;

  constructor(private equipmentService: EquipmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      });       
      
  }

  private initForm() {
    if (this.editMode) {
      this.equipmentService.onGetEquipmentById(this.id).subscribe(data => {
        this.equipmentForm.setValue({
          equipmentName: data.equipmentName,
          amount: data.amount,
          imageUrl: data.imageUrl,
          description: data.description
        });
      });
    }
    this.equipmentForm = new FormGroup({
      'equipmentName': new FormControl(null, Validators.required),
      'amount': new FormControl(null, Validators.required),
      'imageUrl': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required)
    });
  }

  onAddEquipment() {
    this.equipmentService.onAddEquipmentService(this.equipmentForm).subscribe(data => {
      this.isError = false;
      this.message = "Successfully Added";      
      this.equipmentService.onGetAllEquipmentService().subscribe(data => {
        this.list = data;
        this.equipmentService.equipmentChange.next(this.list);
      });
      this.equipmentForm.reset(); 
      this.onClose();
    },
      err => {
        this.message = err.error.message;
        this.isError = true;
      });
  }

  onUpdateEquipment() {
    console.log("work");
    this.equipmentService.onUpdateEquipmentService(this.equipmentForm, this.id).subscribe(data => {
      this.message = "Successfully Updated";
      this.equipmentService.onGetAllEquipmentService().subscribe(data => {
        this.list = data;
        this.equipmentService.equipmentChange.next(this.list);
      });
    },
    err=>{
      this.message = err.error.message;
    });
    this.equipmentForm.reset();
    this.onClose();
  }

  onClose() {
    this.router.navigate(['vehicle/equipments']);
  }


  onClearForm() {
    this.equipmentForm.reset();
  }
}
