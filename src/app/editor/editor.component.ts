import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';




@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  @ViewChild('myEditor') myCanvas: ElementRef;
  @ViewChild('img') img: ElementRef;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  public context: CanvasRenderingContext2D;
  mousePressed: boolean = false;
  lastX: number;
  lastY: number;
  currentEvent: ImageCroppedEvent;
  image: any;
  color: string = 'red';
  @Output() imageEvent = new EventEmitter<any>();
  constructor() { }


  ngOnInit() {

  }


  /* ngAfterViewChecked() {
     //this.context.clearRect(0, 0, this.width, this.height);
     console.log('drawImage');
     // this prints an image element with src I gave
     console.log(this.img.nativeElement);
     //this.context.drawImage(this.img.nativeElement, 0, 0, this.width, this.height);
   }*/
  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    this.context.imageSmoothingEnabled = false;
    //this.context.imageSmoothingEnabled = true;
    this.context.imageSmoothingQuality = "high";
  }
  mouseDown(event: any) {
    this.mousePressed = !this.mousePressed;
    console.log(event);
    console.log(this.myCanvas.nativeElement);
    //this.Draw(event.pageX - this.myCanvas.nativeElement.offsetX, event.pageY - this.myCanvas.nativeElement.offsetY, false);
    this.Draw(event.offsetX, event.offsetY, false);

  }
  mouseMove(event: any) {
    console.log("move");
    if (this.mousePressed) {
      console.log(event);
      console.log(this.myCanvas.nativeElement);
      //this.Draw(event.pageX - this.myCanvas.nativeElement.offsetX, event.pageY - this.myCanvas.nativeElement.offsetY, true);
      this.Draw(event.offsetX, event.offsetY, true);
    }
  }
  mouseUp() {
    this.mousePressed = false;
  }

  mouseLeave(div: string) {
    this.mousePressed = false;
  }

  Draw(x, y, isDown) {
    if (isDown) {

      this.context.beginPath();
      console.log(this.color);
      this.context.strokeStyle = this.color;//"red";//$('#selColor').val();
      this.context.lineWidth = this.thickness;//10;//$('#selWidth').val();
      this.context.lineJoin = "round";
      this.context.moveTo(this.lastX, this.lastY);
      //this.context.moveTo(0, 0);
      this.context.lineTo(x, y);
      //this.context.lineTo(10, 100);
      this.context.closePath();
      this.context.stroke();
      this.image = this.context.canvas.toDataURL();

      console.log("output", this.image);
    }
    this.lastX = x; this.lastY = y;
  }

  clearArea() {
    // Use the identity matrix while clearing the canvas
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.drawImage(this.img.nativeElement, 0, 0, this.context.canvas.width, this.context.canvas.height);
  }
  imageCropped(event: ImageCroppedEvent) {
    console.log(event);
    this.croppedImage = event.base64;
    this.currentEvent = event;
    var width = this.currentEvent.cropperPosition.x2 - this.currentEvent.cropperPosition.x1;
    var height = this.currentEvent.cropperPosition.y2 - this.currentEvent.cropperPosition.y1;
    console.log(this.myCanvas);

    //this.context.imageSmoothingEnabled = true;
    //this.context.imageSmoothingQuality = "high";
    var imageC = new Image();
    imageC.src = event.base64;
    this.context.filter = window.getComputedStyle(imageC).filter;
    this.context.drawImage(this.img.nativeElement, 0, 0, width, height);
    this.image = this.context.canvas.toDataURL();
  }
  imageLoaded() {
    //this.context.imageSmoothingEnabled = true;
    //this.context.imageSmoothingQuality = "high";

  }
  loadImageFailed() {
    // show message
  }
  fileChangeEvent(event: any): void {
    console.log(event);
    this.imageChangedEvent = event;
    //this.context.imageSmoothingEnabled = true;
    //this.context.imageSmoothingQuality = "high";

  }

  afterLoading() {
    console.log(this.imageChangedEvent.width, this.imageChangedEvent.height);
    this.clearArea();
    var width = this.currentEvent.cropperPosition.x2 - this.currentEvent.cropperPosition.x1;
    var height = this.currentEvent.cropperPosition.y2 - this.currentEvent.cropperPosition.y1;
    console.log(width, height);
    //this.myCanvas.width = width;
    //this.myCanvas.height = height;


    // scale the 500x335 canvas in half to 250x167 onto the main canvas
    //this.context.canvas.width = c1.width / 2;
    //this.context.canvas.height = c1.height / 2;

    console.log(this.context);

    //this.context.imageSmoothingEnabled = true;
    //this.context.imageSmoothingQuality = "high";
    this.context.imageSmoothingEnabled = true;
    this.context.imageSmoothingQuality = "high";
    this.context.canvas.width = width;
    this.context.canvas.height = height;
    //this.context.webkitImageSmoothingEnabled = false;
    //this.context.mozImageSmoothingEnabled = false;
   
    this.context.filter = 'contrast(1.4)';//window.getComputedStyle(this.img.nativeElement).filter;
    console.log(this.context.filter);
    this.context.drawImage(this.img.nativeElement, 0, 0, width, height);
    this.image = this.context.canvas.toDataURL();

  }


  SavePicture() {
    this.imageEvent.emit(this.image);
  }

  SetColor(color: string) {
    this.color = color;
  }
  thickness: number;
  SetThickness(event) {
    console.log(event);
    this.thickness = event.target.value;
  }


}
