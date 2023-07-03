import './App.css';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

function App() {

  const [toSend, setToSend] = useState({
    from_name: '',
    info: '',
    message: '',
    date: '',
  });

  const form = useRef()

  const onSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_lahjakortti', 'template_couuawj', form.current, process.env.REACT_APP_EMAILJS_KEY)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
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
          <h3>Eli siis lahjakortti ei ole mikään 750€ lahjakortti, vaan tietenkin laatuperheaikaa! :)</h3>
        </div>
        <div className="main-block">
          <div className="left-part">
          </div>
          <form ref={form} onSubmit={onSubmit}>
            <h1>Varaa "Elämys"-lahja!</h1>
            <div className="info">
              <input type='text' name='from_name' placeholder='Varaaja' value={toSend.from_name} onChange={handleChange}/>
              <input placeholder='Päivämäärä' type='text' name='date' onFocus={(e) => (e.target.type = "date")} min="2023-01-15" value={toSend.date} onChange={handleChange}/>
              <input type='text' name='info' placeholder='Muuta tietoa?' value={toSend.info} onChange={handleChange}/>
            </div>
            <p>Päivän toiveohjelma</p>
            <div>
              <textarea type='text' name='message' value={toSend.message} onChange={handleChange} rows="4"></textarea>
            </div>
            <button type='submit'>Varaa!</button>
          </form>
        </div>
      </body>
    </html>
  );
}

export default App;
