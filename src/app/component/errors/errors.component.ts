import { Component, OnInit } from '@angular/core';
import { ErrorsService } from '../../service/errors.service';

/**
 * Component for display errors
 */
@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {

  constructor(public errorsService: ErrorsService) { }

  ngOnInit() {
  }

}
