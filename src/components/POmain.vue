<template>
  <!-- 本组件为初始页面，包括初始界面分界线以下部分 -->
  <div class="total">
    <!-- Header 下方的一排内容 -->
    <el-row class="top">
      <!-- Create new button -->
      <el-col :span="7">
        <el-button
          type="text"
          @click="navigateTo('/create')"
          class="create-new"
        >
          Create new
        </el-button>
      </el-col>

      <!-- Centered content -->
      <el-col :span="3">
        <span class="label">Standard PO :</span>
      </el-col>

      <el-col :span="4">
        <el-input
          v-model="searchPO"
          placeholder="Enter PO Number..."
        ></el-input>
      </el-col>
      <el-col :span="1">
        <el-button slot="append" icon="Search" @click="find"></el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="navigateTo('/modify')" plain>
          Modify
        </el-button>
      </el-col>
    </el-row>

    <div class="search-container">
      <div class="search">
        <!-- 用于查找的弹出框 -->
        <el-dialog v-model="search" title="Find Purchasing Order" width="500">
          <el-form :model="form">
            <!-- Search Term 为UserID -->
            <el-form-item label="Search Term:" :label-width="formLabelWidth">
              <el-input v-model="sterm" autocomplete="off" class="searchBox" />
            </el-form-item>
          </el-form>
          <template #footer>
            <el-button type="primary" @click="go(this.sterm)">Find</el-button>
          </template>
        </el-dialog>

        <!-- 查找结果弹出框 -->
        <el-dialog
          v-if="found"
          v-model="result"
          title="Find Purchasing Order(result)"
          width="500"
        >
          <el-table :data="tableData" @row-click="detailed">
            <el-table-column
              prop="searchTerm"
              label="Search Term"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="POnumber"
              label="PO Number"
              width="180"
            ></el-table-column>
          </el-table>
        </el-dialog>
        <!-- 失败提示框 -->
        <el-dialog
          v-else
          v-model="result"
          title="Find Purchasing Order(result)"
          width="500"
        >
          查找失败
        </el-dialog>

        <!-- 查看详情界面（detail）弹出框 -->
        <el-dialog v-model="detail" title="Detail" width="80vw">
          <span>PO Number:{{ poDetail }}</span>
          <el-table :data="poData" class="table">
            <el-table-column
              prop="materialId"
              label="Material ID"
              width="180"
            />
            <el-table-column prop="quantity" label="Quantity" width="180" />
            <el-table-column prop="netPrice" label="Net Price" width="180" />
            <el-table-column prop="currency" label="Currency" width="180" />
            <el-table-column
              prop="purchasingGroup"
              label="Purchasing Group"
              width="180"
            />
            <el-table-column
              prop="purchasingOrganization"
              label="Purchasing Organization"
              width="180"
            />
            <el-table-column prop="plant" label="Plant" width="180" />
            <el-table-column
              prop="paymentTerms"
              label="Payment Terms"
              width="180"
            />
          </el-table>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      search: ref(false),
      result: ref(false),
      detail: ref(false),
      found: ref(true),
      searchPO: ref(""),
      poDetail: ref(""),
      formLabelWidth: "140px",
      sterm: ref(""),
      selectPO: ref(""),
      tableData: [
        {
          searchTerm: "111",
          POnumber: "11111111",
        },
        {
          searchTerm: "222",
          POnumber: "22222222",
        },
        {
          searchTerm: "333",
          POnumber: "33333333",
        },
      ],
      poData: [
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
          paymentTerms: "PT123",
        },
      ],
    };
  },

  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    find() {
      if (!this.searchPO) {
        // 如果搜索项为空，则显示用于查找的弹出框
        this.search = true;
      } else {
        // 如果搜索项有内容，则直接执行查找操作
        this.search = false;
        this.queryByPO(this.searchPO);
        this.detail = true;
      }
    },
    detailed(row) {
      const poNumber = row.POnumber;
      this.queryByPO(poNumber);
      this.detail = true;
      this.poDetail = poNumber;
    },
    queryByPO(searchPO) {
      axios
        .get("/purchase_order/query", {
          params: { purchaseOrderID: searchPO.value },
          headers: {
            Authorization: "Bearer YOUR_ACCESS_TOKEN", // 更改 token
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            // 处理正常的响应情况

            console.log("Purchase Orders Found:", response.data);
            // 更新数据
            this.updateData(response.data);
            this.poDetail = response.data.purchaseOrderID; //根据返回值情况修改
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
      // 假设 responseData 是一个数组，每个元素都是一个采购订单的信息
      if (Array.isArray(responseData)) {
        poData.value = responseData.map((order) => ({
          materialId: order.materialId,
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
    },
    go(sterm) {
      //query By UserID(search term)
      this.result = true;
      axios
        .get("/purchase_order/query", {
          params: { userID: sterm.value },
          headers: {
            Authorization: "Bearer YOUR_ACCESS_TOKEN", // 更改 token
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            // 处理正常的响应情况
            this.found = true;
            console.log("Purchase Orders Found:", response.data);
            // 制作表格数据
            this.updateTableData(response.data);
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
    updateTableData(responseData) {
      // 假设 responseData 是一个数组，每个元素都是一个采购订单的信息
      if (Array.isArray(responseData)) {
        this.tableData = responseData.map((order) => ({
          searchTerm: order.searchTerm, //根据返回值的情况修改
          POnumber: order.POnumber,
        }));
      } else {
        console.error("Invalid data format received from server.");
      }
    },
  },
};
</script>

<style scoped>
.top {
  margin-bottom: 20px;
}
.create-new {
  font-size: 15px;
  color: white;
  text-decoration: underline;
  right: 60px;
}
.label {
  font-size: 17px;
}
.table {
  width: 95vw;
  margin-top: 15px;
  margin-left: 5px;
}
.searchBox {
  width: 5vw;
}

.search {
  display: flex; /* 使内部元素水平排列 */
  gap: 15px;
}

.search-container {
  flex: 1;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}
.total {
  height: 100%;
  width: 100%;
  margin: 0;
}
</style>
