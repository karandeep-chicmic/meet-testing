import { Injectable } from '@angular/core';
import Peer from 'peerjs';

@Injectable({
  providedIn: 'root',
})
export class PeerService {
  private peer: Peer;
  private peerId: string;
  private mediaConnection: any;

  constructor() {
    this.peer = new Peer();
    this.peer.on('open', (id) => {
      this.peerId = id;
      console.log('Peer ID:', this.peerId);
      if (!localStorage.getItem('peerId')) {
        localStorage.setItem('peerId', this.peerId);
      }
    });
  }

  getPeerId() {
    return this.peerId;
  }

  connectToPeer(remotePeerId: string) {
    return this.peer.connect(remotePeerId);
  }

  callPeer(remotePeerId: string, stream: MediaStream) {
    this.mediaConnection = this.peer.call(remotePeerId, stream);
  }

  onCall(callback: (call: any) => void) {
    this.peer.on('call', callback);
  }

  answerCall(call: any, stream: MediaStream) {
    call.answer(stream);
  }

  getMediaConnection() {
    return this.mediaConnection;
  }
}
