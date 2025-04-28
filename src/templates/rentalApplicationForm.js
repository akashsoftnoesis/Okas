module.exports = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rental Application Form</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Bitter:wght@100;200;300;400;500;600;700&display=swap');
        @font-face {font-family: "James Fajardo"; 
        src: url("${process.env.SITE_URL}/uploads/fonts/james-fajardo/James_Fajardo.eot"); 
        src: url("${process.env.SITE_URL}/uploads/fonts/james-fajardo/James_Fajardo.eot?#iefix") format("embedded-opentype"),
            url("${process.env.SITE_URL}/uploads/fonts/james-fajardo/James_Fajardo.woff2") format("woff2"),
            url("${process.env.SITE_URL}/uploads/fonts/james-fajardo/James_Fajardo.woff") format("woff"),
            url("${process.env.SITE_URL}/uploads/fonts/james-fajardo/James_Fajardo.ttf") format("truetype"),
            url("${process.env.SITE_URL}/uploads/fonts/james-fajardo/James_Fajardo.svg#James Fajardo") format("svg"); }
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body{
            background: #ffffff ;
            color: #000;
            font-family: 'Roboto', sans-serif;
            font-size: 16px;
            line-height: 1.2;
        }
        img{
            max-width: 100%;
            display: block;
        }
        hr{
            margin:0;
            border: 0;
            border-bottom: 1px solid #e1e1e1;
        }
        .container{
            max-width: 1200px;
            padding: 0 15px;
            margin: 0 auto;
            border:1px solid #e1e1e1;
        }
        .mb-0{
            margin-bottom: 0 !important;
        }
        .mb-5{
            margin-bottom: 5px;
        }
        .pl-20{
            padding-left: 20px;
        }
        .f-14{
            font-size: 14px;
        }
        .inner-container{
            max-width: 100%;
        }
        .flexbox{
            display: flex;
            flex-wrap: wrap;
        }
        .flex-nowrap{
            flex-wrap: nowrap !important;
        }
        .col-padding{
            padding: 0 15px;
        }
        .col-full{
            max-width: 100%;
            width: 100%;
        }
        .col-two{
            max-width: 50%;
            width: 100%;
        }
        .col-three{
            max-width: 33.33%;
            width: 100%;
        }
        .main-td{
            font-size: 12px;
        }
        .flex-1{
            flex: 1;
        }
        .form-head{
            padding: 20px 15px;
            margin-bottom: 15px;
            border-bottom: 1px solid #e1e1e1;
        }
        .form-head .formhead-row{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .checkbox-icon{
            margin-right: 5px;
        }
        .form-head .formhead-row h1{
            font-size: 28px;
            margin-bottom: 5px;
        }
        .text-right{
            text-align: right;
        }
        .form-head .formhead-row p{
            font-size: 14px;
        }
        .form-head .formhead-row .site-logo img{
            max-width: 120px;
        }
        .form-block-main-wrap{
            padding:15px 0;
        }
        .form-block-main{
            display: flex;
            background-color: #f1f1f1;
        }
        .form-block-main .form-block .form-block-content{
            padding: 10px 0;
        }
        .form-block-main .form-block .form-block-head h2{
            padding: 10px;
            background-color: #231f20;
            color: #fff;
            font-family: 'Bitter', serif;
            font-size: 20px;
            font-weight: 300;
            text-transform: capitalize;
        }
        .form-block-main .form-block .formblockContent-row{
            padding: 10px;
        }
        .form-block-main .form-block .formblockContentRow-wrap:not(:first-child){
            padding-top: 20px;
        }
        .form-block-main .form-block .formblockContent-row .tbl-th{
            font-family: 'Bitter', serif;
            font-weight: 700;
            margin-bottom: 10px;
            text-transform: capitalize;
        }
        .form-block-main .form-block .formblockContent-row .tbl-td{
            font-size: 14px;
        }
        .declarationbhead{
            padding: 10px;
            max-width: 100%;
            width: 100%;
        }
        .declarationhead-content{
            justify-content: space-between;
        }
        .declarationhead-content h3{
            font-size: 62px;
            line-height: 1;
            font-family: 'James Fajardo';
            color: #717171;
            font-weight: 300;
            margin-top: 10px;
        }
        @media print {
            .new-page {page-break-before: always;}
            .avoid-break {break-inside: avoid;}
        }
        @page {
            margin-top: 15px;
            margin-bottom: 15px;
            /* margin-left: 15px;
            margin-right: 15px;  */
        }
    </style>
</head>
<body>
    <div class="rental-application">
        <div class="container">
            <div class="form-head">
                <div class="formhead-row">
                    <div class="left-col">
                        <h1>Residential Tenancy Application</h1>
                        <p>Date: <%= currentDate %></p>
                    </div>
                    <div class="right-col">
                        <a href="#" class="site-logo">
                            <img src="${process.env.SITE_URL}/uploads/logo.png" alt="okas" />
                        </a>
                    </div>
                    
                </div>
            </div>
            <div class="inner-container">
                <div class="form-block-main-wrap avoid-break">
                    <div class="form-block-main">
                        <div class="form-block col-two">
                            <div class="form-block-wrap">
                                <div class="form-block-head">
                                    <h2>Property Details</h2>
                                </div>
                                <div class="form-block-content">
                                    <div class="formblockContent-row">
                                        <h4 class="tbl-th">Application Address</h4>
                                        <p class="tbl-td"><%= applicationAddress %></p>
                                    </div>
                                    <div class="formblockContent-row">
                                        <h4 class="tbl-th">Type of property</h4>
                                        <p class="tbl-td"><%= propertyType %></p>
                                    </div>
                                    <div class="formblockContent-row">
                                        <h4 class="tbl-th">Bedrooms</h4>
                                        <p class="tbl-td"><%= bedrooms %></p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div class="form-block col-two">
                            <div class="form-block-wrap">
                                <div class="form-block-head">
                                    <h2>Property Manager details</h2>
                                </div>
                                <div class="form-block-content">
                                    <div class="formblockContent-row">
                                        <h4 class="tbl-th">Agency name</h4>
                                        <p class="tbl-td">Okas Property Group</p>
                                    </div>
                                    <div class="formblockContent-row">
                                        <h4 class="tbl-th">Property Manager name</h4>
                                        <p class="tbl-td"><%= managerName %></p>
                                    </div>
                                    <div class="formblockContent-row">
                                        <h4 class="tbl-th">Property Manager email address</h4>
                                        <p class="tbl-td"><%= managerEmail %></p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="form-block-main-wrap avoid-break">
                    <div class="form-block-main">
                        <div class="form-block col-full">
                            <div class="form-block-wrap">
                                <div class="form-block-head">
                                    <h2>Lease details</h2>
                                </div>
                                <div class="form-block-content flexbox">
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Preferred commencement date</h4>
                                        <p class="tbl-td"><%= commencementDate %></p>
                                    </div>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Preferred length of lease</h4>
                                        <div class="flexbox tbl-td">
                                            <div class="col-two flexbox">
                                                <p><strong>Years:&nbsp;</strong></p>
                                                <p> <%= lengthOfLeaseYears %></p>
                                            </div>
                                            <div class="col-two flexbox">
                                                <p><strong>Months:&nbsp;</strong></p>
                                                <p> <%= lengthOfLeaseMonths %></p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div class="formblockContent-row col-two">
                                        <div class="flexbox tbl-td">
                                            <div class="col-full flexbox">
                                                <h4 class="tbl-th">Weekly rent:&nbsp;&nbsp;</h4>
                                                <p class="col-two">$<%= weeklyRent %> </p>
                                            </div>
                                            <div class="col-full flexbox">
                                                <h4 class="tbl-th">Monthly rent:&nbsp;&nbsp;</h4>
                                                <p class="col-two">$<%= monthlyRent %></p>
                                            </div>
                                            <div class="col-full flexbox">
                                                <h4 class="tbl-th mb-0">Bond:&nbsp;&nbsp;</h4>
                                                <p class="col-two">$<%= bond %> </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="formblockContent-row col-two flexbox">
                                        <h4 class="tbl-th">How did you find out about this property?</h4>
                                        <!-- <p class="tbl-td"><%= findProperty %></p> -->
                                        <% if(locals.findProperty != "Other") { %>
                                        <h4 class="tbl-th f-14"><%= findProperty %></h4>
                                        <% } %>
                                        <% if(locals.findProperty == "Internet" && locals.Website && locals.Website !== "") { %>
                                             <p class="tbl-td">: <%= Website %></p>
                                            <% } else { %>
                                            <% } %>
                
                                            <% if(locals.findProperty == "Newspaper" && locals.Newspaper && locals.Newspaper !== "") { %>
                                             <p class="tbl-td">: <%= Newspaper %></p>
                                            <% } else { %>
                                            <% } %>
                                                
                                            <% if(locals.findProperty == "Other" && locals.Other && locals.Other !== "") { %>
                                            <p class="tbl-td"><%= Other %></p>
                                            <% } else { %>
                                            <% } %>
                                    </div>
                                    <div class="formblockContent-row col-full">
                                        <h4 class="tbl-th">Why is this property right for you?</h4>
                                        <p class="tbl-td"><%= whyPropertyRight %></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="form-block-main-wrap avoid-break">
                    <div class="form-block-main">
                        <div class="form-block col-full">
                            <div class="form-block-wrap">
                                <div class="form-block-head">
                                    <h2>Occupancy</h2>
                                </div>
                                <div class="form-block-content flexbox">
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Primary Applicant</h4>
                                        <p class="tbl-td"><%= primaryApplicant %></p>
                                    </div>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Email</h4>
                                        <p class="tbl-td"><%= primaryApplicantEmail %></p>
                                    </div>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Mobile</h4>
                                        <p class="tbl-td"><%= primaryApplicantMobile %></p>
                                    </div>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Other Applicant</h4>
                                        <div class="flexbox tbl-td">
                                            <div class="col-two flexbox">
                                                <p class="tbl-td"><%= numberOfPerson %></p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-block-main-wrap">
                    <div class="form-block-main">
                        <div class="form-block col-full">
                            <div class="form-block-wrap">
                                <div class="form-block-head">
                                    <h2>Other Applicant</h2>
                                </div>
                                <div class="form-block-content">
                                    <div class="flexbox">
                                        <% locals.persons && persons.forEach(function(item, i){ %>
                                            <div class="formblockContent-row col-two avoid-break">
                                            <div class="formblockContentRow-wrap">
                                                <h4 class="tbl-th">Person <%= [i + 1] %></h4>
                                                <div class="flexbox tbl-td">
                                                    <div class="col-full flexbox mb-5">
                                                        <% if(item.personName) { %>
                                                        <p><strong>Name:&nbsp;</strong></p>
                                                        <p><%= item.personName %></p>
                                                        <% } else { %>
                                                        <% } %>
                                                    </div>
                                                    <div class="col-full flexbox mb-5">
                                                        <% if(item.personRelationship) { %>
                                                        <p><strong>Their relationship to you:&nbsp;</strong></p>
                                                        <p><%= item.personRelationship %></p>
                                                        <% } else { %>
                                                        <% } %>
                                                    </div>
                                                    <% if(item.dateOfBirth) { %>
                                                    <div class="col-full flexbox mb-5">
                                                        <p><strong>Date of birth:&nbsp;</strong></p>
                                                        <p><%= item.dateOfBirth %></p>
                                                    </div>
                                                    <% } %>
                                                    <div class="col-full flexbox mb-5">
                                                        <p><strong>Is the occupant 18 years of age or over?:&nbsp;</strong></p>
                                                        <% if(item.personAge == "true") { %>
                                                        <p>Yes</p>
                                                        <% } else { %>
                                                        <p>No</p>
                                                        <% } %>
                                                    </div>
                                                    <% if(item.minorPersonAge) { %>
                                                    <div class="col-full flexbox mb-5">
                                                        <p><strong>Age:&nbsp;</strong></p>
                                                        <p><%= item.minorPersonAge %></p>
                                                    </div>
                                                    <% } %>
                                                    <% if(item.occupantLease) { %>
                                                    <div class="col-full flexbox mb-5">
                                                        <p><strong>Will this occupant be on the lease?:&nbsp;</strong></p>
                                                        <% if(item.occupantLease == "true") { %>
                                                        <p>Yes</p>
                                                        <% } else { %>
                                                        <p>No</p>
                                                        <% } %>
                                                    </div>
                                                    <% } %>
                                                    <% if(item.occupantLease == "true") { %>
                                                    <div class="col-two flexbox mb-5">
                                                        <% if(item.personEmail) { %>
                                                        <p><strong>Email:&nbsp;</strong></p>
                                                        <p><%= item.personEmail %></p>
                                                        <% } else { %>
                                                        <% } %>
                                                    </div>
                                                    <div class="col-two flexbox mb-5">
                                                        <% if(item.personContact) { %>
                                                        <p><strong>Mobile:&nbsp;</strong></p>
                                                        <p>0<%= item.personContact %></p>
                                                        <% } else { %>
                                                        <% } %>
                                                    </div>
                                                    <% } %>
                                                </div>
                                            </div>
                                        </div>
                                            <% }) %>
                                    </div>
                                    <% if (!locals.persons || locals.persons.length == 0) { %>
                                        <p>No other applicants</p>
                                        <% } %>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-block-main-wrap avoid-break">
                    <div class="form-block-main">
                        <div class="form-block col-full">
                            <div class="form-block-wrap">
                                <div class="form-block-head">
                                    <h2>Property inspection</h2>
                                </div>
                                <div class="form-block-content">
                                    <div class="formblockContent-row">
                                        <h4 class="tbl-th">Have you inspected this property?</h4>
                                        <% if(locals.inspectedProperty && locals.inspectedProperty == "1") { %>
                                        <h4 class="tbl-th">I have not yet inspected this property but i plan to</h4>
                                        <div class="flexbox tbl-td">
                                            <div class="col-full mb-5">
                                                <p class="mb-5"><strong>When do you intend to inspect the property?&nbsp;</strong></p>
                                                <p><%= inspectionDate %></p>
                                            </div>
                                        </div>
                                        <% } %>
                                    </div>

                                    <% if(locals.inspectedProperty && locals.inspectedProperty == "2") { %>
                                    <div class="formblockContent-row">
                                        <h4 class="tbl-th">I have physically inspected this property and accept it in its current state</h4>
                                        <div class="flexbox tbl-td">
                                            <div class="col-two flexbox mb-5">
                                                <p><strong>Inspection date:&nbsp;</strong></p>
                                                <p><%= inspectionDate %></p>
                                            </div>
                                            <div class="col-full flexbox mb-5">
                                                <p><strong>Was property in a reasonably clean and fair condition?:&nbsp;</strong></p>
                                                <p><% if(locals.inspectionReasonably && locals.inspectionReasonably == "true") { %> Yes <% } else { %> No <% } %></p>
                                            </div>
                                            <% if (locals.inspectionDetails && locals.inspectionReasonably && locals.inspectionReasonably == "false") { %>
                                            <div class="col-two flexbox mb-5">
                                                <p><%= inspectionDetails %></p>
                                            </div>  
                                            <% } %>
                                        </div>
                                    </div>
                                    <% } %>

                                    <% if(locals.inspectedProperty && locals.inspectedProperty == "3") { %>
                                    <div class="formblockContent-row">
                                        <h4 class="tbl-th">I am interstate/overseas and will physically inspect the property upon my arrival</h4>
                                        <p class="tbl-td"><%= inspectionDate %></p>
                                    </div>
                                    <% } %>

                                    <% if(locals.inspectedProperty && locals.inspectedProperty == "4") { %>
                                    <div class="formblockContent-row">
                                        <h4 class="tbl-th">Someone else has inspected on my behalf as I’m interstate/overseas and I accept it in its current state</h4>
                                        <div class="flexbox tbl-td">
                                            <div class="col-two flexbox mb-5">
                                                <p><strong>Inspection date:&nbsp;</strong></p>
                                                <p><%= inspectionDate %></p>
                                            </div>
                                            <div class="col-full flexbox mb-5">
                                                <p><strong>Associates/Other persons name:&nbsp;</strong></p>
                                                <p><%= associatesPersonsName %></p>
                                            </div>
                                            <div class="col-full flexbox mb-5">
                                                <p><strong>Was property in a reasonably clean and fair condition?:&nbsp;</strong></p>
                                                <p><% if(locals.inspectionReasonably && locals.inspectionReasonably == "true") { %> Yes <% } else { %> No <% } %></p>
                                            </div>
                                            <% if (locals.inspectionDetails && locals.inspectionReasonably && inspectionReasonably == "false") { %>
                                            <div class="col-two flexbox mb-5">
                                                <p><%= inspectionDetails %></p>
                                            </div>  
                                            <% } %>
                                        </div>
                                    </div>
                                    <% } %>

                                    <% if(locals.inspectedProperty && locals.inspectedProperty == "5") { %>
                                    <div class="formblockContent-row">
                                        <h4 class="tbl-th">I have inspected this property digitally and accept it in its current state</h4>
                                        <p class="tbl-td"><%= inspectionDate %></p>
                                    </div>
                                    <% } %>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-block-main-wrap avoid-break">
                    <div class="form-block-main">
                        <div class="form-block col-two">
                            <div class="form-block-wrap">
                                <div class="form-block-head">
                                    <h2>Vehicles</h2>
                                </div>
                                <div class="form-block-content other-applicant-content">
                                    <div class="formblockContent-row">
                                        <% locals.vehical && vehical.forEach(function(item, i){ %>
                                        <div class="formblockContentRow-wrap">
                                            <h4 class="tbl-th">Vehicle <%= [i + 1] %></h4>
                                            <div class="flexbox tbl-td">
                                                <div class="col-full flexbox mb-5">
                                                    <% if(item.vehicleType === "other" && item.makeAndModalOfVehicle) { %>
                                                    <p><strong>Vehicle type:&nbsp;</strong></p>
                                                    <p><%= item.makeAndModalOfVehicle %></p>
                                                    <% } else if (item.vehicleType) { %>
                                                      <p><strong>Vehicle type:&nbsp;</strong></p>
                                                    <p><%= item.vehicleType %></p>
                                                    <% } %>
                                                </div>
                                                <div class="col-full flexbox mb-5">
                                                    <% if(item.plateNumber) { %>
                                                    <p><strong>Registration/plate number:&nbsp;</strong></p>
                                                    <p><%= item.plateNumber %></p>
                                                    <% } else { %>
                                                    <% } %>
                                                </div>
                                            </div>
                                        </div>
                                        <% }) %>
                                        <% if (!locals.vehical || locals.vehical.length == 0) { %>
                                            <p>No Vehicles</p>
                                            <% } %>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-block col-two">
                            <div class="form-block-wrap">
                                <div class="form-block-head">
                                    <h2>Pets</h2>
                                </div>
                                <div class="form-block-content other-applicant-content">
                                    <div class="formblockContent-row">

                                        <% locals.pets && pets.forEach(function(item, i){ %>
                                        <div class="formblockContentRow-wrap">
                                            <h4 class="tbl-th">Pet <%= [i + 1] %></h4>
                                            <div class="flexbox tbl-td">
                                                <div class="col-full flexbox mb-5">
                                                    <% if(item.petName) { %>
                                                    <p><strong>Name:&nbsp;</strong></p>
                                                    <p><%= item.petName %></p>
                                                    <% } %>
                                                </div>
                                                <div class="col-full flexbox mb-5">
                                                    <% if(item.petRegistrationNumber) { %>
                                                    <p><strong>Registration number:&nbsp;</strong></p>
                                                    <p><%= item.petRegistrationNumber %></p>
                                                    <% } %>
                                                </div>
                                            </div>
                                        </div>
                                        <% }) %>
                                        <% if (!locals.pets || locals.pets.length == 0) { %>
                                            <p>No Pets</p>
                                            <% } %>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="form-block-main-wrap avoid-break">
                    <div class="form-block-main">
                        <div class="form-block col-full">
                            <div class="form-block-wrap">
                                <div class="form-block-head">
                                    <h2>Rental History</h2>
                                </div>
                                <div class="form-block-content flexbox">
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Current address</h4>
                                        <p class="tbl-td"><%= currentAddress %></p>
                                    </div>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Length of stay</h4>
                                        <p class="tbl-td"><%= lengthOfStay %></p>
                                    </div>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">From</h4>
                                        <p class="tbl-td"><%= fromDate %></p>
                                    </div>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Reason for leaving</h4>
                                        <p class="tbl-td"><%= reasonOfLeaving %></p>
                                    </div>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Monthly rent</h4>
                                        <p class="tbl-td">$<%= previousMonthlyRent %></p>
                                    </div>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Landlord/Agent/Parent's Name</h4>
                                        <p class="tbl-td"><%= landloadName %></p>
                                    </div>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Landlord/Agent/Parent's Phone</h4>
                                        <p class="tbl-td">0<%= landloadPhone %></p>
                                    </div>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Landlord/Agent/Parent's Email</h4>
                                        <p class="tbl-td"><%= landloadEmail %></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="form-block-main-wrap avoid-break">
                    <div class="form-block-main">
                        <div class="form-block col-full">
                            <div class="form-block-wrap">
                                <div class="form-block-head">
                                    <h2>Previous Address</h2>
                                </div>
                                <div class="form-block-content flexbox">
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Previous Address</h4>
                                        <p class="tbl-td">
                                            <% if(locals.previousAddress === "enterAddress") { %>
                                                <%= enterPreviousAddress %>
                                                <% } else if(locals.previousAddress === "currentAddress") { %>
                                                    I have lived at my current address my entire life.
                                                <% } else { %>
                                                    I have no previous address
                                                    <% } %>
                                        </p>
                                    </div>
                                    <% if(locals.previousAddress === "enterAddress" && locals.previousAddressDetails) { %>
                                        <% if(previousAddressDetails.lengthOfStay) { %>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Length of stay</h4>
                                        <p class="tbl-td"><%= previousAddressDetails.lengthOfStay %></p>
                                    </div>
                                    <% } %>
                                    <% if(previousAddressDetails.fromDate) { %>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">From</h4>
                                        <p class="tbl-td"><%= previousAddressDetails.fromDate %></p>
                                    </div>
                                    <% } %>
                                    <% if(previousAddressDetails.previousMonthlyRent) { %>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Monthly rent</h4>
                                        <p class="tbl-td">$<%= previousAddressDetails.previousMonthlyRent %></p>
                                    </div>
                                    <% } %>
                                    <% if(previousAddressDetails.landloadName) { %>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Landlord/Agent/Parent's Name</h4>
                                        <p class="tbl-td"><%= previousAddressDetails.landloadName %></p>
                                    </div>
                                    <% } %>
                                    <% if(previousAddressDetails.landloadPhone) { %>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Landlord/Agent/Parent's Phone</h4>
                                        <p class="tbl-td">0<%= previousAddressDetails.landloadPhone %></p>
                                    </div>
                                    <% } %>
                                    <% if(previousAddressDetails.landloadEmail) { %>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Landlord/Agent/Parent's Email</h4>
                                        <p class="tbl-td"><%= previousAddressDetails.landloadEmail %></p>
                                    </div>
                                    <% } %>
                                    <% } %>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="form-block-main-wrap avoid-break">
                    <div class="form-block-main">
                        <% if(locals.refName1 || locals.refPhone1 || locals.refRelation1 || locals.refEmail1) { %>
                        <div class="form-block flex-1">
                            <div class="form-block-wrap">
                                <div class="form-block-head">
                                    <h2>References 1</h2>
                                </div>
                                <div class="form-block-content">
                                    <div class="formblockContent-row">
                                        <h4 class="tbl-th">Name</h4>
                                        <p class="tbl-td"><%= locals.refName1 %></p>
                                    </div>
                                    <div class="formblockContent-row">
                                        <h4 class="tbl-th">Phone</h4>
                                        <p class="tbl-td">0<%= locals.refPhone1 %></p>
                                    </div>
                                    <div class="formblockContent-row">
                                        <h4 class="tbl-th">Email</h4>
                                        <p class="tbl-td"><%= locals.refEmail1 %></p>
                                    </div>
                                    <div class="formblockContent-row">
                                        <h4 class="tbl-th">Their relationship to you</h4>
                                        <p class="tbl-td"><%= locals.refRelation1 %></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <% } %>
                        <% if(locals.refName2 || locals.refPhone2 || locals.refRelation2 || locals.refEmail2) { %>
                        <div class="form-block flex-1">
                            <div class="form-block-wrap">
                                <div class="form-block-head">
                                    <h2>References 2</h2>
                                </div>
                                <div class="form-block-content">
                                    <div class="formblockContent-row">
                                        <h4 class="tbl-th">Name</h4>
                                        <p class="tbl-td"><%= locals.refName2 %></p>
                                    </div>
                                    <div class="formblockContent-row">
                                        <h4 class="tbl-th">Phone</h4>
                                        <p class="tbl-td">0<%= locals.refPhone2 %></p>
                                    </div>
                                    <div class="formblockContent-row">
                                        <h4 class="tbl-th">Email</h4>
                                        <p class="tbl-td"><%= locals.refEmail2 %></p>
                                    </div>
                                    <div class="formblockContent-row">
                                        <h4 class="tbl-th">Their relationship to you</h4>
                                        <p class="tbl-td"><%= locals.refRelation2 %></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <% } %>
                        <% if(locals.refName3 || locals.refPhone3 || locals.refRelation3 || locals.refEmail3) { %>
                        <div class="form-block flex-1">
                            <div class="form-block-wrap">
                                <div class="form-block-head">
                                    <h2>References 3</h2>
                                </div>
                                <div class="form-block-content">
                                    <% if(locals.refName3) { %>
                                    <div class="formblockContent-row">
                                        <h4 class="tbl-th">Name</h4>
                                        <p class="tbl-td"><%= locals.refName3 %></p>
                                    </div>
                                    <% } %>
                                    <% if(locals.refPhone3) { %>
                                    <div class="formblockContent-row">
                                        <h4 class="tbl-th">Phone</h4>
                                        <p class="tbl-td">0<%= locals.refPhone3 %></p>
                                    </div>
                                    <% } %>
                                    <% if(locals.refEmail3) { %>
                                    <div class="formblockContent-row">
                                        <h4 class="tbl-th">Email</h4>
                                        <p class="tbl-td"><%= locals.refEmail3 %></p>
                                    </div>
                                    <% } %>
                                    <% if(locals.refRelation3) { %>
                                    <div class="formblockContent-row">
                                        <h4 class="tbl-th">Their relationship to you</h4>
                                        <p class="tbl-td"><%= locals.refRelation3 %></p>
                                    </div>
                                    <% } %>
                                </div>
                            </div>
                        </div>
                        <% } %>
                    </div>
                </div>
                <hr>
                <div class="form-block-main-wrap avoid-break">
                    <div class="form-block-main">
                        <div class="form-block col-full">
                            <div class="form-block-wrap">
                                <div class="form-block-head">
                                    <h2>Employment</h2>
                                </div>
                                <div class="form-block-content flexbox">
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Employment Status</h4>
                                        <p class="tbl-td"><% if(locals.employmentStatus === "employed") {%>
                                            I am currently employed
                                            <% } else if (locals.employmentStatus === "centrelink") { %>
                                                Receiving Centrelink Payments
                                        <% } else { %>
                                            I am not employed
                                            <% } %>
                                        </p>
                                    </div>
                                    <% if(locals.employmentStatus === "employed") {%>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Company name</h4>
                                        <p class="tbl-td"><%= employeeCompanyName %></p>
                                    </div>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Company Address</h4>
                                        <p class="tbl-td"><%= employeeCompanyAddress %></p>
                                    </div>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Occupation/Position</h4>
                                        <p class="tbl-td"><%= employeeOccupation %></p>
                                    </div>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Length of Employment</h4>
                                        <p class="tbl-td"><%= employeeLength %></p>
                                    </div>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">From</h4>
                                        <p class="tbl-td"><%= employeeDate %></p>
                                    </div>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Manager</h4>
                                        <p class="tbl-td"><%= employeeManager %></p>
                                    </div>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Email</h4>
                                        <p class="tbl-td"><%= employeeEmail %></p>
                                    </div>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Phone</h4>
                                        <p class="tbl-td">0<%= employeePhone %></p>
                                    </div>  
                                    <% } %>
                                    <% if(locals.employmentStatus === "centrelink" && locals.monthlyAmount) {%>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Amount (Monthly)</h4>
                                        <p class="tbl-td"><%= monthlyAmount %></p>
                                    </div>  
                                    <% } %>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <% if(locals.employmentStatus === "employed") {%>
                <hr>
                <div class="form-block-main-wrap avoid-break">
                    <div class="form-block-main">
                        <div class="form-block col-full">
                            <div class="form-block-wrap">
                                <div class="form-block-head">
                                    <h2>Salary</h2>
                                </div>
                                <div class="form-block-content flexbox">
                                    <div class="formblockContent-row col-three">
                                        <h4 class="tbl-th">Gross Weekly</h4>
                                        <p class="tbl-td">$<%= grossWeekly %></p>
                                    </div>
                                    <div class="formblockContent-row col-three">
                                        <h4 class="tbl-th">Gross Monthly</h4>
                                        <p class="tbl-td">$<%= grossMonthly %></p>
                                    </div>
                                    <div class="formblockContent-row col-three">
                                        <h4 class="tbl-th">Annual Salary</h4>
                                        <p class="tbl-td">$<%= annualSalary %></p>
                                    </div>
                                    <% if(locals.additionalGrossMonthly) { %>
                                    <div class="formblockContent-row col-three">
                                        <h4 class="tbl-th">Additional Income</h4>
                                        <p class="tbl-td">$<%= additionalGrossMonthly %> (Gross Monthly)</p>
                                    </div>
                                    <% } %>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <% if(locals.previousEmployment === "true") { %>
            <div class="form-block-main-wrap avoid-break">
                <div class="form-block-main">
                    <div class="form-block col-full">
                        <div class="form-block-wrap">
                            <div class="form-block-head">
                                <h2>Previous Employment</h2>
                            </div>
                            <div class="form-block-content flexbox">
                                <% if(locals.previousEmployeeCompanyName) { %>
                                <div class="formblockContent-row col-two">
                                    <h4 class="tbl-th">Company name</h4>
                                    <p class="tbl-td"><%= previousEmployeeCompanyName %></p>
                                </div>
                                <% } %>
                                <% if(locals.previousEmployeeCompanyAddress) { %>
                                <div class="formblockContent-row col-two">
                                    <h4 class="tbl-th">Company Address</h4>
                                    <p class="tbl-td"><%= previousEmployeeCompanyAddress %></p>
                                </div>
                                <% } %>
                                <% if(locals.previousEmployeeOccupation) { %>
                                <div class="formblockContent-row col-two">
                                    <h4 class="tbl-th">Occupation/Position</h4>
                                    <p class="tbl-td"><%= previousEmployeeOccupation %></p>
                                </div>
                                <% } %>
                                <% if(locals.previousEmployeeLength) { %>
                                <div class="formblockContent-row col-two">
                                    <h4 class="tbl-th">Length of Employment</h4>
                                    <p class="tbl-td"><%= previousEmployeeLength %></p>
                                </div>
                                <% } %>
                                <% if(locals.previousEmployeeDate) { %>
                                <div class="formblockContent-row col-two">
                                    <h4 class="tbl-th">From</h4>
                                    <p class="tbl-td"><%= previousEmployeeDate %></p>
                                </div>
                                <% } %>
                                <% if(locals.previousEmployeeManager) { %>
                                <div class="formblockContent-row col-two">
                                    <h4 class="tbl-th">Manager</h4>
                                    <p class="tbl-td"><%= previousEmployeeManager %></p>
                                </div>
                                <% } %>
                                <% if(locals.previousEmployeeEmail) { %>
                                <div class="formblockContent-row col-two">
                                    <h4 class="tbl-th">Email</h4>
                                    <p class="tbl-td"><%= previousEmployeeEmail %></p>
                                </div>
                                <% } %>
                                <% if(locals.previousEmployeePhone) { %>
                                <div class="formblockContent-row col-two">
                                    <h4 class="tbl-th">Phone</h4>
                                    <p class="tbl-td">0<%= previousEmployeePhone %></p>
                                </div>  
                                <% } %>
                            </div>
                            <h4 class="tbl-th">Salary</h4>
                            <div class="form-block-content flexbox">
                                <div class="formblockContent-row col-three">
                                    <h4 class="tbl-th">Gross Weekly</h4>
                                    <p class="tbl-td">$<%= previousGrossWeekly %></p>
                                </div>
                                <div class="formblockContent-row col-three">
                                    <h4 class="tbl-th">Gross Monthly</h4>
                                    <p class="tbl-td">$<%= previousGrossMonthly %></p>
                                </div>
                                <div class="formblockContent-row col-three">
                                    <h4 class="tbl-th">Annual Salary</h4>
                                    <p class="tbl-td">$<%= previousAnnualSalary %></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <% } %>
            <% } %>
        </div>

            <hr>
                <div class="form-block-main-wrap avoid-break">
                    <div class="form-block-main">
                        <div class="form-block col-full">
                            <div class="form-block-wrap">
                                <div class="form-block-head">
                                    <h2>Agency questions</h2>
                                </div>
                                <div class="form-block-content flexbox">
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Has your tenancy ever been terminated by a landlord or agent?</h4>
                                        <% if(locals.tenancyTerminated && locals.tenancyTerminated == "true") { %>
                                            <p class="tbl-td">Yes</p>
                                            <% if(locals.terminatedDetails && locals.terminatedDetails !== "") { %>
                                            <p class="tbl-td">
                                            <%= terminatedDetails %>
                                            </p>
                                            <% } %>
                                        <% } else { %>
                                            <p class="tbl-td">No</p>
                                        <% } %>
                                    </div>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Have you ever been refused a property by any landlord or agent?</h4>
                                        <% if(locals.refusedProperty && locals.refusedProperty == "true") { %>
                                            <p class="tbl-td">Yes</p>
                                            <% if(locals.refusedDetails && locals.refusedDetails !== "") { %>
                                            <p class="tbl-td">
                                            <%= refusedDetails %>
                                            </p>
                                            <% } %>
                                        <% } else { %>
                                            <p class="tbl-td">No</p>
                                        <% } %>
                                    </div>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Are you in debt to another landlord or agent?</h4>
                                        <% if(locals.debt && locals.debt == "true") { %>
                                            <p class="tbl-td">Yes</p>
                                            <% if(locals.debtDetails && locals.debtDetails !== "") { %>
                                            <p class="tbl-td">
                                            <%= debtDetails %>
                                            </p>
                                            <% } %>
                                        <% } else { %>
                                            <p class="tbl-td">No</p>
                                        <% } %>
                                    </div>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Is there any reason known to you that would affect your future rental payments?</h4>
                                        <% if(locals.rentalPayment && locals.rentalPayment == "true") { %>
                                            <p class="tbl-td">Yes</p>
                                            <% if(locals.futureRentalPaymentsDetails && locals.futureRentalPaymentsDetails !== "") { %>
                                            <p class="tbl-td">
                                            <%= futureRentalPaymentsDetails %>
                                            </p>
                                            <% } %>
                                        <% } else { %>
                                            <p class="tbl-td">No</p>
                                        <% } %>
                                    </div>
                                    <% if(locals.pendingProperties && locals.pendingProperties !== "") { %>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Do you have any other applications pending on other properties?</h4>
                                        <p class="tbl-td"><% if(pendingProperties == "true") { %> Yes <% } else { %> No <% } %></p>                                        
                                    </div>
                                    <% } %>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Do you currently own a property?</h4>
                                        <% if(locals.currentProperty && locals.currentProperty == "true") { %>
                                            <p class="tbl-td">Yes</p>
                                            <% if(locals.specifySuburbDetails && locals.specifySuburbDetails !== "") { %>
                                            <p class="tbl-td">
                                            <%= specifySuburbDetails %>
                                            </p>
                                            <% } %>
                                        <% } else { %>
                                            <p class="tbl-td">No</p>
                                        <% } %>
                                    </div>
                                    <% if(locals.buyingPropeties && locals.buyingPropeties !== "") { %>
                                    <div class="formblockContent-row col-two">
                                        <h4 class="tbl-th">Are you considering buying a property after this tenancy or in the near future?</h4>
                                        <p class="tbl-td"><% if(buyingPropeties == "true") { %> Yes <% } else { %> No <% } %></p>
                                    </div>
                                    <% } else { %>
                                    <% } %>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="form-block-main-wrap avoid-break">
                    <div class="form-block-main">
                        <div class="form-block col-full">
                            <div class="form-block-wrap">
                                <div class="form-block-head">
                                    <h2>Identification</h2>
                                </div>
                                <div class="form-block-content flexbox">
                                    <div class="formblockContent-row col-full">
                                        <h4 class="tbl-th">Please Check Mail Attachments For Identification & Supporting Docs</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="form-block-main-wrap avoid-break">
                    <div class="form-block-main">
                        <div class="form-block col-full">
                            <div class="form-block-wrap">
                                <div class="form-block-head">
                                    <h2>Declaration</h2>
                                </div>
                                <div class="form-block-content flexbox">
                                    <div class="declarationbhead">
                                        <p class="main-td mb-5"><small class="checkbox-icon">&#10004;</small>I acknowledge that I have Read, Understood and Agree with the Tenancy Disclosure Statement, National Tenancy Database Disclosure Statement and Declaration Statement.</p>
                                        <div class="declarationhead-content flexbox">
                                            <div class="left-col">
                                                <h3><%= primaryApplicant %></h3>
                                                <p class="main-td">(Digital representation of tenants signature, approved by tenant)</p>
                                            </div>
                                            <div class="right-col">
                                                <h3><%= currentDate %></h3>
                                                <p class="main-td text-right">(Date Signed)</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="formblockContent-row col-full">
                                        <h4 class="tbl-th">Tenancy Disclosure Statement</h4>
                                        <p class="tbl-td mb-5">The information on this form is being collected by Okas Property Group Pty Ltd. It is a condition of application for tenancy that you consent to the collection and use of your personal information by Okas Property Group Pty Ltd. We require this information so that we may consider your application to tenant/lease a property. We may provide any or information provided to us by any party to any third‐party including landlords, landlord agents and solicitors and various government or statutory authorities in the interests of openness and transparency between all parties concerned. We may also contact personal and credit referees you nominate and exchange personal information according to normal commercial practice. Your personal information will be added to our database and may be used for the secondary purpose of providing you with further information about properties and services offered by Okas Property Group Pty Ltd. It is your responsibility to ensure information you provide is correct at all times.</p>
                                    </div>
                                    <div class="formblockContent-row col-full">
                                        <h4 class="tbl-th">National Tenancy Database Disclosure Statement</h4>
                                        <p class="tbl-td mb-5">You can contact the National Tenancy Database Pty Ltd, ABN 26 000 602 862 by means of;</p>
                                        <div class="flexbox tbl-td mb-5">
                                            <div class="col-two flexbox flex-nowrap mb-5">
                                                <p><strong>Address:&nbsp;</strong></p>
                                                <p> P.O Box 1321650 George St, Brisbane QLD 4003</p>
                                            </div>
                                            <div class="col-two flexbox flex-nowrap mb-5">
                                                <p><strong>Phone:&nbsp;</strong></p>
                                                <p> 03 8629 1608</p>
                                            </div>
                                            <div class="col-two flexbox flex-nowrap">
                                                <p><strong>Website:&nbsp;</strong></p>
                                                <p>www.ntd.net.au</p>
                                            </div>
                                            <div class="col-two flexbox flex-nowrap">
                                                <p><strong>Fax:&nbsp;</strong></p>
                                                <p>03 8629 1650</p>
                                            </div>
                                        </div>
                                        <p class="tbl-td mb-5">Primary Purpose ‐ NTD collects your personal information to provide its members and others listed below, historical tenancy and public record information on individuals and companies who/which lease residential and commercial property from or through licensed real estate agent members of NTD. NTD also provides credit information on companies/directors applying for commercial leases. The real estate/property manager will advise NTD of your conduct throughout the lease/tenancy, and the information will form part of your tenant history.</p>
                                        <div class="flexbox tbl-td mb-5">
                                            <div class="col-full mb-5">
                                                <p><strong>NTD usually disclosed information to:&nbsp;</strong></p>
                                                <ul class="pl-20 mb-5">
                                                    <li>Licensed real estate agent members</li>
                                                    <li>NTD’s parent company, collection house limited</li>
                                                    <li>Credit bureaus</li>
                                                </ul>
                                                <p class="mb-5">If your personal information is not provided o NTD the real estate agent/property manager will not be able to carry out their professional responsibilities and will not be able to provide you with a lease/tenancy of the premises.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="formblockContent-row col-full">
                                        <h4 class="tbl-th">Declaration Statement</h4>
                                        <div class="flexbox tbl-td mb-5">
                                            <div class="col-full mb-5">
                                                <p class="mb-5"><strong>I acknowledge that;&nbsp;</strong></p>
                                                <ul class="pl-20 mb-5">
                                                    <li>This an application to lease this property and that my application is subject to the owner's approval and the availability of the premises on the due date. No action will be taken against the landlord or agent if the application is unsuccessful or should the premises not be available for occupation on the due date for whatever reason; and</li>
                                                    <li>I am responsible for connection and payment of gas, electricity, telephone and water consumption. I acknowledge that I am responsible to turn the main power switch off before power is connected. Okas Property Group Pty Ltd cannot confirm that any telephone line to the property is operable or able to be reconnected. It is the tenant's responsibility to check with the telephone provided to confirm the line arrangements and pay for line connection; and</li>
                                                    <li>That the premises are a ‘Smoke Free Zone’ and will ensure that they and their invitees do not smoke inside the premises.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="formblockContent-row col-full">
                                        <h4 class="tbl-th mb-5">Utility Connection Services</h4>
                                        <p class="tbl-td mb-5">Connect now, call 1300 889 598 or visit www.connectnow.com.au</p>
                                        <p class="tbl-td mb-5">Connect now is dedicated to helping you move home more easily. We can connect our utilities including electricity, gas, phone, internet and pay TV to a broad choice of leading provides. We can also organise your disconnection and offer a range of additional services, such as cleaning and food services, revivalists and vehicle hire. It’s a free service, standard service provider connection fees and charges still apply.</p>
                                        <p class="tbl-td mb-5">By signing this form, you consent and agree to the following – Connect now Pty Ltd, ABN 79 097 398 682, will collect, use and disclose your personal information to contact you about providing moving, connection and disconnection services and to inform you about products and services offered by its related companies and third party suppliers. These other companies may also use your details to contact you directly about their products and services, see connect now’s privacy policy for further details, including your rights to access and correct the information held about you at www.connectnow.com.au. Third part service providers, who may transfer your data overseas, may have their own privacy policy which you can request from them. You consent to connect now to continuing to market to you unless you opt out, including by emailing privacy@connectnow.com.au. To the extent permitted by law, connect now is not responsible or liable for delayed or failed connections or the service providers connection charges which you must pay to them directly. Connect now may be a fee by service providers and may pay a fee to real estate agents relating to services provided to you. If you nominate an alternative contact person on this application, you authorise them to act on your behalf to arrange moving, connect and disconnection services, including accepting third party terms. You warrant that you are authorised to make this application on behalf of all applications and alternative contact persons listed and that each person has consented and agreed to the handling of their personal information on the same terms as you have.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`