<template>
  <el-container class="DocumentFlow">
    <el-header class="header">
      <!-- 头部区域，包含主页图标和标题 -->
      <el-icon class="House" @click="navigateTo('/')">
        <House />
      </el-icon>
      <span class="title">Display Document Flow</span>
    </el-header>

    <!-- 搜索输入区域 -->
    <el-row class="input">
      <!-- 占位列 -->
      <el-col :span="8"></el-col>

      <!-- 用户ID标签 -->
      <el-col :span="2">
        <span class="label">User ID :</span>
      </el-col>

      <!-- 用户ID输入框 -->
      <el-col :span="4">
        <el-input
          v-model="searchQuery"
          placeholder="Enter User ID..."
          class="input-field"
        ></el-input>
      </el-col>

      <!-- 占位列 -->
      <el-col :span="1"></el-col>

      <!-- GO按钮，应用筛选 -->
      <el-col :span="4">
        <el-button type="primary" @click="applyFilter" plain> GO </el-button>
      </el-col>
    </el-row>

    <!-- 显示筛选后的记录 -->
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
        <!-- 用户ID列 -->
        <el-table-column
          prop="userID"
          label="userID"
          width="495"
        ></el-table-column>

        <!-- 采购订单ID列 -->
        <el-table-column
          prop="purchaseOrderID"
          label="PurchaseOrderID"
          width="500"
        ></el-table-column>

        <!-- 收货单ID列 -->
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { ElMessageBox } from "element-plus";

export default {
  setup() {
    // 响应式变量，存储用户输入的User ID
    const searchQuery = ref("");

    // 响应式变量，存储筛选后的表格数据
    const filteredTableData = ref([]);

    // Vue Router实例，用于处理导航
    const router = useRouter();

    // 根据用户ID获取数据的函数
    async function fetchData(userID) {
      try {
        // 发送POST请求获取数据
        const response = await axios.post(
          "/api/document_flow/display",
          {
            userID: userID,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // 检查响应并更新表格数据
        if (response.data.code === 200 && response.data.data.length > 0) {
          filteredTableData.value = response.data.data;
        } else {
          // 如果未找到数据，则清空表格并显示提示框
          filteredTableData.value = [];
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
        // 请求失败时的错误处理
        console.error("Error fetching data:", error);
        ElMessageBox.alert("Failed to fetch data!", "Error", {
          confirmButtonText: "OK",
          type: "error",
        });
      }
    }

    // 在点击“GO”按钮时应用筛选的函数
    function applyFilter() {
      fetchData(searchQuery.value);
    }

    // 导航到指定路径的函数
    function navigateTo(path) {
      router.push(path);
    }

    // 返回响应式变量和方法，供模板使用
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

/* 全局背景样式 */
.DocumentFlow {
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

/* 头部样式 */
.header {
  display: flex;
  align-items: center;
  padding: 20px 80px;
  border-bottom: 2px solid black;
}

/* 主页图标样式 */
.House {
  font-size: 25px;
  right: 60px;
}

/* 标题样式 */
.title {
  flex-grow: 1;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  color: white;
}

/* 输入区域样式 */
.input {
  margin-top: 20px;
  margin-bottom: 20px;
}

/* 标签样式 */
.label {
  font-size: 17px;
}

/* 表格样式 */
.el-table {
  background-color: #fefefee4;
}
</style>
