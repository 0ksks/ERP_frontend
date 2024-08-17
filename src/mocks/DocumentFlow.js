import mock from "./axios-mock";
// Mock for GET /document_flow/display

const mockData = [
  {
    purchaseOrderID: "purchaseOrderID_value1",
    goodsReceiptID: "goodsReceiptID_value1",
    userID: "userID_value1",
  },
  {
    purchaseOrderID: "purchaseOrderID_value2",
    goodsReceiptID: "goodsReceiptID_value2",
    userID: "userID_value2",
  },
];

// `display_success` response case
mock.onGet("/api/document_flow/display_success/finished").reply((config) => {
  const { purchaseOrderID, goodsReceiptID, userID } = config.params;

  let filteredData = mockData;

  if (userID) {
    filteredData = filteredData.filter((item) => item.userID.includes(userID));
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

// `display_not_found` response case
mock.onGet("/api/document_flow/display_not_found").reply(200, {
  code: 404,
  message: "document flow not found",
  data: [],
});
