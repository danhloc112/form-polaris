import '@shopify/polaris/dist/styles.css';
import './App.css';
import './styles/grid.css'
import { DisplayText } from '@shopify/polaris';
import Form from './components/form.jsx'

function App() {
  return (
    <div className="grid wide ">
      <div className="row">
        <div className="col l-12 m-12 c-12 header">
          {/* <div className="row"> */}
            <div className="col l-6 l-0-3 m-6 m-0-3 c-12">
              <DisplayText size="extraLarge">User Manager</DisplayText>
            </div>
          {/* </div> */}
        </div>
      </div>
      
      <Form />
      
    </div>
  );
}

export default App;
