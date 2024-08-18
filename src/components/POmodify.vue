<template>
  <!-- 调试注意同POcreate -->
  <!-- uodate的逻辑是发新的，删掉旧的 -->
  <div class="total">
    <div class="search-container">
      <div class="search">
        <span class="spantext">Standard PO Number:</span>
        <el-input
          placeholder="请输入内容"
          v-model="poNum"
          class="input-with-select"
        ></el-input>
        <el-button @click="find" slot="append" class="search-button"
          >Find</el-button
        >
      </div>
    </div>

    <el-row class="row">
      <el-col :span="5" class="col">
        <div class="search">
          <span class="text">Supplier ID:</span>
          <el-input
            placeholder="请输入内容"
            v-model="supplierID"
            class="small"
          ></el-input>
        </div>
      </el-col>

      <el-col :span="5" class="col">
        <div class="search">
          <span class="text">OrderDate:</span>
          <el-date-picker
            v-model="orderDate"
            type="date"
            placeholder="Pick a day"
          />
        </div>
      </el-col>

      <el-col :span="5" class="col">
        <div class="search">
          <span class="text">DeliveryDate:</span>
          <el-date-picker
            v-model="deliveryDate"
            type="date"
            placeholder="Pick a day"
          />
        </div>
      </el-col>

      <el-col :span="4" class="price">
        <span class="totalprice" @click="totalprice"
          >Total Price: {{ totalPrice }}</span
        >
      </el-col>
      <el-col :span="1">
        <el-button type="primary" class="button" @click="save"
          >save modify</el-button
        >
      </el-col>
    </el-row>

    <vxe-table
      border
      show-overflow
      :edit-config="{ trigger: 'click', mode: 'cell' }"
      :data="poData"
      class="table"
      ref="tableRef"
    >
      <vxe-column type="seq" width="70"></vxe-column>
      <vxe-column
        field="stockId"
        title="Stock ID"
        :edit-render="{ name: 'input' }"
        width="180"
      ></vxe-column>
      <vxe-column
        field="quantity"
        title="Quantity"
        :edit-render="{ name: 'input' }"
        width="180"
      ></vxe-column>
      <vxe-column
        field="netPrice"
        title="Net Price"
        :edit-render="{ name: 'input' }"
        width="180"
      ></vxe-column>
      <vxe-column
        field="currency"
        title="Currency"
        :edit-render="{ name: 'input' }"
        width="180"
      ></vxe-column>
      <vxe-column
        field="purchasingGroup"
        title="Purchasing Group"
        :edit-render="{ name: 'input' }"
        width="180"
      ></vxe-column>
      <vxe-column
        field="purchasingOrganization"
        title="Purchasing Organization"
        :edit-render="{ name: 'input' }"
        width="180"
      ></vxe-column>
      <vxe-column
        field="plant"
        title="Plant"
        :edit-render="{ name: 'input' }"
        width="180"
      ></vxe-column>
      <vxe-column
        field="paymentTerms"
        title="Payment Terms"
        :edit-render="{ name: 'input' }"
        width="180"
      ></vxe-column>
    </vxe-table>
    <el-button type="primary" class="add" @click="insertEvent(-1)"
      >Add Items</el-button
    >
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

const poNum = ref("");
const supplierID = ref("");
const orderDate = ref("");
const deliveryDate = ref("");
const totalPrice = ref(0.0);

