import { Component } from '@angular/core';

declare const cornerstone;
declare const cornerstoneWADOImageLoader;
declare const cornerstoneWebImageLoader;
declare const cornerstoneMath;
declare const cornerstoneTools;
declare const Hammer;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    ngOnInit() { 

        cornerstoneTools.external.cornerstone = cornerstone;
        cornerstoneTools.external.Hammer = Hammer;
        cornerstoneTools.external.cornerstoneMath = cornerstoneMath;        
        cornerstoneWADOImageLoader.external.cornerstone = cornerstone; // inicializa WADO Image loader
        cornerstoneWebImageLoader.external.cornerstone = cornerstone;


        // configura codecs e web workers
        cornerstoneWADOImageLoader.webWorkerManager.initialize({
            webWorkerPath: './assets/cornerstone/webworkers/cornerstoneWADOImageLoaderWebWorker.js',
            taskConfiguration: {
                'decodeTask': {
                    codecsPath: '../codecs/cornerstoneWADOImageLoaderCodecs.js'
                }
            }            
        });
    }

}
