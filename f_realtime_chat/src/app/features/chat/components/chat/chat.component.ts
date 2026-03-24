import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatService } from '../../../../services/chat.service';
import { ChatMessage } from '../../../../interfaces/chat-message.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex flex-col p-5 relative">
      <div class="absolute top-5 left-1/2 -translate-x-1/2 text-white/30 text-sm font-medium pointer-events-none">
        Developed by Osen
      </div>

      @if (!joined()) {
        <div class="flex-1 flex flex-col justify-center pb-5">
          <div class="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-xl w-full mx-auto">
            <div class="mb-6">
              <h2 class="text-3xl font-bold text-slate-900 mb-2">Bienvenido al Chat</h2>
              <p class="text-gray-500">Ingresa tu nombre para comenzar</p>
            </div>
            <div class="flex flex-col gap-3">
              <input
                class="w-full px-5 py-3.5 border-2 border-gray-200 rounded-full text-base outline-none focus:border-slate-900 transition-colors"
                [value]="username()"
                (input)="username.set($any($event).target.value)"
                (keyup.enter)="join()"
                placeholder="Tu nombre"
              />
              <button
                class="px-7 py-3.5 bg-slate-900 text-white rounded-full font-semibold transition-colors hover:bg-slate-700"
                (click)="join()">Entrar</button>
            </div>
          </div>
        </div>
      }

      @if (joined()) {
        <div class="flex-1 flex flex-col justify-center pb-5">
          <div class="bg-white rounded-2xl shadow-2xl w-full max-w-xl h-[80vh] max-h-[700px] flex flex-col overflow-hidden mx-auto">
            <div class="bg-slate-900 text-white px-5 py-4 flex items-center gap-3 font-medium">
              <span class="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
              <span>Chat en vivo</span>
              <span class="ml-auto text-sm opacity-80">{{ username() }}</span>
            </div>

            <div class="flex-1 overflow-y-auto p-5 bg-gray-50 flex flex-col justify-end gap-3">
              @for (msg of messages(); track $index) {
                <div
                  class="max-w-[75%] px-4 py-3 rounded-2xl shadow-md self-start animate-slide-in"
                  [class.bg-slate-900]="msg.sender === username()"
                  [class.bg-white]="msg.sender !== username()"
                  [class.self-end]="msg.sender === username()">
                  <div class="flex justify-between items-center mb-1 gap-3">
                    <span class="text-xs font-semibold" [class.text-slate-900]="msg.sender !== username()" [class.text-white]="msg.sender === username()">{{ msg.sender }}</span>
                    <span class="text-[11px]" [class.text-gray-500]="msg.sender !== username()" [class.text-gray-300]="msg.sender === username()">{{ getCurrentTime() }}</span>
                  </div>
                  <div class="text-sm leading-relaxed wrap-break-words" [class.text-slate-800]="msg.sender !== username()" [class.text-white]="msg.sender === username()">{{ msg.message }}</div>
                </div>
              }
              @if (messages().length === 0) {
                <div class="flex-1 flex items-center justify-center text-gray-400 text-center">
                  <p>No hay mensajes aún. ¡Sé el primero en escribir!</p>
                </div>
              }
            </div>

            <div class="p-5 bg-white border-t border-gray-100 flex gap-3">
              <input
                class="flex-1 px-5 py-3.5 border-2 border-gray-200 rounded-full text-base outline-none focus:border-slate-900 transition-colors"
                [value]="newMessage()"
                (input)="newMessage.set($any($event).target.value)"
                (keyup.enter)="send()"
                placeholder="Escribe un mensaje..."
              />
              <button
                class="px-7 py-3.5 bg-slate-900 text-white rounded-full font-semibold transition-all hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[0.98] active:scale-[0.98]"
                (click)="send()"
                [disabled]="!newMessage()">Enviar</button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes slide-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-slide-in {
      animation: slide-in 0.3s ease;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {

  private chatService = inject(ChatService);


  username = signal('');
  newMessage = signal('');
  messages = signal<ChatMessage[]>([]);
  joined = signal(false);



  getCurrentTime(): string {
    return new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }

  join() {
    if (!this.username()) return;

    this.chatService.connect((message) => {
      this.messages.update(msgs => [...msgs, message]);
    });
    this.joined.set(true);
  }

  send() {
    if (!this.newMessage()) return;

    const message: ChatMessage = {
      sender: this.username(),
      message: this.newMessage()
    };

    this.chatService.sendMessage(message);

    this.newMessage.set('');
  }



 }
