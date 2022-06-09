import ObjectsList from './components/ObjectsList';
import ObjectEdit from './components/ObjectEdit';
import Pages from './pages/Pages';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      {/* <ObjectsList
        baseUrl={'http://localhost:5000/'}
        objectName={'task'}
        objectsName={'tasks'}
      />
      <ObjectEdit /> */}
      <Pages />
    </BrowserRouter>
  );
};

export default App;
