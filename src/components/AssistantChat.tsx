import { useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

function AssistantChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="assistant-chat">
      {!isOpen && (
        <button
          className="assistant-chat__toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir assistente virtual"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="assistant-chat__window">
          <header className="assistant-chat__header">
            <div>
              <Bot size={22} />
              <span>Assistente virtual</span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Fechar assistente"
            >
              <X size={20} />
            </button>
          </header>

          <div className="assistant-chat__messages">
            <p>
              Olá! Sou seu assistente de estudos. Como posso ajudar?
            </p>
          </div>

          <form className="assistant-chat__form">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              aria-label="Digite sua mensagem"
            />

            <button type="button" aria-label="Enviar mensagem">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AssistantChat;