import React, { useEffect, useState } from "react";
import birthdays from '../data/birthdays.json';
import crops from '../data/crops.json';
import CropModal from "./CropModal";
const Calendar = () => {
    const selectedSeason = 'primavera'; // Change this based on your logic
    const selectedCrops = crops[selectedSeason];
    const [arrayIndex, setArrayIndex] = useState<number>(0);
    const [people, setPeople] = useState(Array(28).fill([]));
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        document.title = "Coral Island - Crop Planner";
        fetchBirthday();
    }, []);

    const fetchBirthday = async () => {
        try {
            const updatedPeople = [...people];
            birthdays.forEach(person => {
                const index = person.birthday - 1;
                updatedPeople[index] = [...updatedPeople[index], person];
            });
            setPeople(prevPeople => updatedPeople);
        } catch (error) {
            console.log(error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
      };

    const handleAddCrop = (index: number) => {
        setIsModalOpen(true);
        setArrayIndex(index);
        
    }
    return(
        <div className="calendarWrapper">
            <div className="season_picker">
                <div className="tab active">
                    <span className="season_name">Spring</span>
                    <span className="profit">0g</span>
                </div>
                <div className="tab">
                    <span className="season_name">Summer</span>
                    <span className="profit">0g</span>                    
                </div>
                <div className="tab">
                    <span className="season_name">Fall</span>
                    <span className="profit">0g</span>                    
                </div>
                <div className="tab">
                    <span className="season_name">Winter</span>
                    <span className="profit">0g</span>                    
                </div>
            </div>
            <div className="calendar">
                <div className="day_names">
					<div className="day_name">M</div>
					<div className="day_name">T</div>
					<div className="day_name">W</div>
					<div className="day_name">Th</div>
					<div className="day_name">F</div>
					<div className="day_name">Sa</div>
					<div className="day_name">Su</div>
				</div>
                <div className="days_container">
                    {people.map((items, index) => (
                        <div className="day" key={index}  onClick={() => handleAddCrop(index)}>
                            <div className="day_string">{index+1}</div>
                            {items.map((item: any, subIndex: number) => (
                                <div className="people_birthday" key={subIndex}>
                                    <img width="30px" src={`/assets/images/characters/${item.image}`} alt={item.name} />
                                    {item.name}`s Birthday
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <CropModal isOpen={isModalOpen} arrayIndex={arrayIndex} closeModal={closeModal} season={selectedSeason} crops={{ [selectedSeason]: selectedCrops }} />
        </div>
    )
}

export default Calendar;