import './App.css';
import { useState } from 'react';
import { send } from 'emailjs-com';
import kuva from './imgs/Untitled.png';

function App() {

  const [toSend, setToSend] = useState({
    from_name: '',
    Info: '',
    message: '',
    date: '',
  });

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
          <h3>Eli siis lahjakortti ei ole mikään 750€, vaan tietenkin laatuperheaikaa! :)</h3>
        </div>
        <div className="main-block">
          <div className="left-part">
          </div>
          <form action="/">
            <h1>Varaa "Elämys"-lahja!</h1>
            <div className="info">
              <input type='text' name='from_name' placeholder='Varaaja' value={toSend.from_name} onChange={handleChange}/>
              <input type='date'name='date' min="2023-01-15" value={toSend.date} onChange={handleChange}/>
              <input type='text' name='info' placeholder='Muuta tietoa?' value={toSend.info} onChange={handleChange}/>
            </div>
            <p>Päivän toiveohjelma</p>
            <div>
              <textarea type='text' name='message' value={toSend.message} onChange={handleChange} rows="4"></textarea>
            </div>
            <button type="submit">Varaa!</button>
          </form>
        </div>
      </body>
    </html>
  );
}

export default App;
