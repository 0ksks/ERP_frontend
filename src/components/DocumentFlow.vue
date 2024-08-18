<template>
  <el-container class="DocumentFlow">
    <el-header class="header">
      <!-- 头部区域 -->
      <el-icon class="House" @click="navigateTo('/')">
        <House />
      </el-icon>
      <span class="title">Display Document Flow</span>
    </el-header>

    <!-- 搜索输入区域 -->
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ElMessageBox } from 'element-plus';

export default {
  setup() {
     // 定义响应式数据
    const searchQuery = ref(''); //存储用户输入的userID
    const filteredTableData = ref([]);//存储筛选后表格数据
    const router = useRouter();

    // 根据用户ID获取数据函数——{{在applyFilter函数中调用}}
    async function fetchData(userID) {
      try {
        // 发起 POST 请求获取数据
        const response = await axios.post('/document_flow/display',
      {
        userID: userID// 请求体，包含用户ID
      },
      // 设置请求头
      {
        headers: {
          'Authorization': `Bearer <token>`,
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.data.code === 1 && response.data.data.length > 0) {
      // 获取到有效数据，则更新表格内容
      filteredTableData.value = response.data.data;
    } else {
      // 没有找到记录，则清空数据，弹出提示框
      filteredTableData.value = []; 
      ElMessageBox.alert(
        'No records found with the given ID.',
        'Search Failed',
        {
          confirmButtonText: 'OK',
          type: 'error',
        }
      );
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    ElMessageBox.alert('Failed to fetch data!', 'Error', {
      confirmButtonText: 'OK',
      type: 'error',
    });
  }
}
    //调用fetchData函数——{{点击GO按钮时调用}}
    function applyFilter() {
      fetchData(searchQuery.value); 
    }

    // 导航到指定路径
    function navigateTo(path) {
      router.push(path);
    }

    
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

/* 背景 */
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

/* 头部 */
.header {
  display: flex;
  align-items: center;
  padding: 20px 80px;
  border-bottom: 2px solid black;
}

/* 返回主页图标 */
.House {
  font-size: 25px;
  right: 60px;
}

/* DocumentFlow文字 */
.title {
  flex-grow: 1;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  color: white;
}

/* 输入框 */
.input {
  margin-top: 20px;
  margin-bottom: 20px;
}

/* UserID文字 */
.label {
  font-size: 17px;
}

/* 表格 */
.el-table {
  background-color: #fefefee4;
}
</style>