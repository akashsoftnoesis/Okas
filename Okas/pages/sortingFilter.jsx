import React, { useState } from 'react';
import { Button } from "reactstrap";
import orderBy from 'lodash.orderby';
import Select from 'react-select';

function SortingFilter({ propertiesData = [], onSorting, setSortData, sortData, onChangeClass, category }) {
    const [sortedData, setSortedData] = useState([]);

    const sortPropertyData = (field) => {
                switch (field) {
                    case 'newestListings':
                        return category 
                            ? orderBy(propertiesData, [obj => new Date(obj?.saleDetails?.unconditional || obj.publishedToWeb || obj.inserted)], ['desc'])
                            : orderBy(propertiesData, [obj => new Date(obj?.saleDetails?.unconditional || obj.inserted)], ['desc']);
                    case 'oldListings':
                        return category 
                            ? orderBy(propertiesData, [obj => new Date(obj?.saleDetails?.unconditional || obj.publishedToWeb || obj.inserted)], ['asc'])
                            : orderBy(propertiesData, [obj => new Date(obj?.saleDetails?.unconditional || obj.inserted)], ['asc']);
                    case 'hightoLow':
                        return orderBy(propertiesData, [obj => Number(obj.searchPrice)], ['desc']);
                    case 'lowtohigh':
                        return orderBy(propertiesData, [obj => Number(obj.searchPrice)], ['asc']);
                    default:
                        return propertiesData;
                }
            };

    if (sortedData.length === 0 && propertiesData.length > 0) {
        const initialData = sortPropertyData(sortData || 'newestListings');
        // console.log(initialData);
        
        setSortedData(initialData);
        onSorting && onSorting(initialData || []);
    }

    const sortHandler = (e) => {
        const value = e.value;
        console.log(value);
        
        setSortData && setSortData(value);
        const data = sortPropertyData(value);
        setSortedData(data);
        
        onSorting && onSorting(data || []);
    };

    const setOnClassHandler = () => {
        onChangeClass(true);
    };

    const customStyles = {
        menu: (provided) => ({
            ...provided,
            zIndex: 999999999
        }),
        option: (provided, state) => ({
            ...provided,
            innerHeight: 40,
            backgroundColor: state.isSelected ? '#000' : state.isFocused ? 'rgba(0,0,0,0.05)' : '',
        }),
    };

    const sortOrderOption = [
        { label: 'Newest First', value: 'newestListings' },
        { label: 'Oldest First', value: 'oldListings' },
        { label: 'Price High → Low', value: 'hightoLow' },
        { label: 'Price Low → High', value: 'lowtohigh' },
    ];

    return (
        <div className="show-result-holder">
            <div className="filter-wrapper">
                <h3>Sort Order:</h3>
                <Select 
                    options={sortOrderOption} 
                    styles={customStyles} 
                    name="sorting" 
                    defaultValue={sortOrderOption.find(option => option.value === sortData) || sortOrderOption[0]}
                    id="exampleSelect" 
                    isSearchable={false} 
                    placeholder="Newest First" 
                    onChange={(e) => sortHandler(e)}
                />
            </div>
            {onChangeClass && 
                <div className='filter-option' onClick={setOnClassHandler}>
                    <Button color="secondary" className="edit-filter-button font2">Edit Filters</Button>
                </div>}
        </div>
    );
}

export default SortingFilter;

// import React, { useState } from 'react';
// import { Button } from "reactstrap";
// import orderBy from 'lodash.orderby';
// import Select from 'react-select';

// function SortingFilter({ propertiesData = [], onSorting, setSortData, sortData, onChangeClass, category }) {
//     const [sortedData, setSortedData] = useState([]);

//     const sortPropertyData = (field) => {
//         switch (field) {
//             case 'newestListings':
//                 return category 
//                     ? orderBy(propertiesData, [obj => new Date(obj?.saleDetails?.unconditional || obj.publishedToWeb || obj.inserted)], ['desc'])
//                     : orderBy(propertiesData, [obj => new Date(obj?.saleDetails?.unconditional || obj.inserted)], ['desc']);
//             case 'oldListings':
//                 return category 
//                     ? orderBy(propertiesData, [obj => new Date(obj?.saleDetails?.unconditional || obj.publishedToWeb || obj.inserted)], ['asc'])
//                     : orderBy(propertiesData, [obj => new Date(obj?.saleDetails?.unconditional || obj.inserted)], ['asc']);
//             case 'hightoLow':
//                 return orderBy(propertiesData, [obj => Number(obj.searchPrice)], ['desc']);
//             case 'lowtohigh':
//                 return orderBy(propertiesData, [obj => Number(obj.searchPrice)], ['asc']);
//             default:
//                 return propertiesData;
//         }
//     };
    

//     if (sortedData.length === 0 && propertiesData.length > 0) {
//         const initialData = sortPropertyData(sortData || 'newestListings');
        
//         setSortedData(initialData);
//         onSorting && onSorting(initialData || []);
//     }

//     const sortHandler = (e) => {
//         const value = e.value;
//         setSortData && setSortData(value);
//         const data = sortPropertyData(value);
//         setSortedData(data);
        
//         onSorting && onSorting(data || []);
//     };

//     const setOnClassHandler = () => {
//         onChangeClass(true);
//     };

//     const customStyles = {
//         menu: (provided) => ({
//             ...provided,
//             zIndex: 999999999
//         }),
//         option: (provided, state) => ({
//             ...provided,
//             innerHeight: 40,
//             backgroundColor: state.isSelected ? '#000' : state.isFocused ? 'rgba(0,0,0,0.05)' : '',
//         }),
//     };

//     const sortOrderOption = [
//         { label: 'Newest First', value: 'newestListings' },
//         { label: 'Oldest First', value: 'oldListings' },
//         { label: 'Price High → Low', value: 'hightoLow' },
//         { label: 'Price Low → High', value: 'lowtohigh' },
//     ];

//     return (
//         <div className="show-result-holder">
//             <div className="filter-wrapper">
//                 <h3>Sort Order:</h3>
//                 <Select 
//                     options={sortOrderOption} 
//                     styles={customStyles} 
//                     name="sorting" 
//                     defaultValue={sortOrderOption.find(option => option.value === sortData) || sortOrderOption[0]}
//                     id="exampleSelect" 
//                     isSearchable={false} 
//                     placeholder="Newest First" 
//                     onChange={(e) => sortHandler(e)}
//                 />
//             </div>
//             {onChangeClass && 
//                 <div className='filter-option' onClick={setOnClassHandler}>
//                     <Button color="secondary" className="edit-filter-button font2">Edit Filters</Button>
//                 </div>}
//         </div>
//     );
// }

// export default SortingFilter;
