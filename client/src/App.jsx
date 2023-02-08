import { useState } from 'react';

import person from './assets/person.png';
import bot from './assets/bot.png';

function App() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();

    setMessages([...messages, { prompt, user: 'human' }]);

    try {
      const response = await fetch('http://localhost:5000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      setMessages(prevMessages => (
         [...prevMessages, { prompt: data.message, user: 'ai' }]
      ));

      chatWindow = document.getElementById('scroller'); 
      var xH = chatWindow.scrollHeight; 
      chatWindow.scrollTo(0, xH);
    }
    catch(error) {
      console.log(error);
    }
  }

  return (
    <div className="main">

      <div className="message" id='scroller'>
        {messages.map((msg, id) => (
          <div key={id} className="person">
            <img src={msg.user === 'human' ? person : bot} alt="icon" />
            <p>
              {msg.prompt}
            </p>
          </div>))
        }
        <div id="anchor"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setPrompt(e.target.value)} name="prompt" value={prompt} placeholder="Ask something..." />
      </form>
    </div>
  )
}

export default App
