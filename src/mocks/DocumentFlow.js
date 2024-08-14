import mock from './axios-mock';
// Mock for GET /document_flow/display

document_flow_display_headers = {
    "Authorization":	"Bearer <token>",
    "Content-Type":	"application/json"
}

document_flow_display_params = {
    "purchaseOrderID":	1,
    "goodsReceiptID":	1,
    "userID":	1
}


// `display_success` response case 
mock.onGet('/api/document_flow/display_success/finished').reply(200, {
    "code": 200,
    "message": "success",
    "data": [
        {
            "purchaseOrderID": 1,
            "goodsReceiptID": 1,
            "userID": 1
        },
        {
            "purchaseOrderID": 2,
            "goodsReceiptID": 2,
            "userID": 2
        }
    ]
});


// `display_success` response case 
mock.onGet('/api/document_flow/display_success/unfinished').reply(200, {
    "code": 200,
    "message": "success",
    "data": [
        {
            "purchaseOrderID": 1,
            "goodsReceiptID": 1,
            "userID": 1
        },
        {
            "purchaseOrderID": 2,
            "goodsReceiptID": 2,
            "userID": 2
        }
    ]
});


// `display_not_found` response case 
mock.onGet('/api/document_flow/display_not_found').reply(200, {
    "code": 404,
    "message": "document flow not found",
    "data": []
});

