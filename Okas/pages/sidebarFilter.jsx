
import React, { useEffect, useState } from 'react'
import { Input, FormGroup, Button, Label, Row, Col } from "reactstrap";
import refresh from "../public/assets/images/refresh.svg"
import bed from "../public/assets/images/bed.svg";
import bath from "../public/assets/images/bath.svg";
import Image from "next/image";
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { Range, getTrackBackground } from 'react-range';
import { ApiGet } from '../helper/ApiData';
import orderBy from 'lodash.orderby';
import Select from 'react-select';

const commonRadioOptions = [
    { name: 'Any', value: '' },
    { name: '1', value: '1' },
    { name: '2', value: '2' },
    { name: '3', value: '3' },
    { name: '4', value: '4' },
    { name: '5+', value: '5' }
];

const commomRadioFields = [{ fieldName: 'Bedroom', field: 'bed' }, { fieldName: 'Bathroom', field: 'bath' }, { fieldName: 'Garage', field: 'garage' }];

function SidebarFilter({ propertiesData, onSidebarFilter, sortData, filterOption, filterClose }) {
    const [filterData, setFilterData] = useState({
        price: [0, 0],
        bath: "",
        bed: "",
        garage: ""
    })
    const [propertyClassDropDownData, setPropertyClassDropDownData] = useState([])
    const [neighbourhoodDropDownData, setNeighbourhoodDropDownData] = useState([])
    const [modifyneighbourhoodDownData, setModifyneighbourhoodDownData] = useState([])
    const [price, setPrice] = useState({
        min: 0,
        max: 0,
        value: [0, 0]
    });
    const [rangeFilterVisible, setRangeFilterVisiblity] = useState(false);

    const toggleRangeDropdown = () => {
        setRangeFilterVisiblity(state => !state);
    }

    const capitalizedName = (name) => {
        const arr = name.toLowerCase().split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        const str2 = arr.join(" ");
        return str2
    }

    const neighbourhoodDataHandler = () => {
        let data = propertiesData && propertiesData.map(item => capitalizedName(item.address.suburb.name) + ' - ' + item.address.suburb.postcode)
        data = orderBy(data, [obj => obj], 'asc')
        const uniq = [...new Set(data)];
        setNeighbourhoodDropDownData(uniq);
    }

    const getAPrices = (reset) => {
        let searchPriceData = propertiesData && propertiesData.map(item => item.searchPrice)
        searchPriceData = orderBy(searchPriceData, [obj => obj], 'asc')
        if (searchPriceData.length) {
            const minPrice = searchPriceData.length === 1 ? 0 : searchPriceData[0]
            const maxPrice = searchPriceData.length === 1 ? searchPriceData[0] : searchPriceData[searchPriceData.length - 1]
            setPrice({
                min: minPrice,
                max: maxPrice,
            })
            !reset ? setFilterData({
                ...filterData,
                price: [minPrice, maxPrice]
            }) : setFilterData({
                price: [minPrice, maxPrice]
            })
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiGet(`types/propertyClass`);
                if (response.status === 200) {
                    setPropertyClassDropDownData(response.data.data.items)
                }
            } catch (error) {
                console.log('error', error)
            }
        }
        fetchData();
    }, [])

    const priceChangeHadler = val => {
        setFilterData({
            ...filterData,
            price: val
        });
    };

    useEffect(() => {
        neighbourhoodDataHandler();
        getAPrices();
    }, [propertiesData]);

    const onChangeHandler = (e, name) => {
        if (name) {
            setFilterData({
                ...filterData,
                [name]: e
            })
        } else {
            setFilterData({
                ...filterData,
                [e.target.name]: e.target.value
            });
        }
    };

    const resetFilter = () => {
        setFilterData({
            price: [0, 0],
            bath: "",
            bed: "",
            garage: ""
        });
        getAPrices('reset');
        const sortedData = sortData ? sortPropertyData(sortData, propertiesData) : propertiesData;
        onSidebarFilter(sortedData || [])
        filterClose('loader');
    }

    const sortPropertyData = (field, array) => {
        switch (field) {
            case 'newestListings':
                return orderBy(array, [obj => new Date(obj.publishedToWeb)], ['desc']);
            case 'oldListings':
                return orderBy(array, [obj => new Date(obj.publishedToWeb)], ['asc']);
            case 'hightoLow':
                return orderBy(array, [obj => Number(obj.searchPrice)], ['desc']);
            case 'lowtohigh':
                return orderBy(array, [obj => Number(obj.searchPrice)], ['asc']);
            default:
                break;
        }
    }

    const handleCloseFilter = () => filterClose();

    const validateValueByFilter = (key, value, property) => {
        if (value) {
            switch (key) {
                case "serach":
                    return property.displayAddress
                        .toLowerCase()
                        .includes(value.toLowerCase());

                case "minPrice":
                    return property.searchPrice >= value;

                case "maxPrice":
                    return property.searchPrice <= value;

                case "price":
                    return property.searchPrice >= value[0] && property.searchPrice <= value[1];

                case "propertyName":
                    return property.class.name.toLowerCase() === value.toLowerCase()

                case "neighbourhood":
                    return value.toLowerCase().includes(property.address.suburb.name.toLowerCase()) && value.toLowerCase().includes(property.address.suburb.postcode.toLowerCase())

                case "bed":
                    return value < 5
                        ? property.bed === Number(value)
                        : property.bed >= value;

                case "bath":
                    return value < 5
                        ? property.bath === Number(value)
                        : property.bath >= value;

                case "garage":
                    return value < 5
                        ? property.garages === Number(value)
                        : property.garages >= value;

                default:
                    return false;
            }
        }
    };


    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            innerHeight: 40,
            backgroundColor: state.isSelected ? '#000' : state.isFocused ? 'rgba(0,0,0,0.05)' : '',
        }),
    }

    const serachHandler = () => {
        let newFilterData = {}
        Object.keys(filterData).forEach(item => {
            if (filterData[item] !== '') {
                newFilterData[item] = filterData[item]
            }
        })
        const response = propertiesData.filter((property) => {
            return Object.keys(newFilterData).every((filter) => validateValueByFilter(filter, filterData[filter], property));
        });
        const sortedData = sortData ? sortPropertyData(sortData, response) : response;
        onSidebarFilter(sortedData || [])
        filterClose('loader');
    }
    useEffect(() => {
        const modifyArray = neighbourhoodDropDownData.length && neighbourhoodDropDownData.map((item) => ({ label: item, value: item }))
        if (modifyArray.length) {
            modifyArray?.unshift({ label: 'Any', value: '' })
            setModifyneighbourhoodDownData(modifyArray)
        }
    }, [neighbourhoodDropDownData])
    return (
        <>
            <div className={`filter-wrap ${filterOption ? 'open' : ''}`}>
                <span className="filter-close" onClick={handleCloseFilter}>x</span>
                <h3 className="mb-4 px-4">Filter Option</h3>
                <div className="filter_option">
                    <FormGroup>
                        <div className="search-field">
                            <i className="fa fa-search"></i>
                            <Input type="text" value={filterData.serach || ""} name="serach" placeholder="Search By Address, Suburb" onChange={onChangeHandler} />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <h5 className="font2 font-weight-bold mb-2">Property Type</h5>
                        <div className="custom_checkbox">
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="propertyName" value="" onChange={onChangeHandler} />
                                    <span>Any</span>
                                </Label>
                            </FormGroup>
                            {
                                propertyClassDropDownData && propertyClassDropDownData.map(item => (
                                    <FormGroup check key={item}>
                                        <Label check>
                                            <Input type="radio" name="propertyName" value={item.internalName} onChange={onChangeHandler} />
                                            <span>{item.name}</span>
                                        </Label>
                                    </FormGroup>
                                )
                                )}
                            {/* </Input> */}
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Row className="align-items-center">
                            <Col md={4}>
                                <Label className="standard-label font2 text-uppercase">Neighbourhood</Label>
                            </Col>
                            <Col md={8}>
                                <div className="custom_select">
                                    <Select options={modifyneighbourhoodDownData.length && modifyneighbourhoodDownData} defaultValue={filterData.neighbourhood || ''} styles={customStyles} name="neighbourhood" onChange={(e) => onChangeHandler(e.value, "neighbourhood")} />
                                </div>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup className="pt-3">
                        <h5 className="font2 font-weight-bold mb-4">Property Features</h5>
                    </FormGroup>
                    {
                        commomRadioFields.map(field => (
                            <FormGroup key={field.fieldName}>
                                <Row className="align-items-center">
                                    <Col md={4}>
                                        <Label className="standard-label font2 text-uppercase">{field.fieldName}</Label>
                                    </Col>
                                    <Col md={8}>
                                        <div className="property-features">
                                            {
                                                commonRadioOptions.map(option => (
                                                    <FormGroup check key={option.value}>
                                                        <Label check>
                                                            <Input type="radio" name={field.field} checked={filterData[field.field] === option.value} value={option.value} onChange={onChangeHandler} />
                                                            <span className="font2 font-weight-light">{option.name}</span>
                                                        </Label>
                                                    </FormGroup>
                                                ))
                                            }
                                        </div>
                                    </Col>
                                </Row>
                            </FormGroup>
                        ))
                    }
                    <FormGroup className="pt-4">
                        <h5 className="font2 font-weight-bold mb-2">Price Filter</h5>
                    </FormGroup>
                    {price.max !== 0 && <FormGroup>
                        <div className="position-relative">
                            {/* <div className="range-slider" onClick={toggleRangeDropdown}>
                            Price
                        </div> */}
                            {/* <div className={`px-4 range-dropdown ${rangeFilterVisible ? 'open' : ''}`}> */}
                            <div className='px-2 range-dropdown'>
                                <Range
                                    values={filterData.price}
                                    step={1}
                                    min={price.min}
                                    max={price.max}
                                    onChange={priceChangeHadler}
                                    renderTrack={({ props, children }) => (
                                        <div
                                            onMouseDown={props.onMouseDown}
                                            onTouchStart={props.onTouchStart}
                                            style={{
                                                ...props.style,
                                                height: '36px',
                                                display: 'flex',
                                                width: '100%'
                                            }}
                                        >
                                            <div
                                                ref={props.ref}
                                                style={{
                                                    height: '5px',
                                                    width: '100%',
                                                    borderRadius: '4px',
                                                    background: 'linear-gradient(180deg, #FFA500, #FF0000)',
                                                    alignSelf: 'center'
                                                }}
                                            >

                                                {children}
                                            </div>
                                        </div>
                                    )}
                                    renderThumb={({ index, props }) => (
                                        <div
                                            {...props}
                                        >
                                            <div
                                                style={{
                                                    height: '16px',
                                                    width: '16px',
                                                    borderRadius: "100%",
                                                    border: "2px solid #FF0000",
                                                    backgroundColor: '#ffffff'
                                                }}
                                            />
                                        </div>
                                    )}
                                />
                                <div className="price-range">
                                    <span>${filterData.price[0]}</span>
                                    <span>${filterData.price[1]}</span>
                                </div>
                            </div>
                        </div>
                    </FormGroup>}
                </div>
                <div className="filter-btn">
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Button color="primary" block className="py-2" onClick={serachHandler}> <i className="fa fa-search mr-2" aria-hidden="true"></i> Apply Filter</Button>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <div className="search-option">
                                    <Button color="secondary" block onClick={resetFilter}><Image src={refresh} alt="" /> <span className="ml-2">Reset</span></Button>
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className={`customOverlay ${filterOption && `active`}`} onClick={handleCloseFilter}></div>
        </>
    )
}

export default SidebarFilter
