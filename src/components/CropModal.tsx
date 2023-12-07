import { useState } from 'react';

interface Crop {
  type: string;
  rank: string;
  days_to_harvest: number;
  regrow: number;
  seed_price: number;
  sell_price: number;
}

interface CropModalProps {
  season: string;
  isOpen: boolean;
  closeModal: () => void;
  arrayIndex: number;
  crops: {
    [seasonName: string]: {
      [cropName: string]: Crop;
    };
  };
}

const CropModal: React.FC<CropModalProps> = ({ season, crops, isOpen, closeModal, arrayIndex }) => {
  
  const [formData, setFormData] = useState({
    selectedCrop: '',
    amount: 0,
    cost: 0,
    arrayIndex: arrayIndex
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData((prevData)=> ({
        ...prevData,
        [name]: value
    }))
    
  }

  const handleCropSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = event.target;
    setFormData((prevData)=> ({
        ...prevData,
        [name]: value
    }))
  };

  const handleSubmit = (event:  React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();    
    calculateCropCost(cropsInSeason[formData.selectedCrop]);

    const cropsDataString = localStorage.getItem("crops");
    const existingCrop = cropsDataString ? JSON.parse(cropsDataString) : {};
    const updatedCrops = {...existingCrop, ...formData}
    const updatedCropString = JSON.stringify(updatedCrops);

    localStorage.setItem('crops', JSON.stringify(updatedCropString));
    const jsonString = localStorage.getItem('crops');
    if(jsonString) {
        const parsedData = JSON.parse(jsonString);
        console.log(parsedData);
    }
    
  }

  const calculateCropCost = (crop: any) => {
    const value = crop.seed_price * formData.amount;

    setFormData((prevData) => ({
        ...prevData,
        cost: value
    }) )

  }

  const cropsInSeason = crops[season] || {};

  return (
    <>
    {isOpen && (
        <div className='crop_modal'>
            <div className='modal'>
                <button onClick={closeModal}>X</button>
                <form onSubmit={handleSubmit} className='form-crop'>
                    <div className='form-control'>
                        <label>Plant Crop</label>
                        <select  id="cropSelect" name='selectedCrop' value={formData.selectedCrop} onChange={handleCropSelected}>
                            <option>Selecione uma safra</option>
                            {Object.keys(cropsInSeason).map((cropName, index) => (
                            <option key={index} value={cropName}>
                                {cropName}
                            </option>
                            ))}
                        </select>                     
                    </div>
                    <div className='form-control'>
                        <label>Amount</label>
                        <input className='form-control' type='number' name='amount' value={formData.amount} onChange={handleInputChange} />
                    </div>
                    <div className='form-control'>
                        <button type='submit'>+ add</button>
                    </div>
                </form>
                <div className='panel'>
                    <h6>Planting</h6>
                    <table className='plantingTable'>
                        <thead>
                            <tr>
                                <th>Crop</th>
                                <th>Amount</th>
                                <th>Cost</th>
                                <th>Days</th>
                                <th>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        
                            
                    
                                                
                        </tbody>
                    </table>
                </div>  
            </div>
            </div>
    )}
   
    </>
  );
};

export default CropModal;
