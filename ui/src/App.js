import ObjectList from './components/ObjectList';

const App = () => {
  return (
    <ObjectList
      baseUrl={'http://localhost:5000/'}
      objectName={'task'}
      objectsName={'tasks'}
    />
  );
};

export default App;
