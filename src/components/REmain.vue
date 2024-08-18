<template>
  <div class="search-container">
    <div class="search">
      <span class="infoText">Purchase Order :</span>
      <el-input
        placeholder="Enter PO Number"
        v-model="searchPO"
        class="input"
      ></el-input>
      <el-button slot="append" icon="Search" @click="find"></el-button>

      <!-- 用于查找的弹出框 -->
      <el-dialog v-model="search" title="Select Purchase Order" width="80vw">
        <span class="searchText">Search Term:</span>
        <el-input
          placeholder="请输入内容"
          v-model="sterm"
          class="input-with-select"
        ></el-input>
        <el-button type="primary" @click="go" class="go">Go</el-button>

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
    </div>
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      search: ref(false),
      searchPO: ref(""),
      sterm: ref(""),
      poDetail: ref(""),
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
      formLabelWidth: "140px",
    };
  },
  methods: {
    find() {
      console.log(this.poDetail)
      if (!this.searchPO) {
        // 如果搜索项为空，则显示用于查找的弹出框
        this.search = true;
      } else {
        // 如果搜索项有内容，则直接执行查找操作
        this.search = false;
        this.queryByPO(this.searchPO);
        if(this.poDetail){
          this.routeToCreate(this.poDetail);
        }
      }
    },
    queryByPO(searchPO) {
      axios
        .post("/api/purchase_order/query", {
          purchaseOrderID: searchPO.value
        }, {
          headers: {
            // Authorization: `Bearer ${token_value}`,
            "Content-Type": "application/json"
          }
        })
        .then((response) => {
          if (response.status === 200) {
            // 处理正常的响应情况
            console.log("Purchase Orders Found:", response.data);
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
    detailed(row) {
      const poNumber = row.POnumber;
      this.poDetail = poNumber;
      this.routeToCreate(this.poDetail);
    },
    go(sterm) {
      //query By UserID(search term)
      axios
        .post("/api/purchase_order/query", {
          userID: sterm.value
        }, {
          headers: {
            Authorization: `Bearer ${token_value}`,
            "Content-Type": "application/json"
          }
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
    routeToCreate(poDetail) {
      // 将获取的poDetail传到目标界面
      // 将 poDetail 转换为字符串形式，并作为查询参数传递
      this.$router.push({
        name: "recreate",
        params: { poDetail: poDetail },
      });
    },
  },
  components: { RouterView, RouterLink },
};
</script>

<style scoped>
.input {
  width: 15vw;
}
.go {
  margin-left: 30px;
}
.searchText {
  font-size: 15px;
  font-weight: 500;
  margin-right: 20px;
}
.infoText {
  font-size: 17px;
  font-weight: 500;
}

.input-with-select {
  width: 40vh;
  height: 5vh;
  background-color: #fff;
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
</style>
