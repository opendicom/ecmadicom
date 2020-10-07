import { Directive, OnInit, AfterViewChecked, ElementRef, HostListener } from '@angular/core';

declare const cornerstone;
declare const cornerstoneTools;

@Directive({
    selector: '[cornerstone]'
})
export class CornerstoneDirective implements OnInit {

    public element: any;

    public imageList = [];
    private imageIdList = [];
    public currentIndex = 0;
    public currentImage: any;
    public patientName = ''; // current image Patient name, do display on the overlay
    public hospital = ''; // current image Institution name, to display on the overlay
    public instanceNumber = ''; // current image Instance #, to display on the overlay

    public get windowingValue(): string {
        if (this.isCornerstoneEnabled) {
            let viewport = cornerstone.getViewport(this.element);
            if (this.currentImage && viewport) { return Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter); }
        }
        return '';
    }

    public get zoomValue(): string {
        if (this.isCornerstoneEnabled) {
            let viewport = cornerstone.getViewport(this.element);            
            if (this.currentImage && viewport) { return viewport.scale.toFixed(2); }
        }
        return '';
    }
    

    private isCornerstoneEnabled = false;

    constructor(private elementRef: ElementRef) {
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (this.isCornerstoneEnabled) {
            cornerstone.resize(this.element, true);
        }
    }

    ngOnInit() {

        // Retrieve the DOM element itself
        this.element = this.elementRef.nativeElement;

        // Enable the element with Cornerstone
        this.resetViewer();

    }
    
    //
    // reset the viewer, so only this current element is enabled
    //
    public resetViewer() {
        this.disableViewer();
        cornerstone.enable(this.element);        
        this.isCornerstoneEnabled = true;
    }

    public disableViewer() {
        this.element = this.elementRef.nativeElement;
        try {
            cornerstone.disable(this.element);
        } finally { }

        this.isCornerstoneEnabled = false;
    }

    public resetImageCache() {
        this.imageList = [];
        this.imageIdList = [];
        this.currentImage = null;
        this.currentIndex = 0;
        this.patientName = '';
        this.hospital = '';
        this.instanceNumber = '';
    }

    public previousImage() {
        if (this.imageList.length > 0) {
            this.currentIndex--;
            if (this.currentIndex < 0) {
                this.currentIndex = 0;
            }
            this.displayImage(this.imageList[this.currentIndex]);
        }

    }

    public nextImage() {
        if (this.imageList.length > 0) {
            this.currentIndex++;
            if (this.currentIndex >= this.imageList.length) {
                this.currentIndex = this.imageList.length - 1;
            }
            this.displayImage(this.imageList[this.currentIndex]);
        }
    }

    public addImageData(imageData: any) {
        this.element = this.elementRef.nativeElement;
        //if (!this.imageList.filter(img => img.imageId === imageData.imageId).length) {
        this.imageList.push(imageData);
        this.imageIdList.push(imageData.imageId);
        if (this.imageList.length === 1) {
            this.currentIndex = 0;
            this.displayImage(imageData);
        }
        //}

        cornerstone.resize(this.element, true);
    }

    public displayImage(image) {
        this.element = this.elementRef.nativeElement;
        const viewport = cornerstone.getDefaultViewportForImage(this.element, image);
        cornerstone.displayImage(this.element, image, viewport);
        this.currentImage = image;
        // Fit the image to the viewport window
        cornerstone.fitToWindow(this.element);
        cornerstone.resize(this.element, true);
        // get image info to display in overlays
        this.patientName = image.data.string('x00100010').replace(/\^/g, '');
        this.hospital = image.data.string('x00080080');
        this.instanceNumber = image.data.intString('x00200011') + '/' + image.data.intString('x00200013');        
        cornerstone.enable(this.element);
        
        //Initialize tool
        cornerstoneTools.init();
        cornerstoneTools.addToolForElement(this.element, cornerstoneTools[`WwwcTool`]);
        cornerstoneTools.addToolForElement(this.element, cornerstoneTools[`ZoomTool`]);
        cornerstoneTools.addToolForElement(this.element, cornerstoneTools[`PanTool`]);
        cornerstoneTools.addToolForElement(this.element, cornerstoneTools[`PanMultiTouchTool`]);
        cornerstoneTools.addToolForElement(this.element, cornerstoneTools[`StackScrollTool`]);
        cornerstoneTools.addToolForElement(this.element, cornerstoneTools[`LengthTool`]);
        cornerstoneTools.addToolForElement(this.element, cornerstoneTools[`AngleTool`]);
        cornerstoneTools.addToolForElement(this.element, cornerstoneTools[`ProbeTool`]);
        cornerstoneTools.addToolForElement(this.element, cornerstoneTools[`EllipticalRoiTool`]);
        cornerstoneTools.addToolForElement(this.element, cornerstoneTools[`RectangleRoiTool`]);
        
        // Stack tools                
        const stack = {
            currentImageIdIndex: this.currentIndex,
            imageIds: this.imageIdList
        };
        cornerstoneTools.addStackStateManager(this.element, ['playClip']);
        // Add the stack tool state to the enabled element
        cornerstoneTools.addStackStateManager(this.element, ['stack']);
        cornerstoneTools.addToolState(this.element, 'stack', stack);        
    }

}
