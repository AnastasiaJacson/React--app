import { CAR_STATES } from "../add-car";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDataStorageContext } from "../../contexts/data-storage-context";
import CheckboxCollection from "../common/checkbox-collection";
import Dropdown from "../common/dropdown";
import Radiobutton from "../common/radiobutton";
import TextInput from "../common/text-input";
import Textarea from "../common/textarea";

const EditCar = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch, dataActions } = useDataStorageContext();
  const car = state.cars[carId];

  const [brandId, setBrandId] = useState(car.brandId);
  const [modelId, setModelId] = useState(car.modelId);
  const [fuelIds, setFuelIds] = useState(car.fuelIds);
  const [carState, setCarState] = useState(car.state);
  const [title, setTitle] = useState(car.title);
  const [imageB64, setImageB64] = useState(car.imageB64);
  const [description, setDescription] = useState(car.description);
  const [validationErrors, setValidationErrors] = useState({});

  const onChangeImage = evt => {
    var reader = new FileReader();
    var file = evt.target.files[0];

    reader.onload = function (upload) {
      setImageB64(upload.target.result);
    };
    reader.readAsDataURL(file);
  };

  const form = {
    controls: {
      title: {
        valueRef: title,
        setter: setTitle,
        validator: val => !val ? 'Title cannot be empty' : null
      },
      brand: {
        valueRef: brandId,
        setter: setBrandId,
        validator: val => val === 0 ? 'You should choose a brand' : null
      },
      model: {
        valueRef: modelId,
        setter: setModelId,
        validator: val => val === 0 ? 'You should choose a model' : null
      },
      fuelIds: {
        valueRef: fuelIds,
        setter: setFuelIds,
        validator: val => {
          const gasoline = val.indexOf(1) > -1;
          const diesel = val.indexOf(2) > -1;
          if (val.length === 2 && gasoline && diesel) {
            return 'Car cannot have gasoline and diesel at the same time';
          }

          if (val.length > 2) {
            return 'Car cannot have more than 3 fuel types';
          }

          return null;
        }
      }
    }
  };

  const validate = () => Object.entries(form.controls)
    .map(([controlName, controlProps]) => ({ name: controlName, error: controlProps.validator(controlProps.valueRef) }))
    .filter(x => x.error)
    .reduce((a, v) => ({ ...a, [v.name]: v.error }), {});

  const defaultBrand = brandId !== 0 ? [] : [[0, { name: '' }]];

  const brandValues = defaultBrand.concat(Object.entries(state.brands)).map(([bId, b]) => ({ id: bId, name: b.name }));

  const onBrandIdChange = evt => {
    setModelId(0);
    setBrandId(evt.target.value);
  };

  const defaultModel = modelId !== 0 ? [] : [[0, { name: '' }]];

  const modelValues = brandId !== 0 ?
    defaultModel.concat(Object.entries(state.brands[brandId].models)).map(([mId, m]) => ({ id: mId, name: m.name })) : [];

  const fuelValues = Object.entries(state.fuels).map(([fId, f]) => ({ id: fId, name: f.name }));

  const fIdCheck = evt => {
    if (evt.target.checked) {
      setFuelIds([...fuelIds, +evt.target.value]);
    } else {
      setFuelIds(fuelIds.filter(x => x !== +evt.target.value));
    }
  };

  const carStateValues = CAR_STATES.map(cs => ({ state: cs }));

  const editCar = () => {
    const ve = validate();
    if (Object.entries(ve).length) {
      setValidationErrors(ve);
      return;
    }

    const newCar = {
      brandId,
      brand: state.brands[brandId],
      modelId,
      title,
      fuelIds,
      state: carState,
      imageB64,
      description
    };

    dispatch(dataActions.editCar(carId, newCar));
    navigate('/');
  }

  return (
    <div>
      <div className="mb-6">
        <input type="file"
          onChange={onChangeImage}
          encType="multipart/form-data" />
        <img src={imageB64} alt="car" className="max-w-md" />
      </div>
      <TextInput htmlId="title" label="Title" onChange={evt => setTitle(evt.target.value)} placeholder="Title here..." valueRef={title} errorMessage={validationErrors['title']} />
      <Dropdown htmlId="brand" labelProp="name" onChange={onBrandIdChange} valueProp="id" valueRef={brandId} values={brandValues} label="Brand" errorMessage={validationErrors['brand']} />
      <Dropdown htmlId="model" labelProp="name" onChange={evt => setModelId(evt.target.value)} valueProp="id" valueRef={modelId} values={modelValues} label="Model" errorMessage={validationErrors['model']} />
      <CheckboxCollection valueRef={fuelIds} htmlIdPrefix="fuel" label="" labelProp="name" valueProp="id" values={fuelValues} onClick={fIdCheck} errorMessage={validationErrors['fuelIds']} />
      <Radiobutton htmlIdPrefix="carstate" labelProp="state" onChange={setCarState} valueProp="state" valueRef={carState} values={carStateValues} />
      <Textarea htmlId="description" label="Description" onChange={evt => setDescription(evt.target.value)} placeholder="Detailed description here..." valueRef={description} />
      <button onClick={editCar}>Edit car</button>
    </div>
  );
};

export default EditCar;
