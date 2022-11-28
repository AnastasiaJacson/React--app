import { useState } from "react";
import { useDataStorageContext } from "../../contexts/data-storage-context";
import CarList from "../car-list";
import Modal from "../common/modal";
import TextInput from "../common/text-input";
import './style.css';

const HomePage = () => {
  const { state, dispatch, dataActions } = useDataStorageContext();

  const [pageNum, setPageNum] = useState(1);
  const pageSize = 5;
  const [filterTitle, setFilterTitle] = useState('');
  const [deleteModalComponent, setDeleteModalComponent] = useState(null);

  let filteredCars = Object.entries(state.cars)
    .map(([cId, c]) => ({ id: cId, data: c }))
    .filter(c => {
      if (!filterTitle) {
        return true;
      }
      const brandContains = state.brands[c.data.brandId].name.toLowerCase().includes(filterTitle.toLowerCase());
      const modelContains = state.brands[c.data.brandId].models[c.data.modelId].name.toLowerCase().includes(filterTitle.toLowerCase());

      return brandContains || modelContains;
    });

  const maxPageNum = Math.ceil(filteredCars.length / pageSize);
  filteredCars = filteredCars.slice((pageNum - 1) * pageSize, pageNum * pageSize);

  const prevPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  const nextPage = () => {
    if (pageNum < maxPageNum) {
      setPageNum(pageNum + 1);
    }
  };

  const pageNumbers = [...Array(maxPageNum).keys()]
    .map(v => v + 1)
    .map((pn, i) => (
      <li key={i}>
        <span onClick={() => setPageNum(pn)} className={`cursor-pointer py-2 px-3 ${pageNum === pn ? "active-page" : "page-entry"}`}>{pn}</span>
      </li>
    ));

  const onClickDeleteCar = id => {
    const car = state.cars[id];
    const brand = state.brands[car.brandId];
    const model = brand.models[car.modelId];
    const deleteCar = e => {
      dispatch(dataActions.deleteCar(id));
      setDeleteModalComponent(null);
    };

    const buttons = (
      <>
        <button type="button" onClick={deleteCar} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Yes</button>
        <button type="button" onClick={e => setDeleteModalComponent(null)} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No</button>
      </>
    );

    const modal = (
      <Modal closeModal={() => setDeleteModalComponent(null)} header="Are you sure to delete?" buttons={buttons} >
        <div className="m-4">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Are you sure want to delete car {brand.name} {model.name}?
          </p>
        </div>
      </Modal>
    );

    setDeleteModalComponent(modal);
  };

  return (
    <div>
      <TextInput htmlId="search-title" label="Search title:" onChange={evt => setFilterTitle(evt.target.value)} placeholder="Filter title..." valueRef={filterTitle} />
      <CarList cars={filteredCars} onDelete={onClickDeleteCar} />

      <nav className="mt-6" aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px">
          <li>
            <span onClick={prevPage} className="cursor-pointer py-2 px-3 page-entry">Previous</span>
          </li>
          {pageNumbers}
          <li>
            <span onClick={nextPage} className=" cursor-pointer py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</span>
          </li>
        </ul>
      </nav>

      {deleteModalComponent}

    </div>
  )
};

export default HomePage;
