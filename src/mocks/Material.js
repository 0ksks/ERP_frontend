import mock from './axios-mock';

// Mock for POST /material/create
mock.onPost('/api/material/create_success').reply(200, {
  code: 1,
  message: 'success',
  data: {
    materialID: 'materialID_value',
  },
});

// Mock for PATCH /material/update
mock.onPatch('/api/material/update_success').reply(200, {
  code: 1,
  message: 'success',
  data: {},
});

mock.onPatch('/api/material/update_not_found').reply(404, {
  code: 0,
  message: 'material not found',
  data: [],
});

// Mock for GET /material/query

// Mocked data array
const mockData = [
  {
    materialID: 'materialID_value1',
    materialName: 'materialName_value1',
    description: 'description_value1',
    baseUnit: 'baseUnit_value1',
    materialGroup: 'materialGroup_value1',
    division: 'division_value1',
    grossWeight: 1.1,
    netWeight: 1.1,
    weightUnit: 'weightUnit_value1',
    volume: 1.1,
    volumeUnit: 'volumeUnit_value1',
    packMaterial: 'packMaterial_value1',
    availabilityCheck: 'availabilityCheck_value1',
    transportationGroup: 'transportationGroup_value1',
    loadingGroup: 'loadingGroup_value1',
    mrpType: 'mrpType_value1',
    mrpController: 'mrpController_value1',
    lotSize: 'lotSize_value1',
    minimumLotSize: 1,
    plannedDeliveryTime: 1,
    valuationClass: 'valuationClass_value1',
    movingPrice: 1.1,
    priceUnit: 1,
    standardPrice: 1.1,
    userID: 'userID_value1',
  },
  {
    materialID: 'materialID_value2',
    materialName: 'materialName_value2',
    description: 'description_value2',
    baseUnit: 'baseUnit_value2',
    materialGroup: 'materialGroup_value2',
    division: 'division_value2',
    grossWeight: 2.2,
    netWeight: 2.2,
    weightUnit: 'weightUnit_value2',
    volume: 2.2,
    volumeUnit: 'volumeUnit_value2',
    packMaterial: 'packMaterial_value2',
    availabilityCheck: 'availabilityCheck_value2',
    transportationGroup: 'transportationGroup_value2',
    loadingGroup: 'loadingGroup_value2',
    mrpType: 'mrpType_value2',
    mrpController: 'mrpController_value2',
    lotSize: 'lotSize_value2',
    minimumLotSize: 2,
    plannedDeliveryTime: 2,
    valuationClass: 'valuationClass_value2',
    movingPrice: 2.2,
    priceUnit: 2,
    standardPrice: 2.2,
    userID: 'userID_value2',
  },
];

mock.onGet('/api/material/query_success').reply(config => {
  const params = config.params;
  const { materialID, materialName, description, materialGroup, userID } =
    params;

  // 过滤数据
  let filteredData = mockData;

  if (materialID) {
    filteredData = filteredData.filter(item => item.materialID === materialID);
  }
  if (materialName) {
    filteredData = filteredData.filter(item =>
      item.materialName.includes(materialName)
    );
  }
  if (description) {
    filteredData = filteredData.filter(item =>
      item.description.includes(description)
    );
  }
  if (materialGroup) {
    filteredData = filteredData.filter(item =>
      item.materialGroup.includes(materialGroup)
    );
  }
  if (userID) {
    filteredData = filteredData.filter(item => item.userID.includes(userID));
  }

  // 返回过滤后的数据
  return [
    200,
    {
      code: filteredData.length > 0 ? 1 : 0,
      message: filteredData.length > 0 ? 'success' : 'no data',
      data: filteredData,
    },
  ];
});

// Mock for GET /material/query_not_found
mock.onGet('/api/material/query_not_found').reply(404, {
  code: 0,
  message: 'material not found',
  data: [],
});
