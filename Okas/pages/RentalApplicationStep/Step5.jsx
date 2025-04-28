/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { FormGroup, Button, Col, Row, Alert } from "reactstrap";
import Pdf from "../../public/assets/images/pdf.svg";
import Doc from "../../public/assets/images/doc.svg";
import Image from 'next/image'
import Dropzone from "react-dropzone";

const titles = {
    rentalHistory: {
        title: "Rental History",
        discription: <><li>Two previous rental receipts (if direct deposit, please provide a copy of your bank statement)</li>
        <li>References from previous landlord/agent</li>
        <li>A copy of the lease agreement</li>
        <li>Tenancy ledger (This can be obtained from your current managing agent)</li></>,
        subDiscription: <p>If you do not have rental history (ie. You have previously owned a property), please provide us with proof of
        your ownership such as council rates.</p>,
    },
    proofOfIncome: {
        title: "Proof of income",
        discription: <><li>Two previous pay slips or written reference from your employer confirming you position, salary and duration
        of service with the company</li>
        <li>If you are self‐employed, please provide a copy of the business registration and your most recent tax return</li></>,
    },
    identificationProof: {
        title: "Proof of Identification (Including photo ID)",
        discription: <><li>Birth Certificate and/or passport</li>
        <li>{`Driver's license`}</li>
        <li>Medicare card</li>
        <li>Identification/Student card</li></>,
    },
    residentialAddress: {
        title: "Proof of Residential Address",
        discription: <> <li>Phone, water, electricity or gas bill</li>
        <li>Current motor vehicle registration papers</li></>,
    },
}

