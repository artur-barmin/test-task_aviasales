import React from 'react'
import ReactDOM from 'react-dom'

import './style.css'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Main from './components/Main'

function App() {
  const url = 'https://front-test.beta.aviasales.ru/search';
  getSearchId(url);

  return (
    <div className='container'>
      <div className="row">
        <Header />
      </div>
      <div className="row">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}
function getSearchId(url) {
  fetch(url)
    .then(res => {
      if (res.ok) {
        console.log('1 connection established! status:', res.status);
        return res;
      }
    })
    .catch(err => console.log('connection error! details: ', err))
    .then(res => {
      const result = res.json();
      console.log('2 ID JSONify success:', result);
      return result;
    })
    .catch(err => console.log('ID JSONify err:', err))
    .then(res => { 
      console.log('3', res.searchId);
      return url.split('search').join('tickets') + '?searchId=' + res.searchId
    })
    .then(res => {
      console.log('4',res);
      fetch(res)
      .then(res => res.ok ? res : 'fdkjsf')
      .then(res => {
        let result = res.json(); 
        console.log(result);
        return result;
      })
      .then(res => console.log(res.tickets))
    })
}
// async function getTicketPack(url) {
//   fetch(await getSearchId(url))
//     .then(res => {
//       if (res.ok) {
//         console.log('4 search started! downloading...');
//         return res;
//       }
//     })
//     .catch(err => console.log('search error! details:', err))
//     .then(res => {
//       const result = res.json();
//       console.log('5 tickets JSONify success:', result);
//       return result;
//     })
//     .catch(err => console.log('tickets JSONify err:', err))
// }

ReactDOM.render(<App />, document.getElementById('root'))