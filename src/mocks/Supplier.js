
import mock from './axios-mock';



// Mock for POST /supplier/create
mock.onPost('/api/supplier/create_success').reply(200, {
  "code": 1,
  "message": "success",
  "data": {
    "supplierID": "supplierID_value"
  }
});

// Mock for PATCH /supplier/update
mock.onPatch('/api/supplier/update_success').reply(200, {
  "code": 1,
  "message": "success",
  "data": {}
});

mock.onPatch('/api/supplier/update_not_found').reply(404, {
  "code": 0,
  "message": "supplier not found",
  "data": []
});

// Mock for GET /supplier/query

// 预定义的模拟数据
const mockData = [
  {
    "supplierID": "supplierID_value1",
    "suppliername": "suppliername_value1",
    "communicationLang": "communicationLang_value1",
    "taxNumber": "taxNumber_value1",
    "companyCode": "companyCode_value1",
    "reconciliationAcct": "reconciliationAcct_value1",
    "termsOfPayment": "termsOfPayment_value1",
    "checkDoubleInvoice": "checkDoubleInvoice_value1",
    "clerkName": "clerkName_value1",
    "purchasingOrg": "purchasingOrg_value1",
    "orderCurrency": "orderCurrency_value1",
    "partnerFunctions": "partnerFunctions_value1",
    "streetAddress": "streetAddress_value1",
    "postalCode": "postalCode_value1",
    "city": "city_value1",
    "country": "country_value1",
    "region": "region_value1",
    "contactInfo": "contactInfo_value1",
    "userID": "userID_value1"
  },
  {
    "supplierID": "supplierID_value2",
    "suppliername": "suppliername_value2",
    "communicationLang": "communicationLang_value2",
    "taxNumber": "taxNumber_value2",
    "companyCode": "companyCode_value2",
    "reconciliationAcct": "reconciliationAcct_value2",
    "termsOfPayment": "termsOfPayment_value2",
    "checkDoubleInvoice": "checkDoubleInvoice_value2",
    "clerkName": "clerkName_value2",
    "purchasingOrg": "purchasingOrg_value2",
    "orderCurrency": "orderCurrency_value2",
    "partnerFunctions": "partnerFunctions_value2",
    "streetAddress": "streetAddress_value2",
    "postalCode": "postalCode_value2",
    "city": "city_value2",
    "country": "country_value2",
    "region": "region_value2",
    "contactInfo": "contactInfo_value2",
    "userID": "userID_value2"
  }
];

// Mock for GET /supplier/query
mock.onGet('/api/supplier/query_success').reply(config => {
  const { supplierID, suppliername, country, contactInfo, userID } = config.params;

  // 过滤数据
  let filteredData = mockData;

  if (supplierID) {
    filteredData = filteredData.filter(item => item.supplierID === supplierID);
  }
  if (suppliername) {
    filteredData = filteredData.filter(item => item.suppliername.includes(suppliername));
  }
  if (country) {
    filteredData = filteredData.filter(item => item.country.includes(country));
  }
  if (contactInfo) {
    filteredData = filteredData.filter(item => item.contactInfo.includes(contactInfo));
  }
  if (userID) {
    filteredData = filteredData.filter(item => item.userID.includes(userID));
  }
  console.log('Filtered data:', filteredData); // 输出过滤后的数据

  // 返回过滤后的数据
  return [200, {
    code: filteredData.length > 0 ? 1 : 0,
    message: filteredData.length > 0 ? 'success' : 'no data',
    data: filteredData
  }];
});

// Mock for GET /supplier/query_not_found
mock.onGet('/api/supplier/query_not_found').reply(404, {
  "code": 0,
  "message": "supplier not found",
  "data": []
});
