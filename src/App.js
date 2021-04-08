import '@shopify/polaris/dist/styles.css';
import './App.css';
import './styles/grid.css'
import { Button } from '@shopify/polaris';
import Form from './components/form.jsx'
import { useState } from 'react';
function App() {
  const [create, setCreate] = useState(false)
  return (
    <div className="grid wide">
      <div className="row">
        <div className="col l-12 header"> 
          <p>User Manager</p>
        </div>
      </div>

      <div className="row navigation">
        <div className="col l-4 l-0-3">
          <Button style={{ marginRight: 10 }} primary onClick={() => setCreate(!create)}>Create user</Button>
          {'  '}
          <Button primary>Show user</Button>
          
        </div>
        <div className="col l-2 l-0-2">
        </div>
      </div>

      <div className="row form-input">
        <div className="col l-6 l-0-3">
            {create && <Form />}
        </div>
      </div>
    </div>
  );
}

export default App;
