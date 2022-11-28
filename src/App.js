import './App.css';
import MainPage from './components/main-page';
import DataStorageProvider from './contexts/data-storage-context';

function App() {
  return (
    <DataStorageProvider>
      <MainPage className="h-full" />
    </DataStorageProvider>
  );
}

export default App;
