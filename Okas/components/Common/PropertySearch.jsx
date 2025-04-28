import { Col, Input, Row, Button, FormGroup } from "reactstrap";
import Select from 'react-select'
import { useEffect, useState } from "react";
import { ApiGet } from "../../helper/ApiData";
import { useRouter } from "next/router";

const Type = [
    { value: 'Residential', label: 'Residential' },
    { value: 'Commercial', label: 'Commercial' },
    { value: 'Business', label: 'Business' },
    { value: 'Rural', label: 'Rural' },
    { value: 'Land', label: 'Land' },
]
const Status = [
    { value: 'sale', label: 'For Sale' },
    { value: 'lease', label: 'For Rent' },
    { value: 'sold', label: 'Sold' },
]

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#000' : state.isFocused ? 'rgba(0,0,0,0.05)' : '',
    }),
}
export default function PropertySearch() {
    const router = useRouter();
    const [typeDropDown, setTypeDropDown] = useState({})
    const [serachData, setSerachData] = useState({
        category: { value: 'sale', label: 'For Sale' },
        type: {},
        search: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiGet(`types/propertyClass`);
                if (response.status === 200) {
                    const types = response.data.data.items.map(item => ({ value: item.internalName, label: item.name }))
                    const isResidential = types.find(item => item.value.toLowerCase() === "residential");
                    setTypeDropDown(types);
                    setSerachData({
                        ...serachData,
                        type: isResidential
                    });
                }
            } catch (error) {
                console.log('error', error)
            }
        }
        fetchData();
    }, [])

    const handleChange = (e, fieldName) => {
        if (fieldName) {
            setSerachData({
                ...serachData,
                [fieldName]: e
            })
            return
        }
        const { name, value } = e.target
        setSerachData({
            ...serachData,
            [name]: value
        })
    }

    const serachHandler = () => {
        router.push({
            pathname: `/search`,
            query: {
                category: serachData.category.value,
                type: serachData.type.value,
                search: serachData.search,
            }
        });
    }

    return (
        <div className="search-box-area">
            <Row noGutters>
                <Col lg={2} className="search-box-col sale-col">
                    <FormGroup>
                        <Select options={Status} value={serachData.category} styles={customStyles} name="category" isSearchable={false} onChange={val => handleChange(val, 'category')} />
                    </FormGroup>
                </Col>
                <Col lg={2} className="search-box-col residential-col">
                    <FormGroup>
                        <Select options={typeDropDown} value={serachData.type} styles={customStyles} name="type" isSearchable={false} onChange={val => handleChange(val, 'type')} />
                    </FormGroup>
                </Col>
                <Col lg={5} className="search-box-col search-input-wrap">
                    <FormGroup>
                        <Input type="text" placeholder="Search by address, suburbs, or postcode" name="search" onChange={handleChange} />
                    </FormGroup>
                </Col>
                <Col lg={3} className="search-box-col search-button-wrap">
                    <Button color="secondary" block className="h-100" onClick={serachHandler}> Search Properties <i className="fa fa-search ml-2" aria-hidden="true"></i></Button>
                </Col>
            </Row>
        </div>
    )
}