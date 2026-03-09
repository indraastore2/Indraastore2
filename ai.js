document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat');
    const promptInput = document.getElementById('prompt');
    const sendBtn = document.getElementById('sendBtn');
    const clearBtn = document.getElementById('clearBtn');
    const modelSelect = document.getElementById('modelSelect');

    promptInput.focus();

    let chatHistory = JSON.parse(localStorage.getItem('indraa_chat_history')) || [];

    if (chatHistory.length > 0) {
        chatContainer.classList.add('chat-visible');
        const welcomeScreen = document.getElementById('welcome-screen');
        if (welcomeScreen) welcomeScreen.remove();
    }

    marked.setOptions({
        highlight: function(code, lang) {
            return hljs.highlightAuto(code).value;
        },
        breaks: true
    });

    window.copyChat = (text, btn) => {
        navigator.clipboard.writeText(text).then(() => {
            btn.innerText = 'Tersalin!';
            setTimeout(() => btn.innerText = 'COPY', 2000);
        });
    };
    
    const modal = document.getElementById('announcementModal');
    const closeModal = document.getElementById('closeModal');

    // Cek di LocalStorage
    const hasSeenPopup = localStorage.getItem('indraa_popup_seen');

    if (!hasSeenPopup) {
        setTimeout(() => {
            modal.classList.add('active');
        }, 1000);
    }

    closeModal.onclick = () => {
        modal.classList.remove('active');
        // Simpan ke LocalStorage 
        localStorage.setItem('indraa_popup_seen', 'true');
    };


        function typewriter(element, text, callback) {
        if (!element) return;
        let i = 0;
        element.innerHTML = "";
        const speed = 2; 
        
        const interval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML = marked.parse(text.substring(0, i + 1));
                i++;
                chatContainer.scrollTop = chatContainer.scrollHeight;
            } else {
                clearInterval(interval);
                element.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightElement(block);
                });
                if (callback) callback();
            }
        }, speed); 
    }


    function renderMessage(role, message, isNew = true, useTypewriter = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;

        let footerHtml = role === 'ai' ? `
            <div class="bubble-footer" style="display:flex; justify-content:flex-end; margin-top:10px; padding-top:6px; border-top:1px solid rgba(255,255,255,0.1);">
                <button class="copy-btn" style="color:#38bdf8; background:transparent; border:none; font-weight:800; font-size:10px; cursor:pointer;"
                onclick="copyChat(\`${message.replace(/`/g, '\\`').replace(/\n/g, '\\n')}\`, this)">COPY</button>
            </div>` : '';

        messageDiv.innerHTML = `
            <div class="bubble">
                <div class="message-content"></div>
                ${footerHtml}
            </div>
        `;

        chatContainer.appendChild(messageDiv);
        const contentDiv = messageDiv.querySelector('.message-content');

        if (useTypewriter && role === 'ai') {
            typewriter(contentDiv, message, () => {
                sendBtn.disabled = false;
                sendBtn.style.opacity = "1";
            });
        } else {
            contentDiv.innerHTML = marked.parse(message);
        }

        if (isNew) {
            chatHistory.push({ role, content: message });
            localStorage.setItem('indraa_chat_history', JSON.stringify(chatHistory));
        }
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    chatHistory.forEach(data => renderMessage(data.role, data.content, false));

    clearBtn.onclick = () => {
        if(confirm("Hapus semua riwayat chat?")) {
            localStorage.removeItem('indraa_chat_history');
            location.reload();
        }
    };

    async function handleSend() {
        const text = promptInput.value.trim();
        if (!text) return;

        const selectedModel = modelSelect ? modelSelect.value : "gpt-4";

        const welcomeScreen = document.getElementById('welcome-screen');
        if (welcomeScreen) {
            welcomeScreen.classList.add('welcome-hidden');
            chatContainer.classList.add('chat-visible'); 
            setTimeout(() => welcomeScreen.remove(), 500);
        }

        sendBtn.disabled = true;
        sendBtn.style.opacity = "0.5";

        renderMessage('user', text);
        promptInput.value = '';
        promptInput.style.height = 'auto';

        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message ai loading';
        loadingDiv.innerHTML = `<div class="bubble" style="opacity:0.6"><i>INDRA AI  SEDANG MENGETIK...</i></div>`;
        chatContainer.appendChild(loadingDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        try {
            const systemPrompt = "Sekarang Kamu Adalah INDRA AI Asisten Cerdas Yang di Ciptakan Oleh Indra Untuk Menjawab Pertanyaan User, Rules : Selalu Gunakan Bahasa Yang Baku/Sopan, Gunakan Style Chat Profesional, Dan Tidak Boleh Sampai Terprovokasi User, Pakai Emoji Untuk Berkomunikasi Agar Tidak Kaku Dan Jika User Meminta Hal Hal Ilegal, Atau yang Berbau Kriminal Dan Cyber Hacking Kamu Harus MENOLAK NYA DENGAN TEGAS!!,";
            const apiKey = "freepublic";
            
            const url = `https://exsalapi.my.id/api/ai/text/${selectedModel}?text=${encodeURIComponent(text)}&prompt=${encodeURIComponent(systemPrompt)}&apikey=${apiKey}`;
            
            const response = await fetch(url, { method: "GET" });
            const result = await response.json();
            
            if (chatContainer.contains(loadingDiv)) {
                chatContainer.removeChild(loadingDiv);
            }

            if (result.status && result.data) {
                renderMessage('ai', result.data.content, true, true);
            } else {
                renderMessage('ai', '[EROR] Respon Server Tidak Dikenal,.');
                sendBtn.disabled = false;
                sendBtn.style.opacity = "1";
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            if (chatContainer.contains(loadingDiv)) {
                chatContainer.removeChild(loadingDiv);
            }
            renderMessage('ai', '[EROR] Gagal Terhubung Ke server. Coba Lagi Nanti.');
            sendBtn.disabled = false;
            sendBtn.style.opacity = "1";
        }
    }


    sendBtn.addEventListener('click', handleSend);

    promptInput.onkeydown = (e) => { 
        if (e.key === 'Enter' && e.ctrlKey) { 
            e.preventDefault(); 
            handleSend(); 
        }
    };
});
