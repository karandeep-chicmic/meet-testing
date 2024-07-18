import { Component, OnInit, inject } from '@angular/core';
import { PeerService } from '../../../service/peer.service';
import { PEER_JS_EVENTS } from '../../../../constants';

@Component({
  selector: 'app-video-call',
  standalone: true,
  imports: [],
  templateUrl: './video-call.component.html',
  styleUrl: './video-call.component.css',
})
export class VideoCallComponent implements OnInit {
  peerService: PeerService = inject(PeerService);

  ngOnInit(): void {
    const local = document.querySelector(
      'video#local-video'
    ) as HTMLVideoElement;

    const remote = document.getElementById('remote-video') as HTMLVideoElement;

    this.peerService.videoCallEvent(local, remote);
  }

  // Start the video call
  startVideoCall(peerId: string) {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const videoElement = document.querySelector(
          'video#local-video'
        ) as HTMLVideoElement;
        videoElement.srcObject = stream;
        videoElement.play();
        const call = this.peerService.peer.call(peerId, stream);

        const remoteVideo = document.getElementById(
          'remote-video'
        ) as HTMLVideoElement;

        this.peerService.streamOnRemote(remoteVideo, call);
      });
  }
}
