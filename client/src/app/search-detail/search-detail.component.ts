import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {VideoService} from '../videos/videos.service';
import { VideoItem } from '../videos/video'

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.css'],
  providers: [VideoService]
})
export class SearchDetailComponent implements OnInit,OnDestroy {
    private routeSub:any;
    private req:any;
    query: string;
    videoList: [VideoItem];
  constructor(private route:ActivatedRoute, private _video:VideoService) { }

  ngOnInit() {
      this.routeSub = this.route.params.subscribe(params=>{
          this.query = params['q']
          this.req = this._video.search(this.query).subscribe(data=>{
          this.videoList = data as [VideoItem];
          })
      })
  }

  ngOnDestroy(){
      this.routeSub.unsubscribe()
      this.req.unsubscribe()
  }

  getEmbedUrl(item){
      return 'https://www.youtube.com/embed/' + item.embed + '?rel=0'
  }


}
