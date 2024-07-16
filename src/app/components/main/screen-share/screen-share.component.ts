import { AfterViewInit, OnInit } from '@angular/core';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { PeerService } from '../../../service/peer.service';

@Component({
  selector: 'app-screen-share',
  standalone: true,
  imports: [],
  templateUrl: './screen-share.component.html',
  styleUrl: './screen-share.component.css',
})
export class ScreenShareComponent implements OnInit {
  // @ViewChild('screenVideo') screenVideo: ElementRef;

  // constructor() {}

  // ngAfterViewInit() {
  //   this.startScreenShare();
  // }

  // async startScreenShare() {
  //   try {
  //     // Request screen capture
  //     const stream = await navigator.mediaDevices.getDisplayMedia({
  //       video: true,
  //     });

  //     // Set the video element to the stream
  //     this.screenVideo.nativeElement.srcObject = stream;
  //     this.screenVideo.nativeElement.play();
  //   } catch (err) {
  //     console.error('Error: ' + err);
  //   }
  // }

  @ViewChild('localVideo') localVideo: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo: ElementRef<HTMLVideoElement>;

  constructor(private peerService: PeerService) {}

  ngOnInit(): void {
    this.peerService.onCall((call) => {
      navigator.mediaDevices
        .getDisplayMedia({ video: true, audio: true })
        .then((stream) => {
          call.answer(stream);
          call.on('stream', (remoteStream) => {
            this.remoteVideo.nativeElement.srcObject = remoteStream;
          });
        })
        .catch((err) => console.error('Failed to get display media', err));
    });
  }

  startScreenShare(): void {
    navigator.mediaDevices
      .getDisplayMedia({ video: true, audio: true })
      .then((stream) => {
        this.localVideo.nativeElement.srcObject = stream;
        const peerId = localStorage.getItem('peerId');

        if (peerId) {
          this.peerService.callPeer(peerId, stream); // Replace 'remote-peer-id' with actual peer ID
        }
      })
      .catch((err) => console.error('Failed to get display media', err));
  }

  connectToPeer(): void {
    const conn = this.peerService.connectToPeer('remote-peer-id'); // Replace 'remote-peer-id' with actual peer ID
    conn.on('open', () => {
      console.log('Connected to peer');
    });
  }
}