//根据订单号查询并展示订单
const find = () => {
  axios
    .get("/api/purchase_order/query", {
      params: { purchaseOrderID: poNum.value },
      headers: {
        Authorization: `Bearer ${token_value}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        // 处理正常的响应情况
        console.log("Purchase Orders Found:", response.data);
        // 更新数据
        updateData(response.data);
      } else if (response.status === 204) {
        // 处理订单未找到的情况
        console.log("Response:", response);
        ElMessage({
          message: "purchase order not found",
          type: "warning",
        });
      }
    })
    .catch((error) => {
      console.error("Error querying Purchase Orders:", error);
    });
};

// 更新 poData和metaData
const updateData = (responseData) => {
  // 假设 responseData 是一个数组，每个元素都是一个采购订单的信息
  if (Array.isArray(responseData)) {
    poData.value = responseData.map((order) => ({
      stockId: order.stockId,
      quantity: order.quantity,
      netPrice: order.netPrice,
      currency: order.currency,
      purchasingGroup: order.purchasingGroup,
      purchasingOrganization: order.purchasingOrganization,
      plant: order.plant,
      paymentTerms: order.paymentTerms,
    }));
    supplierID.value = responseData.supplierID;
    orderDate.value = responseData.orderDate;
    deliveryDate.value = responseData.deliveryDate;
  } else {
    console.error("Invalid data format received from server.");
  }
};

//订单总信息
const metaData = computed(() => ({
  poNum: poNum.value,
  supplierID: supplierID.value,
  orderDate: formatDate(orderDate.value),
  deliveryDate: formatDate(deliveryDate.value),
}));

// 辅助函数用于格式化日期
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份是从0开始的，所以需要 +1
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

const poData = ref([
  // 以下为示例数据
  // 此处数据不包括库存内容
  // 按Add Item 增加空白行，按save保存并传输数据
  // {
  //   materialId: 'M123456',
  //   quantity: 100,
  //   netPrice: 150.50,
  //   currency: 'USD',
  //   purchasingGroup: 'PG123',
  //   purchasingOrganization: 'PO1234',
  //   plant: 'PL12345',
  //   paymentTerms:'a',
  // },
  // 空的数据行
  {},
]);

const addNewRow = () => {
  poData.value.push({});
};

const totalprice = () => {
  const itemArray = poData.value;
  let total = 0;
  for (let i = 0; i < itemArray.length; i++) {
    if (itemArray[i].quantity == undefined) {
      break;
    }
    total += itemArray[i].quantity * itemArray[i].netPrice;
  }
  totalPrice.value = total;
};
//修改订单
const save = () => {
  const purchaseOrderItems = poData.value
    .filter((item) => item.quantity && item.netPrice)
    .map((item) => ({
      stockId: item.stockId,
      quantity: item.quantity,
      netPrice: item.netPrice,
      currency: item.currency,
      purchasingGroup: item.purchasingGroup,
      purchasingOrganization: item.purchasingOrganization,
      plant: item.plant,
      paymentTerms: item.paymentTerms,
    }))[0];
  axios
    .post(
      "/api/purchase_order/update",
      {
        ...metaData.value,
        ...purchaseOrderItems,
      },
      {
        headers: {
          Authorization: `Bearer ${token_value}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      if (response.status === 200) {
        // 显示成功提示
        ElMessage({
          message: "修改成功",
          type: "success",
        });
      }
    })
    .catch((error) => {
      console.error("Error updating Purchase Orders:", error);
    });
};

const tableRef = ref();
const insertEvent = async (row) => {
  const $table = tableRef.value;
  if ($table) {
    const record = {};
    const { row: newRow } = await $table.insertAt(record, row);
    await $table.setEditCell(newRow, "name");
  }
  addNewRow();
};
</script>

<style scoped>
.add {
  display: flex;
  margin-left: 80vw;
  margin-top: 20px;
}
.totalprice {
  margin-left: 30px;
  font-size: 18px;
  font-weight: 500;
  color: #000;
}
.price {
  display: flex;
}
.table {
  width: 100%;
  margin-top: 15px;
}
.button {
  margin-left: 80px;
}
.row {
  margin-top: 25px;
}
.col {
  margin-left: 25px;
}
.small {
  height: 5vh;
  width: 20vh;
}
.text {
  font-size: 16px;
  font-weight: 500;
  color: #000;
}
.input-with-select {
  width: 40vh;
  height: 5vh;
  background-color: #fff;
}
.search {
  display: flex; /* 使内部元素水平排列 */
  gap: 12px;
}

.search-container {
  flex: 1;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}
.spantext {
  font-size: 18px;
  font-weight: 500;
  color: #000;
}
.total {
  height: 100%;
  width: 100%;
  margin: 0;
}
.search {
  display: flex; /* 使内部元素水平排列 */
  gap: 15px;
}
</style>
