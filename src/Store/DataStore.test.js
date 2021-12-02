import DataStore from '../Store/DataStore';
import TimeDate from '../Store/TimeDate';
import Archives from '../Store/Archives';
import Trash from '../Store/Trash';

let currentData

test('This should return the type of the data that are stored in it',() => {
    DataStore.subscribe((data) =>{
        currentData = data;
    });
    expect(typeof currentData).toBe('object');

    TimeDate.subscribe((data) =>{
        currentData = data;
    });
    expect(typeof currentData).toBe('object');

    Archives.subscribe((data) =>{
        currentData = data;
    });
    expect(typeof currentData).toBe('object');

    Trash.subscribe((data) =>{
        currentData = data;
    });
    expect(typeof currentData).toBe('object');
})