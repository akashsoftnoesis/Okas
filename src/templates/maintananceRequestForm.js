module.exports = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maintanace Request</title>
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
        .main-td{
            font-size: 12px;
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
        .signature-content h3{
            font-size: 62px;
            line-height: 1;
            font-family: 'James Fajardo';
            color: #717171;
            font-weight: 300;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="rental-application">
        <div class="container">
            <div class="form-head">
                <div class="formhead-row">
                    <div class="left-col">
                        <h1>Maintenance Request</h1>
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
                <div class="form-block-main-wrap">
                    <div class="form-block-main">
                        <div class="form-block col-full">
                            <div class="form-block-wrap">
                                <div class="form-block-head">
                                    <h2>Property Details</h2>
                                </div>
                                <div class="form-block-content flexbox">
                                    <div class="form-block-content-wrap col-two">
                                        <div class="formblockContent-row">
                                            <h4 class="tbl-th">Property Address</h4>
                                            <p class="tbl-td"><%= propertyAddress %></p>
                                        </div>
                                        <div class="formblockContent-row">
                                            <h4 class="tbl-th">Date Lodged</h4>
                                            <p class="tbl-td"><%= logedDate %></p>
                                        </div>
                                        <div class="formblockContent-row">
                                            <h4 class="tbl-th">Tenant Name</h4>
                                            <p class="tbl-td"><%= tenantName %></p>
                                        </div>
                                    </div>
                                    <div class="form-block-content-wrap col-two">
                                        <div class="formblockContent-row">
                                            <h4 class="tbl-th">Preferred Method Of Contact</h4>
                                            <%  if(locals.homePhoneNumber) { %> <p class="tbl-td"> Home Phone: <%= homePhoneNumber %></p><% } %>
                                            <%  if(locals.workPhoneNumber) { %> <p class="tbl-td"> Work Phone: <%= workPhoneNumber %></p><% } %>
                                            <%  if(locals.mobileNumber) { %> <p class="tbl-td"> Mobile Number: <%= mobileNumber %></p><% } %>
                                            <%  if(locals.emailAddress) { %> <p class="tbl-td"> Email Address: <%= emailAddress %></p><% } %>
                                        </div>
                                        <div class="formblockContent-row">
                                            <h4 class="tbl-th">I Am</h4>
                                            <p class="tbl-td"><%= preferredContactIAm %></p>
                                        </div>
                                        <div class="formblockContent-row">
                                            <h4 class="tbl-th">Type Of Repair Or Maintenance</h4>
                                            <p class="tbl-td"><%  if(locals.repairMaintenance === "true") { %>
                                                Urgent <% } else { %> Not Urgent <% } %></p>
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
                                    <h2>Maintenance Description</h2>
                                </div>
                                <div class="form-block-content">
                                    <div class="form-block-content-wrap col-full">
                                        <div class="formblockContent-row">
                                            <p class="tbl-td"><%= descriptionMaintenance %></p>
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
                                    <h2>Appliances</h2>
                                </div>
                                <div class="form-block-content flexbox">
                                    <div class="form-block-content-wrap col-two">
                                        <div class="formblockContent-row">
                                            <h4 class="tbl-th">Hot Water</h4>
                                            <p class="tbl-td"><%= hotwater %></p>
                                        </div>
                                        <div class="formblockContent-row">
                                            <h4 class="tbl-th">Stove</h4>
                                            <p class="tbl-td"><%= stove %></p>
                                        </div>
                                        <div class="formblockContent-row">
                                            <h4 class="tbl-th">Oven</h4>
                                            <p class="tbl-td"><%= oven %></p>
                                        </div>
                                    </div>
                                    <div class="form-block-content-wrap col-two">
                                        <div class="formblockContent-row">
                                            <h4 class="tbl-th">Model</h4>
                                            <p class="tbl-td"><%= hotWaterModal %></p>
                                        </div>
                                        <div class="formblockContent-row">
                                            <h4 class="tbl-th">Model</h4>
                                            <p class="tbl-td"><%= stoveModal %></p>
                                        </div>
                                        <div class="formblockContent-row">
                                            <h4 class="tbl-th">Model</h4>
                                            <p class="tbl-td"><%= ovenModal %></p>
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
                                    <h2>Instruction For Tradesperson</h2>
                                </div>
                                <div class="form-block-content">
                                    <div class="form-block-content-wrap flexbox">
                                        <% if(locals.instructionsForTradesPerson && locals.instructionsForTradesPerson.length) { %>
                                        <div class="formblockContent-row col-full">
                                            <% instructionsForTradesPerson.forEach(function(instruction){ %>
                                                <% if(instruction) { %>
                                                    <p class="tbl-td mb-5"><small class="checkbox-icon">&#10004;</small><%= instruction %></p>
                                                <% } %>
                                                <% }) %>
                                        </div>
                                        <% } %>
                                        <div class="formblockContent-row col-two">
                                            <h4 class="tbl-th">Preferred  Contact Number</h4>
                                            <p class="tbl-td"><%= bestContactNumber %></p>
                                        </div>
                                        <div class="formblockContent-row col-two">
                                            <h4 class="tbl-th">Preferred communication time</h4>
                                            <p class="tbl-td"><%= bestDayToCall %> <%= bestTimeToCall %></p>
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
                                    <h2>Tenant Signature</h2>
                                </div>
                                <div class="form-block-content">
                                    <div class="form-block-content-wrap flexbox">
                                        <div class="formblockContent-row col-two">
                                            <h4 class="tbl-th">Your Name</h4>
                                            <p class="tbl-td"><%= yourName %></p>
                                        </div>
                                        <div class="formblockContent-row col-two">
                                            <h4 class="tbl-th">Date</h4>
                                            <p class="tbl-td"><%= tenantDate %></p>
                                        </div>
                                        <div class="formblockContent-row col-full">
                                            <h4 class="tbl-th">Signature</h4>
                                            <div class="signature-content">
                                                <h3><%= tenantSignature %></h3>
                                            </div>
                                        </div>
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