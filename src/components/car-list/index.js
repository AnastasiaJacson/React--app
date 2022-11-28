import { useDataStorageContext } from "../../contexts/data-storage-context";
import { NavLink } from 'react-router-dom';

const CarList = ({ cars, onDelete }) => {
  const { state } = useDataStorageContext();

  const carElements = cars
    .map(c => {
      const brand = state.brands[c.data.brandId];
      const model = brand.models[c.data.modelId];

      const header = `Brand: ${brand.name}, Model: ${model.name}`;

      return (
        <div key={c.id}>
          <NavLink to={`edit-car/${c.id}`} className="relative flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <button onClick={evt => {evt.preventDefault(); onDelete(c.id)}} className="border absolute right-1 top-1 text-red-600 hover:border-gray-400 text-lg inline-block hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg p-1.5" type="button">
              X
            </button>
            <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={c.data.imageB64} alt="" />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{header}</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{c.data.title}</p>
            </div>
          </NavLink>
        </div>
      );
    });

  return (<div>
    {carElements}
  </div>)
};

export default CarList;
