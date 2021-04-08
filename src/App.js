import '@shopify/polaris/dist/styles.css';
import './App.css';
import './styles/grid.css'
import { DisplayText } from '@shopify/polaris';
import Form from './components/form.jsx'

function App() {
  return (
    <div className="grid wide ">
      <div className="row">
        <div className="col l-12 header">
          <DisplayText size="extraLarge">User Manager</DisplayText>
        </div>
      </div>
      
      <Form />
      
    </div>
  );
}

export default App;
