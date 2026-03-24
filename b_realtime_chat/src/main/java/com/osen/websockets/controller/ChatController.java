package com.osen.websockets.controller;


import com.osen.websockets.dtos.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    private final SimpMessagingTemplate template;

    public ChatController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @MessageMapping("chat")
    public void sendMessage(ChatMessage message) {
        template.convertAndSend("/topic/messages", message);
    }

}

