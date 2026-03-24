package com.osen.websockets.dtos;

public record ChatMessage(
        String sender,
        String message
) {
}
