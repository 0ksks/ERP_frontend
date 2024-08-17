import mock from "./axios-mock";

const mockData = [
  {
    stockID: "stockID_value1",
    materialID: "materialID_value1",
    plant: "plant_value1",
    storageLocation: "storageLocation_value1",
    quantity: "100",
    unitOfMeasure: "unitOfMeasure_value1",
    stockType: "stockType_value1",
    valuationType: "valuationType_value1",
    batch: "batch_value1",
    specialStockIndicator: "specialStockIndicator_value1",
    userID: "userID_value1",
  },
  {
    stockID: "stockID_value2",
    materialID: "materialID_value1",
    plant: "plant_value2",
    storageLocation: "storageLocation_value2",
    quantity: "200",
    unitOfMeasure: "unitOfMeasure_value2",
    stockType: "stockType_value2",
    valuationType: "valuationType_value2",
    batch: "batch_value2",
    specialStockIndicator: "specialStockIndicator_value2",
    userID: "userID_value2",
  },
  {
    stockID: "stockID_value3",
    materialID: "materialID_value1",
    plant: "plant_value3",
    storageLocation: "storageLocation_value3",
    quantity: "300",
    unitOfMeasure: "unitOfMeasure_value3",
    stockType: "stockType_value3",
    valuationType: "valuationType_value3",
    batch: "batch_value3",
    specialStockIndicator: "specialStockIndicator_value3",
    userID: "userID_value3",
  },
];

// `display_success` response case
mock.onGet("/api/stock/display_success/finished").reply((config) => {
  const { materialID } = config.params;

  let filteredData = mockData;

  if (materialID) {
    filteredData = filteredData.filter((item) =>
      item.materialID.includes(materialID)
    );
  }

  console.log("Filtered data:", filteredData); // 输出过滤后的数据
  // 返回过滤后的数据
  return [
    200,
    {
      code: filteredData.length > 0 ? 1 : 0,
      message: filteredData.length > 0 ? "success" : "no data",
      data: filteredData,
    },
  ];
});

// `query_not_found` response case
mock.onGet("/api/stock/query_not_found").reply(404, {
  code: 0,
  message: "stock not found",
  data: [],
});
