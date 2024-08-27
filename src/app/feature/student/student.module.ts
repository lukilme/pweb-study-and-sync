import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeStudentComponent } from './components/home-student/home-student.component';
import { MaterialModule } from '../../core/material/material.module';
import { InviteDisciplineFormComponent } from './components/invite-discipline-form/invite-discipline-form.component';
import { DisciplineModule } from '../discipline/discipline.module';
import { ListStudentComponent } from './components/list-student/list-student.component';
import { StudentCardComponent } from './components/student-card/student-card.component';
import { MatCardContent, MatCardActions, MatCardSubtitle, MatCard } from '@angular/material/card';
import { DisciplineService } from '../discipline/service/discipline.service';



@NgModule({
  declarations: [
    HomeStudentComponent,
    InviteDisciplineFormComponent,
    ListStudentComponent,
    StudentCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatCardContent,
    MatCardActions,
    MatCardSubtitle,
    MatCard,
    DisciplineModule
  ],
  exports:[
    HomeStudentComponent,
    ListStudentComponent
  ]
})
export class StudentModule { }
