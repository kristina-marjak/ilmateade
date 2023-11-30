import { useState } from 'react';

const NewLocationForm = ({ onAddLocation }) => {
    const [newLocationName, setNewLocationName] = useState('');
    const [newLocationLatitude, setNewLocationLatitude] = useState('');
    const [newLocationLongitude, setNewLocationLongitude] = useState('');

    const handleAddClick = () => {
        if (newLocationName && newLocationLatitude && newLocationLongitude) {
            onAddLocation({
                name: newLocationName,
                latitude: newLocationLatitude,
                longitude: newLocationLongitude,
            });

            setNewLocationName('');
            setNewLocationLatitude('');
            setNewLocationLongitude('');
        }
    };

    return (
        <div className="form">
            <label>Nimi:</label>
            <input
                placeholder='Minsk'
                value={newLocationName}
                onChange={(e) => setNewLocationName(e.target.value)}
            />
            <label>Pikkuskraad:</label>
            <input
                placeholder='53.893009'
                value={newLocationLatitude}
                onChange={(e) => setNewLocationLatitude(e.target.value)}
            />
            <label>Laiuskraad:</label>
            <input
                placeholder='27.567444'
                value={newLocationLongitude}
                onChange={(e) => setNewLocationLongitude(e.target.value)}
            />
            <button
                onClick={handleAddClick}
                disabled={!newLocationName || !newLocationLatitude || !newLocationLongitude ? true : false}

            >
                Lisa asukoht
            </button>
        </div>
    );
};

export default NewLocationForm;