import './App.css';
import { useState } from 'react';
import { send } from 'emailjs-com';
import kuva from './imgs/Untitled.png';

function App() {

  const [toSend, setToSend] = useState({
    from_name: '',
    to_name: '',
    message: '',
    reply_to: '',
  });

  function Mailform() {
    return(
      <form onSubmit={onSubmit}>
          <input
            type='text'
            name='from_name'
            placeholder='Varaaja'
            value={toSend.from_name}
            onChange={handleChange}
          />
          <input
            type='text'
            name='date'
            placeholder='Päivämäärä'
            value={toSend.to_name}
            onChange={handleChange}
          />
          <input
            type='text'
            name='message'
            placeholder='Päivän toiveohjelma'
            value={toSend.message}
            onChange={handleChange}
          />
          <input
            type='text'
            name='info'
            placeholder='Muuta tietoa?'
            value={toSend.reply_to}
            onChange={handleChange}
          />
          <button type='submit'>Varaa aika!</button>
        </form>
    )
  }

  const onSubmit = (e) => {
    e.preventDefault();
    send(
      'service_lahjakortti',
      'template_couuawj',
      toSend,
      'KXUUTcmjiSRG6n4HB'
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      })
      .catch((err) => {
        console.log('FAILED...', err);
      });
  };

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  return (
    <html>
      <header>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" />
      </header>
      <body>
        <div className='h1h1'>
          <h1>Hyvää joulua</h1>
          <h2>Tässä voit lunastaa lahjakortin halutulla toiveohjelmalla, valitsemallesi päivälle.</h2>
          <h3>Eli siis lahjakortti ei ole mitään 750€, vaan tietenkin laatuperheaikaa! :)</h3>
        </div>
        <div className="main-block">
          <div className="left-part">
          </div>
          <form action="/">
            <h1>Varaa "Elämys"-lahja!</h1>
            <div className="info">
              <input type='text' name='from_name'placeholder='Varaaja' value={toSend.from_name} onChange={handleChange}/>
              <input type='date'name='date' min="2023-01-15" value={toSend.to_name} onChange={handleChange}/>
              <input type='text' name='info' placeholder='Muuta tietoa?' value={toSend.reply_to} onChange={handleChange}/>
            </div>
            <p>Päivän toiveohjelma</p>
            <div>
              <textarea type='text' name='message' value={toSend.message} onChange={handleChange} rows="4"></textarea>
            </div>
            <button type="submit" href="/">Varaa!</button>
          </form>
        </div>
      </body>
    </html>
  );
}

export default App;