export default function Step5({ rentalApplicationData, handleApplicationData, handleNext, handleBack }) {

    const [fileError, setFileError] = useState(false)
    const [fileTypeError, setFileTypeError] = useState(false)
    const [document, setDocument] = useState({});
    const [error, setError] = useState('')
    const [fileNames, setFileNames] = useState([]);
    const handleDrop = acceptedFiles => setFileNames(acceptedFiles);

    const [allFilesData, setAllFilesData] = useState([
        {
            ...titles.rentalHistory,
            field: "rentalHistory",
            value: [],
            error: ""
        },
        {
            ...titles.proofOfIncome,
            field: "incomeProof",
            value: [],
            error: ""
        },
        {
            ...titles.identificationProof,
            field: "identificationProof",
            value: [],
            error: ""
        },
        {
            ...titles.residentialAddress,
            field: "residentialAddress",
            value: [],
            error: ""
        },
    ])

    useEffect(() => {
        if(rentalApplicationData?.images) {
            const newArray = allFilesData.map(item => {
                const findValue = rentalApplicationData?.images.filter(data => item.field === data.name)
                return {
                    ...item,
                    value: findValue
                }
            })
            setAllFilesData(newArray)
        }
    }, [rentalApplicationData?.images])

    const getBase64 = file => {
        return new Promise(resolve => {
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };

    const validateFiles = () => {
        let valid = true
        allFilesData.forEach(item => {
            if(item.value.length === 0) {
                valid = false
            } 
        })
        if(!valid){
            window.scrollTo(0,0)
            setFileError(true)
            setTimeout(() => {
                setFileError(false)
            }, 3000);
        }
        return valid
    }

    const handleSubmit = async () => {
        if(validateFiles()) {
            const images = []
            for (const item of allFilesData) {
                for (const iterator of item.value) {
                    const image = await getBase64(iterator.value)
                    images.push({ path: image, fileName: iterator.fileName, value: iterator.value, name: iterator.name })
                }
            }
            handleApplicationData('step5', { images }, true);
            handleNext();
        }
    }

    const dropHandler = (val, index) => {
        const fileCopy = allFilesData.slice();
        let isValidSize = false
        val.forEach(item => {
            if(!fileValidation(item)) isValidSize = true
            if(item.size > 2097152){
                fileCopy[index].error = "Please upload file less than 2 mb"
                isValidSize = true
                }
        })
        if(!isValidSize) {
            const filesArray = []
            val.forEach(item => {
                const splittedFileName = item?.name.split(".")
                const newFileName = fileCopy[index].title + '.'+ splittedFileName[1]
                filesArray.push({value: item, fileName: newFileName, name: fileCopy[index].field})
            })
            fileCopy[index].value = [...fileCopy[index].value, ...filesArray];
            fileCopy[index].error = "";
        }
        setAllFilesData(fileCopy);
    }
    
    const deleteHandler = (e, index, imageIndex) =>  {
        e.preventDefault();
        e.stopPropagation();
        const fileCopy = allFilesData.slice();
        fileCopy[index].value.splice(imageIndex, 1)
        setAllFilesData(fileCopy);
    }

    const fileValidation = file => {
        console.log('file',file)
        const fileType = file.type
        const validFileTypes = ["image/apng", "image/avif", "image/gif", "image/jpeg", "image/webp", "image/svg+xml", "image/png", "application/pdf", "application/msword","file/docx","file/doc", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
        if(!validFileTypes.includes(fileType)) {
            setFileTypeError(true)
            setTimeout(() => {
                setFileTypeError(false)
            }, 3000);
            return false
        }
        return true
    }

    const classToFile = file => {
        const fileType = file.value.type;
        console.log(fileType);
        const imageTypes = ["image/apng", "image/avif", "image/gif", "image/jpeg", "image/webp", "image/svg+xml", "image/png"];
        const pdfTypes = ["application/pdf"];
        const decTypes = ["application/msword","file/docx","file/doc", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        if(imageTypes.includes(fileType)) {
            return "image"
        }else if(pdfTypes.includes(fileType)){
            return "pdf"
        }else{
            return "doc"
        }
        
    }
    return (
        <div className="form-section">
            {fileError && <Alert color="danger">Please upload atleat one file for all</Alert>}
            <div className="form-group-block identification-header mb-4">
                <h3 className="mb-2">Identification and supporting documentation</h3>
                <p className="mb-0">Property Managers need to verify your identity and like to confirm your rental history and ability to afford the rent. Please provide as many of the following as you can to accompany your application:</p>
            </div>
            <div className="form-group-block mb-4">
            <FormGroup className="mb-5">
                <Row>

                    {
                        allFilesData.map((item, index) => {
                            return  (
                                <Col lg={6} className="mb-4" key={index}>
                                    <div className="img-uploader-box d-flex flex-column h-100">
                                        <h5>{item.title}</h5>
                                        <ul className="national-tenancy-ul mb-2">
                                            {item.discription}
                                        </ul>
                                    {item.subDiscription && <div className="identification-pera">
                                            {item.subDiscription}
                                        </div>}
                                        <FormGroup className="mb-0 mt-auto">
                                            <Dropzone
                                                onDrop={val => dropHandler(val,index)}
                                                // accept="image/*"
                                                // minSize={1024}
                                                // maxSize={3072000}
                                            >
                                                {({ getRootProps, getInputProps }) => (
                                                <div {...getRootProps({ className: "dropzone" })}>
                                                    <input onChange={val => dropHandler(val,index)} {...getInputProps()} />
                                                    <div className="identificationUpload-wrapper">
                                                        <div className="identificationUploadBg-svg">
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -90 512 512" width="40px" fill="#e1e1e1"><path d="m391.066406 87.734375c-13.164062-24.558594-32.285156-45.433594-55.761718-60.769531-27.007813-17.640625-58.398438-26.964844-90.785157-26.964844-80.511719 0-148.742187 57.386719-163.339843 135.320312-46.394532 8.601563-81.179688 49.371094-81.179688 97.714844 0 54.808594 44.589844 99.398438 99.398438 99.398438h141.601562v-125.824219l-31.78125 31.78125c-5.859375 5.855469-15.355469 5.855469-21.214844 0-5.859375-5.859375-5.859375-15.355469 0-21.214844l57.390625-57.386719c5.855469-5.859374 15.351563-5.859374 21.210938 0l57.390625 57.386719c5.859375 5.859375 5.859375 15.355469 0 21.214844-2.929688 2.929687-6.769532 4.394531-10.605469 4.394531-3.839844 0-7.679687-1.464844-10.609375-4.394531l-31.78125-31.78125v125.824219h118.644531c67.46875 0 122.355469-54.886719 122.355469-122.355469 0-66.992187-54.117188-121.582031-120.933594-122.34375zm0 0"/></svg>
                                                        </div>
                                                    
                                                        <div className="identificationUpload-file">
                                                            {   
                                                                item?.value?.map((file, i) => {
                                                                    const className = classToFile(file)
                                                                    return(
                                                                <div className="singleIdentity-img" key={i}>
                                                                    <span className="si-close-icon" onClick={(e)=>deleteHandler(e, index, i)}>x</span>
                                                                    <div className={`singleIdentity-img-wrap ${className}`}>
                                                                        {
                                                                            className === "doc" ?
                                                                            <>
                                                                                <img src={Doc.src} />
                                                                                <p className="upload-file-name">{file.value.name}</p>
                                                                            </> :
                                                                            className === "pdf" ?
                                                                            <>
                                                                                <img src={Pdf.src} />
                                                                                <p className="upload-file-name">{file.value.name}</p>
                                                                            </> :
                                                                            <img src={URL.createObjectURL(file.value)} alt="fileUpload"/>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                )})
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                )}
                                            </Dropzone>
                                        </FormGroup>
                                        {item.error && <div className="file-upload-error">{item.error}</div>}
                                    </div>
                                </Col>
                            )
                        })
                    }


                    {/* <Col lg={6} className="mb-3">
                        <div className="img-uploader-box d-flex flex-column h-100">
                            <h5>Rental History</h5>
                            <ul className="national-tenancy-ul mb-2">
                                <li>Two previous rental receipts (if direct deposit, please provide a copy of your bank statement)</li>
                                <li>References from previous landlord/agent</li>
                                <li>A copy of the lease agreement</li>
                                <li>Tenancy ledger (This can be obtained from your current managing agent)</li>
                            </ul>
                            <div className="identification-pera">
                                <p>If you do not have rental history (ie. You have previously owned a property), please provide us with proof of
                                your ownership such as council rates.</p>
                            </div>
                            <FormGroup className="mb-0 mt-auto">
                                <Dropzone
                                    onDrop={handleDrop}
                                    accept="image/*"
                                    minSize={1024}
                                    maxSize={3072000}
                                >
                                    {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps({ className: "dropzone" })}>
                                        <input {...getInputProps()} />
                                        <p>Drag'n'drop images, or click to select files</p>
                                    </div>
                                    )}
                                </Dropzone>
                                <div>

                                    {   
                                              fileNames?.map((item, i) => (
                                                <div className="singleProduct-img" key={i}>
                                                  <span onClick={(e) => handleDelete(e, val.productDetails, setFieldValue, index, i)}>X</span>
                                                  <div className="singleProduct-img-wrap">
                                                    <img
                                                      src={URL.createObjectURL(item)}
                                                      alt="abc"
                                                    />
                                                  </div>
                                                </div>
                                              ))
                                            }
                                </div>
                            </FormGroup>
                        </div>
                    </Col>
                    <Col lg={6} className="mb-3">
                        <div className="img-uploader-box d-flex flex-column h-100">
                            <h5>Proof of income</h5>
                            <ul className="national-tenancy-ul mb-2">
                                <li>Two previous pay slips or written reference from your employer confirming you position, salary and duration
                                    of service with the company</li>
                                <li>If you are self‐employed, please provide a copy of the business registration and your most recent tax return</li>
                            </ul>
                            <FormGroup className="mb-0 mt-auto">
                                <div className="upload-btn-wrapper">
                                    <label htmlFor="upload4"><i className="fa fa-upload mb-0"></i> 
                                    {document?.incomeProof ? <p className="mb-0">{document?.incomeProof?.value?.name}</p> : <p className="mb-0">Upload Documents Here</p> }
                                    <input type="file" id="upload4" name="incomeProof" onChange={e => handleChange(e, 'Proof of income')} />
                                        </label>
                                </div>
                            </FormGroup>
                        </div>
                    </Col>
                    <Col lg={6} className="mb-3" >
                        <div className="img-uploader-box d-flex flex-column h-100">
                            <h5>Proof of Identification (Including photo ID)</h5>
                            <ul className="national-tenancy-ul mb-2">
                                <li>Birth Certificate and/or passport</li>
                                <li>{`Driver's license`}</li>
                                <li>Medicare card</li>
                                <li>Identification/Student card</li>
                            </ul>
                            <FormGroup className="mb-0 mt-auto">
                                <div className="upload-btn-wrapper">
                                    <label htmlFor="upload1"><i className="fa fa-upload mb-0"></i> {document?.identificationProof ? <p className="mb-0">
                                        {document?.identificationProof?.value?.name}</p> : <p className="mb-0">Upload Documents Here</p> }
                                        <input type="file" id="upload1" name="identificationProof" onChange={e => handleChange(e, 'Proof of Identification')} />
                                    </label>
                                    
                                </div>
                            </FormGroup>
                        </div>
                    </Col>
                    <Col lg={6} className="mb-3">
                        <div className="img-uploader-box d-flex flex-column h-100">
                            <h5>Proof of Residential Address</h5>
                            <ul className="national-tenancy-ul mb-2">
                                <li>Phone, water, electricity or gas bill</li>
                                <li>Current motor vehicle registration papers</li>
                            </ul>
                            <FormGroup className="mb-0 mt-auto">
                                <div className="upload-btn-wrapper">
                                    <label htmlFor="upload3"><i className="fa fa-upload mb-0"></i>{document?.residentialAddress ? <p className="mb-0">
                                        {document?.residentialAddress?.value?.name}</p> : <p className="mb-0">Upload Documents Here</p> }
                                        <input type="file" id="upload3" name="residentialAddress" onChange={e => handleChange(e, 'Proof of Residential Address')} />
                                    </label>
                                </div>
                            </FormGroup>
                        </div>
                    </Col> */}
                </Row>
                {fileTypeError && <Alert color="danger">Only Image, Docs {`&`} Pdf  formate is allowd</Alert>}
                </FormGroup>
            </div>
            <div className="step-btn">
                <Button color="secondary" onClick={handleBack} >
                    Back
                </Button>
                <Button color="secondary ml-auto" onClick={handleSubmit} >
                    Save & Continue
                </Button>
            </div>
        </div>
    )
}