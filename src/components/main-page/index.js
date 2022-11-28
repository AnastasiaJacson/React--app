import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from '../about';
import AddCar from '../add-car';
import Navbar from '../common/navbar';
import EditCar from '../edit-car';
import HomePage from '../home-page';

const MainPage = () => {
  const links = [
    {
      label: 'Home',
      url: '/',
      display: true,
      element: (<HomePage />)
    },
    {
      label: 'Add car',
      url: 'add-car',
      display: true,
      element: (<AddCar />)
    },
    {
      label: 'Edit car',
      url: '/edit-car/:carId',
      display: false,
      element: (<EditCar />)
    },
    {
      label: 'About',
      url: 'about',
      display: true,
      element: (<About />)
    },
  ];

  const routes = links.map((l, i) => (
    <Route key={i} path={l.url} element={l.element} />
  ));

  return (
    <div>
      <BrowserRouter>
        <Navbar links={links} />
        <Routes>
          {routes}
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default MainPage;
