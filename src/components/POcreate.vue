<template>
  <!-- 调试注意！！！因为可编辑表格并没有设置更改后就刷新，
    所以增加完项目后，点击右上方的Total Price计算总价，计算的时候会自动刷新了
    确保无误可以多点几次，如果不刷新则新加的条目可能不会被传输过去 -->
  <div class="total">
    <div class="search-container">
      <div class="search">
        <span class="spantext">Standard PO Number: {{ standardPOnum }}</span>
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
            :size="size"
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
            :size="size"
          />
        </div>
      </el-col>

      <el-col :span="4" class="price">
        <span class="totalprice" @click="totalprice"
          >Total Price: {{ totalPrice }}</span
        >
      </el-col>
      <el-col :span="1">
        <el-button type="primary" class="button" @click="save">save</el-button>
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
        field="number"
        title="Number"
        :edit-render="{ name: 'input' }"
        width="180"
      ></vxe-column>
      <vxe-column
        field="materialId"
        title="Material ID"
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
        field="storageLocation"
        title="Storage Location"
        :edit-render="{ name: 'input' }"
        width="180"
      ></vxe-column>
      <vxe-column
        field="unitOfMeasure"
        title="Unit of Measure"
        :edit-render="{ name: 'input' }"
        width="180"
      ></vxe-column>
      <vxe-column
        field="stockType"
        title="Stock Type"
        :edit-render="{ name: 'input' }"
        width="180"
      ></vxe-column>
      <vxe-column
        field="valuationType"
        title="Valuation Type"
        :edit-render="{ name: 'input' }"
        width="180"
      ></vxe-column>
      <vxe-column
        field="batch"
        title="Batch"
        :edit-render="{ name: 'input' }"
        width="180"
      ></vxe-column>
      <vxe-column
        field="specialStockIndicator"
        title="Special Stock Indicator"
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

const supplierID = ref("");
const orderDate = ref("");
const deliveryDate = ref("");
const standardPOnum = ref("0000000");
const totalPrice = ref(0.0);
const stockID = ref("");

// 表格中的准备采购的商品总信息
const poData = ref([
  // 以下为示例数据，包括了库存内容
  // 按Add Item 增加空白行，按save保存并传输数据
  {
    number: 5,
    materialId: "M123456",
    quantity: 100,
    netPrice: 150.5,
    currency: "USD",
    purchasingGroup: "PG123",
    purchasingOrganization: "PO1234",
    plant: "PL12345",
    storageLocation: "SL123",
    unitOfMeasure: "PCS",
    stockType: "STANDARD",
    valuationType: "VT123",
    batch: "B123456",
    specialStockIndicator: "SS123",
    paymentTerms: "a",
  },
  // 空的数据行
  {},
]);

//订单总信息
const metaData = computed(() => ({
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

// 增加一个空白行
const addNewRow = () => {
  poData.value.push({});
};

//计算总价，点击Total Price 文字计算总价
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

//保存并传输数据
const save = () => {
  const purchaseOrderItems = poData.value
    .filter((item) => item.quantity && item.netPrice)
    .map((item) => ({
      quantity: item.quantity,
      netPrice: item.netPrice,
      currency: item.currency,
      purchasingGroup: item.purchasingGroup,
      purchasingOrganization: item.purchasingOrganization,
      plant: item.plant,
      paymentTerms: item.paymentTerms,
    }))[0];

  const stockItems = poData.value
    .filter((item) => item.quantity && item.netPrice)
    .map((item) => ({
      materialID: item.materialId,
      plant: item.plant,
      storageLocation: item.storageLocation,
      unitOfMeasure: item.unitOfMeasure,
      stockType: item.stockType,
      valuationType: item.valuationType,
      batch: item.batch,
      specialStockIndicator: item.specialStockIndicator,
      quantity: item.quantity,
    }));
  axios
    .post("/api/stock/create", stockItems[0])
    .then((response) => {
      if (response.status === 201) {
        // 显示成功提示
        ElMessage({
          message: "Success",
          type: "success",
        });
      }
      stockID.value = response.data;
    })
    .catch((error) => {
      console.error("Error creating stock", error);
    });

  axios.post("/api/purchase_order/create", {
      ...metaData.value,
      ...purchaseOrderItems,
      stockID: stockID.value,
    })
    .then((response) => {
      if (response.status === 201) {
        // 显示成功提示
        ElMessage({
          message: "Success",
          type: "success",
        });
      }
      console.log("Purchase Orders Created:", response.data);

      // 显示创建完成后的订单号，可能需要根据不同的response进行调整
      standardPOnum.value = response.data;
    })
    .catch((error) => {
      console.error("Error creating Purchase Orders:", error);
    });
};

// 创建表格实例，实现表格行的增加
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
  margin-left: 90px;
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
