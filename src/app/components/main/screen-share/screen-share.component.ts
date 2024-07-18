import { AfterViewInit, OnInit, inject } from '@angular/core';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { PeerService } from '../../../service/peer.service';
import { PEER_JS_EVENTS } from '../../../../constants';

@Component({
  selector: 'app-screen-share',
  standalone: true,
  imports: [],
  templateUrl: './screen-share.component.html',
  styleUrl: './screen-share.component.css',
})
export class ScreenShareComponent implements OnInit {
  localStream: MediaStream;
  peerService: PeerService = inject(PeerService);

  ngOnInit() {
    const video = document.getElementById(
      'remote-video'
    ) as HTMLVideoElement;
    
    this.peerService.callEvent(video);
  }

  startScreenShare(peerId: string) {
    navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream) => {
      this.localStream = stream;
      const videoElement = document.querySelector(
        'video#local-video'
      ) as HTMLVideoElement;
      videoElement.srcObject = stream;
      videoElement.play();

      this.peerService.call(peerId, stream);
    });
  }

  startVideoShare(peerId: string) {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        console.log(stream);
        const videoElement = document.querySelector(
          'video#local-video'
        ) as HTMLVideoElement;
        videoElement.srcObject = stream;
        videoElement.play();

        this.peerService.call(peerId, stream);
      });
  }
 
}
