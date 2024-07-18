import { Injectable } from '@angular/core';
import { Peer } from 'peerjs';
import { PEER_JS_EVENTS } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class PeerService {
  peer: Peer;
  peerId: string;
  currentCall: any;

  constructor() {
    this.peer = new Peer();
    this.peer.on(PEER_JS_EVENTS.OPEN, (id) => {
      this.peerId = id;
      console.log('My peer ID is: ' + id);
    });
  }

  // method to get peer Id
  getPeerId(): string {
    return this.peerId;
  }

  // To call a user based on Peer Id
  call(peerId: string, stream: MediaStream) {
    const call = this.peer.call(peerId, stream);
    call.on(PEER_JS_EVENTS.STREAM, (remoteStream) => {
      // this.handleRemoteStream(remoteStream);
    });
    this.currentCall = call;
  }

  // To answer a call
  answer(call: any) {
    call.answer();
  }

  // To answer a call with stream
  answerWithStream(call: any, stream: MediaStream) {
    call.answer(stream);
  }

  // handle remote video stream
  handleRemoteStream(stream: MediaStream) {
    const videoElement = document.querySelector(
      'video#remote-video'
    ) as HTMLVideoElement;
    videoElement.srcObject = stream;
    videoElement.play();
  }

  //  one directional video call as well as screen share
  callEvent(video: any) {
    this.peer.on(PEER_JS_EVENTS.CALL, (call) => {
      this.answer(call);

      call.on(PEER_JS_EVENTS.STREAM, (remoteStream) => {
        if (video) {
          video.srcObject = remoteStream;
          video.play();
        }
      });
    });
  }

  // bi directional video call
  videoCallEvent(local: any, remote: any) {
    this.peer.on(PEER_JS_EVENTS.CALL, (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          local.srcObject = stream;
          local.play();

          this.answerWithStream(call, stream);
          call.on(PEER_JS_EVENTS.STREAM, (remoteStream: any) => {
            if (remote) {
              remote.srcObject = remoteStream;
              remote.play();
            }
          });
        });
    });
  }

  // event to stream on remote
  streamOnRemote(remote: any, call: any) {
    call.on(PEER_JS_EVENTS.STREAM, (remoteStream: MediaStream) => {
      if (remote) {
        remote.srcObject = remoteStream;
        remote.play();
      }
    });
  }
}
