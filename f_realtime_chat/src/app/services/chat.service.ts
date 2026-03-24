import { ChatMessage } from './../interfaces/chat-message.interface';
import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private client!: Client;


  // funciona para conectar con el broker y especificar que se quiere recibir los mensajes
  // que llegaran usando el metodo send
  connect(onMessageReceived: (message: any) => void) {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      onConnect: () => {
        this.client.subscribe('/topic/messages', (msg: Message) => {
          onMessageReceived(JSON.parse(msg.body));
        });
      }
    });

    this.client.activate();
  }


  sendMessage(chatMessage: ChatMessage) {
    this.client.publish({
    destination: '/app/chat',
    body: JSON.stringify(chatMessage)
  });
}

}
