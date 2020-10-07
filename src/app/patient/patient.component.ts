import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewerComponent } from '../viewer/viewer.component'
import { RestService } from '../services/rest.service'

export interface Study {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

    @ViewChild(ViewerComponent) viewPort: ViewerComponent;
    manifiest: Array<any>;

    studies: Study[]
    studySelected: string

    constructor(
        private route: ActivatedRoute,
        private restService: RestService
    ) {        
        this.restService.getManifiest(this.route.snapshot.paramMap.get('token'))
            .subscribe(cornerstoneManifiest => {
                //Load imagen on cornerstone
                this.studies = cornerstoneManifiest[0].patientList[0].studyList
                this.studySelected = cornerstoneManifiest[0].patientList[0].studyList[0].StudyInstanceUID
                let imageList = [];
                imageList.push("wadouri:http://127.0.0.1:3333/wado?requestType=WADO&studyUID=1.3.12.2.1107.5.2.6.23034.30000020011511194045300000001&seriesUID=1.3.12.2.1107.5.2.6.23034.30000020011511211142100000028&objectUID=1.3.12.2.1107.5.2.6.23034.30000020011511211142100000029&contentType=application/dicom&transferSyntax=*&frame=0");
                imageList.push("wadouri:http://127.0.0.1:3333/wado?requestType=WADO&studyUID=1.3.12.2.1107.5.2.6.23034.30000020011511194045300000001&seriesUID=1.3.12.2.1107.5.2.6.23034.30000020011511211142100000028&objectUID=1.3.12.2.1107.5.2.6.23034.30000020011511211142100000042&contentType=application/dicom&transferSyntax=*&frame=0");
                imageList.push("wadouri:http://127.0.0.1:3333/wado?requestType=WADO&studyUID=1.3.12.2.1107.5.2.6.23034.30000020011511194045300000001&seriesUID=1.3.12.2.1107.5.2.6.23034.30000020011511211142100000184&objectUID=1.3.12.2.1107.5.2.6.23034.30000020011511211142100000203&contentType=application/dicom&transferSyntax=*&frame=0");
                imageList.push("wadouri:http://127.0.0.1:3333/wado?requestType=WADO&studyUID=1.3.12.2.1107.5.2.6.23034.30000020011511194045300000001&seriesUID=1.3.12.2.1107.5.2.6.23034.30000020011511211142100000184&objectUID=1.3.12.2.1107.5.2.6.23034.30000020011511211142100000188&contentType=application/dicom&transferSyntax=*&frame=0");
                imageList.push("wadouri:http://127.0.0.1:3333/wado?requestType=WADO&studyUID=1.3.12.2.1107.5.2.6.23034.30000020011511194045300000001&seriesUID=1.3.12.2.1107.5.2.6.23034.30000020011511211142100000184&objectUID=1.3.12.2.1107.5.2.6.23034.30000020011511211142100000204&contentType=application/dicom&transferSyntax=*&frame=0");
                //Url con indicacion de numero de frame desde 0 en adelante
                //imageList.push("wadouri:http://127.0.0.1:3333/wado?requestType=WADO&studyUID=1.3.12.2.1107.5.2.6.23034.30000020011511194045300000001&seriesUID=1.3.12.2.1107.5.2.6.23034.30000020011511211142100000184&objectUID=1.3.12.2.1107.5.2.6.23034.30000020011511211142100000204&contentType=application/dicom&transferSyntax=*&frame=4");
                //
                //imageList.push("wadouri:http://127.0.0.1:3333/wado?requestType=WADO&studyUID=1.3.12.2.1107.5.2.5.11110.30000019111910080651500000001&seriesUID=1.3.12.2.1107.5.2.5.11110.30000019111910085712500000144&objectUID=1.3.12.2.1107.5.2.5.11110.30000019111910085712500000145&contentType=application/dicom&transferSyntax=*");
                //this.viewPort.resetAllTools();
                this.viewPort.loadStudyImages(imageList);

                document.getElementById("loader").style.display = "none";
                document.getElementById("content").style.display = "block";
            })
        document.getElementById("info").style.display = "none";        
    }

    ngOnInit() {        
        

        //alert(this.route.snapshot.paramMap.get('token'));                
    }

    isBiggerScreen() {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (width < 768) {
            return true;
        } else {
            return false;
        }
    }
}
