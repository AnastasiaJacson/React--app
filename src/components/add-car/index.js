import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataStorageContext } from "../../contexts/data-storage-context";
import CheckboxCollection from "../common/checkbox-collection";
import Dropdown from "../common/dropdown";
import Radiobutton from "../common/radiobutton";
import TextInput from "../common/text-input";
import Textarea from "../common/textarea";

export const CAR_STATES = ['New', 'Used', 'Broken'];

const AddCar = () => {
  const { state, dispatch, dataActions } = useDataStorageContext();
  const navigate = useNavigate();

  const [brandId, setBrandId] = useState(0);
  const [modelId, setModelId] = useState(0);
  const [fuelIds, setFuelIds] = useState([]);
  const [carState, setCarState] = useState('');
  const [title, setTitle] = useState('');
  const [imageB64, setImageB64] = useState('');
  const [description, setDescription] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  // let validationErrors = {};

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
          if (val.length === 0) {
            return 'At least one fuel type must be chosen';
          }

          if (val.length === 2 && gasoline && diesel) {
            return 'Car cannot have gasoline and diesel at the same time';
          }

          if (val.length > 2) {
            return 'Car cannot have more than 2 fuel types';
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

  const addCar = () => {
    const ve = validate();
    if (Object.entries(ve).length) {
      setValidationErrors(ve);
      return;
    }

    const car = {
      brandId,
      brand: state.brands[brandId],
      modelId,
      title,
      fuelIds,
      state: carState,
      imageB64,
      description
    };

    dispatch(dataActions.addCar(car));
    navigate('/');
  };

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
      <button onClick={addCar}>Add car</button>
    </div>
  );
};

export default AddCar;
