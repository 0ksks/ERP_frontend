<template>
  <el-container class="material">
    <el-header class="header">
      <el-icon class="House" @click="navigateTo('/')">
        <House />
      </el-icon>
      <span class="title">Display Document Flow</span>
    </el-header>

    <el-row class="input">
      <el-col :span="8"></el-col>

      <el-col :span="2">
        <span class="label">User ID :</span>
      </el-col>

      <el-col :span="4">
        <el-input
          v-model="searchQuery"
          placeholder="Enter User ID..."
          class="input-field"
        ></el-input>
      </el-col>

      <el-col :span="1"></el-col>
      <el-col :span="4">
        <el-button type="primary" @click="applyFilter" plain> GO </el-button>
      </el-col>
    </el-row>

    <!-- 筛选出的记录 -->
    <div>
      <el-table
        :data="filteredTableData"
        :header-cell-style="{
          textAlign: 'center',
          color: 'rgba(73, 144, 236, 1)',
          backgroundColor: '#f0f0f0',
          height: '8vh',
        }"
        :cell-style="{ textAlign: 'center', height: '5vh' }"
        height="80vh"
        class="custom-table"
        style="width: 250vh; margin-top: 1vh"
      >
        <el-table-column
          prop="userID"
          label="userID"
          width="495"
        ></el-table-column>
        <el-table-column
          prop="purchaseOrderID"
          label="PurchaseOrderID"
          width="500"
        ></el-table-column>
        <el-table-column
          prop="goodsReceiptID"
          label="GoodsReceiptID"
          width="500"
        ></el-table-column>
      </el-table>
    </div>
  </el-container>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { ElMessageBox } from "element-plus";

export default {
  setup() {
    const searchQuery = ref(""); // Use searchQuery for user input
    const filteredTableData = ref([]);
    const router = useRouter();

    async function fetchData(userID) {
      try {
        const response = await axios.get(
          "/api/document_flow/display_success/finished",
          {
            params: { userID },
          }
        );
        if (response.data.code === 1 && response.data.data.length > 0) {
          filteredTableData.value = response.data.data;
        } else {
          filteredTableData.value = []; // Clear data if no results
          ElMessageBox.alert(
            "No records found with the given ID.",
            "Search Failed",
            {
              confirmButtonText: "OK",
              type: "error",
            }
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        ElMessageBox.alert("Failed to fetch data!", "Error", {
          confirmButtonText: "OK",
          type: "error",
        });
      }
    }

    function applyFilter() {
      fetchData(searchQuery.value); // Pass searchQuery to fetchData
    }

    function navigateTo(path) {
      router.push(path);
    }

    onMounted(() => {
      // Fetch initial data if needed
    });
    console.log("filteredTableData:", filteredTableData); // 输出过滤后的数据
    return {
      searchQuery,
      filteredTableData,
      navigateTo,
      applyFilter,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");

.material {
  background: linear-gradient(
    to bottom,
    rgba(127, 167, 226, 1),
    rgba(197, 217, 247, 1),
    rgba(255, 255, 255, 1)
  );
  height: 100vh;
  margin: 0;
  padding: 0 80px;
  box-sizing: border-box;
}
.header {
  display: flex;
  align-items: center;
  padding: 20px 80px;
  border-bottom: 2px solid black;
}

.House {
  font-size: 25px;
  right: 60px;
}

.title {
  flex-grow: 1;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  color: white;
}

.input {
  margin-top: 20px;
  margin-bottom: 20px;
}

.divider {
  margin-top: 15px;
  margin-bottom: 15px;
}

.label {
  font-size: 17px;
}

.el-table {
  background-color: #fefefee4;
}
</style>
