import { Routes } from '@angular/router';
import { ChatComponent } from './features/chat/components/chat/chat.component';
import { ChatPageComponent } from './features/chat/pages/chat-page.component/chat-page.component';

export const routes: Routes = [
  {
    path: '',
    component: ChatPageComponent
  }
];
