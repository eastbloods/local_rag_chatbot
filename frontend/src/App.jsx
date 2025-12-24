import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Merhaba! Bana bir PDF yükle ve içindeki her şeyi sor." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const N8N_UPLOAD_URL = "http://localhost:5678/webhook/upload"; 
  const N8N_CHAT_URL = "http://localhost:5678/webhook/chat";

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Lütfen bir dosya seçin!");
    
    setUploadStatus("Yükleniyor ve analiz ediliyor... (Bu işlem Vision model ile biraz sürebilir)");
    
    const formData = new FormData();
    formData.append('data', file);

    try {
      await axios.post(N8N_UPLOAD_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadStatus("✅ Dosya başarıyla yüklendi ve veritabanına işlendi!");
    } catch (error) {
      console.error(error);
      setUploadStatus("❌ Yükleme hatası! n8n açık mı?");
    }
  };


  const handleSend = async () => {
    if (!input.trim()) return;


    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {

      const response = await axios.post(N8N_CHAT_URL, {
        chatInput: userMessage.content
      });

      const aiMessage = { 
        role: "assistant", 
        content: response.data.output || "Cevap alınamadı." 
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Bağlantı hatası." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>📄 Belge Yükle</h2>
        <p>Analiz edilecek PDF'i seçin.</p>
        
        <div className="upload-box">
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
          <button onClick={handleUpload} className="upload-btn">
            Yükle & Analiz Et
          </button>
        </div>
        
        {uploadStatus && <div className="status-msg">{uploadStatus}</div>}
        
        <div className="info-box">
          <small>Model: Qwen 2.5 + Llava (Vision)</small><br/>
          <small>DB: Qdrant (Local)</small>
        </div>
      </div>

      <div className="chat-container">
        <div className="chat-header">
          <h3>🤖 AI Doküman Asistanı</h3>
        </div>

        <div className="messages-area">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <div className="bubble">{msg.content}</div>
            </div>
          ))}
          {loading && <div className="message assistant"><div className="bubble loading">...</div></div>}
        </div>

        <div className="input-area">
          <input 
            type="text" 
            placeholder="Doküman hakkında bir soru sor..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>Gönder</button>
        </div>
      </div>
    </div>
  );
}

export default App;