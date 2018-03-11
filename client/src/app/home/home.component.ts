import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import {VideoService} from '../videos/videos.service';
import { VideoItem } from '../videos/video'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [VideoService]
})
export class HomeComponent implements OnInit {
    private req: any;
    homeImageList:[VideoItem]= [] as [VideoItem];
    videoListDefaultImage = 'assets/images/videos/1.jpg';
  constructor(private router:Router, private http:Http, private _video: VideoService) { }

  ngOnInit() {
      this.req = this._video.list().subscribe(data =>{
          //this.homeImageList 
          data.filter(item=>{
              if(item.featured){
                  this.homeImageList.push(item)
              }
          });
      })
  }

  ngOnDestroy(){
      this.req.unsubscribe()
  }

  preventNormal(event:any,image:any){
      if(!image.prevented){
          event.preventDefault()
          //console.log(image.getAttribute("href"))
          //image.setAttribute("href","videos")
          //image.link = "/videos"
          //image.prevented = true;
          this.router.navigate(['./videos'])
      }

  }

}
