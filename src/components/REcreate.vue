<template>
  <div class="search-container">
    <div class="search">
      <span class="spantext">Goods Receipt ID : {{ recID }}</span>
    </div>
  </div>
  <el-row class="row">
    <el-col :span="24" class="header">
      <div class="texts">
        <span class="maintext">Supplier Name (ID) : {{ supplier }}</span>
        <span class="smalltext">Purchase Order : {{ poNUm }}</span>
        <span class="smalltext">Purchase Order Type : {{ poType }}</span>
      </div>
      <el-button type="primary" class="post" @click="post">Post</el-button>
    </el-col>
  </el-row>
  <el-row class="big">
    <el-col :span="24" class="rebody">
      <el-row>
        <el-col :span="8" class="col">
          <div class="search">
            <span class="stext">Receipt Date:</span>
            <div class="picker">
              <el-date-picker
                v-model="receiptDate"
                type="date"
                placeholder="Pick a day"
                :size="size"
              />
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="col">
          <div class="search">
            <span class="smallertext">Document Date:</span>
            <div class="picker">
              <el-date-picker
                v-model="documentDate"
                type="date"
                placeholder="Pick a day"
                :size="size"
              />
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="col">
          <div class="search">
            <span class="smallertext">Posting Date:</span>
            <div class="picker">
              <el-date-picker
                v-model="postingDate"
                type="date"
                placeholder="Pick a day"
                :size="size"
              />
            </div>
          </div>
        </el-col>
      </el-row>

      <el-table
        :data="goodsData"
        class="table"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="materialId"
          label="Material ID"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="quantity"
          label="Quantity"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="batch"
          label="Batch"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="storageLocation"
          label="Storage Location"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="plant"
          label="Plant"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="movementType"
          label="Movement Type"
          width="180"
        ></el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  mounted() {
    // 在mounted生命周期中使用axios请求对应poDetail的数据
    const poDetail = this.$route.params.poDetail;
    console.log(poDetail);
    this.poNUm = poDetail;
    this.fetchData(poDetail);
  },
  data() {
    return {
      recID: ref("0000"),
      supplierID: ref("temp"),
      poNUm: ref("00000000"),
      poType: ref("defaultType"),
      receiptDate: ref(""),
      documentDate: ref(""),
      postingDate: ref(""),
      goodsData: [
        {
          stockID: "001",
          materialId: "M123456",
          quantity: 100,
          batch: "B123456", //属于 Stock
          storageLocation: "SL123", //Stock
          plant: "PL12345",
          movementType: "MT123", //Stock
        },
      ],
      selectedRows: [],
    };
  },
  computed: {
    // 计算属性
    metaData() {
      return {
        purchaseOrderID: this.poDetail,
        supplierID: this.supplierID,
        receiptDate: this.formatDate(this.receiptDate),
        documentDate: this.formatDate(this.documentDate),
        postingDate: this.formatDate(this.postingDate),
      };
    },
  },
  methods: {
    handleSelectionChange(rows) {
      this.selectedRows = rows;
      console.log(this.selectedRows.value);
    },
    fetchData(poDetail) {
      axios
        .get("/purchase_order/query", {
          params: { purchaseOrderID: poDetail },
          headers: {
            Authorization: "Bearer YOUR_ACCESS_TOKEN", // 更改 token
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("Purchase Orders Found:", response.data);
            // 更新数据
            this.updateData(response.data);
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
    },
    updateData(responseData) {
      if (Array.isArray(responseData)) {
        this.goodsData.value = responseData.map((order) => ({
          stockId: order.stockId,
          quantity: order.quantity,
          plant: order.plant,
        }));
        this.supplierID = responseData.supplierID;
      } else {
        console.error("Invalid data format received from server.");
      }
    },
    updateGoodsData(responseData) {
      if (Array.isArray(responseData)) {
        this.goodsData.value = responseData.map((order) => ({
          materialID: order.materialId,
          batch: order.batch,
          storageLocation: order.storageLocation,
        }));
        this.supplierID = responseData.supplierID;
      } else {
        console.error("Invalid data format received from server.");
      }
    },
    queryStock(stockId) {
      axios
        .get("/stock/query", {
          params: { stockID: stockId },
          headers: {
            Authorization: "Bearer YOUR_ACCESS_TOKEN", // 更改 token
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            // 处理成功的响应情况
            console.log("库存信息查询成功:", response.data);
            this.updateGoodsData(response.data);
          } else {
            console.log("库存信息查询失败，状态码:", response.status);
          }
        })
        .catch((error) => {
          console.error("查询库存信息时出错:", error);
        });
    },

    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份是从0开始的，所以需要 +1
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}/${month}/${day}`;
    },
    post() {
      // 获取选择的数据
      const selectedRows = this.selectedRows;
      // 格式化数据
      const goodsReceiptItems = selectedRows.map((item) => ({
        materialID: item.materialID,
        quantity: item.quantity,
        batch: item.batch,
        storageLocation: item.storageLocation,
        plant: item.plant,
      }));
      // 请求体
      const requestBody = {
        ...this.metaData,
        items: goodsReceiptItems,
        //user ID
      };
      axios
        .post("/goods_receipt/create", requestBody, {
          headers: {
            // 这里要更换为调试用的用户token
            Authorization: "Bearer YOUR_ACCESS_TOKEN",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 201) {
            // 显示成功提示
            ElMessage({
              message: "Success",
              type: "success",
            });
            console.log("Goods Receipt Created:", response.data);
            // 显示创建完成后的Receipt Num
            this.recID = response.data;
          }
        })
        .catch((error) => {
          console.error("Error creating Goods Receipt:", error);
        });
    },
  },
};
</script>

<style scoped>
.table {
  display: flex;
  margin-left: 80px;
  width: 75vw;
  margin-top: 30px;
}
.post {
  margin-right: 60px;
  margin-top: 30px;
}
.picker {
  margin-top: 15px;
}
.stext {
  font-size: 15px;
  font-weight: 500;
  color: rgb(0, 0, 0);
  margin-left: 80px;
  margin-top: 15px;
}
.smallertext {
  font-size: 15px;
  font-weight: 500;
  color: rgb(0, 0, 0);
  margin-left: 10px;
  margin-top: 15px;
}
.rebody {
  display: flex;
  flex-direction: column;
  background-color: white;
}
.big {
  width: 100%;
  height: 450px;
}
.smalltext {
  font-size: 15px;
  font-weight: 500;
  color: rgb(98, 98, 98);
  margin-left: 80px;
}
.maintext {
  font-size: 18px;
  font-weight: 500;
  color: #000;
  margin-left: 80px;
  margin-top: 15px;
}
.row {
  width: 100%;
  height: 100px;
}
.texts {
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  justify-content: space-between;
  background-color: rgb(239, 239, 239);
}
.search {
  display: flex; /* 使内部元素水平排列 */
  gap: 15px;
}

.search-container {
  display: flex;
  justify-content: center;
  /* align-items: center; */
}
.spantext {
  font-size: 18px;
  font-weight: 500;
  color: #000;
  margin-bottom: 15px;
}
</style>
