<template>
  <el-container class="supplier">
    <!-- Header 区域 -->
    <el-header class="header">
      <!-- 返回首页的图标 -->
      <el-icon class="House" @click="navigateTo('/')">
        <House />
      </el-icon>
      <span class="title">Create New Supplier</span>
    </el-header>

    <!-- Header 下方的一排内容 -->
    <el-row class="top">
      <!-- 新建按钮 -->
      <el-col :span="7">
        <el-button
          type="text"
          @click="navigateTo('/NewSupplier')"
          class="create-new"
        >
          Create new
        </el-button>
      </el-col>

      <!-- 中间内容：业务伙伴标签 -->
      <el-col :span="3">
        <span class="label">Business Partner :</span>
      </el-col>

      <!-- 输入供应商 ID 的输入框 -->
      <el-col :span="4">
        <el-input
          v-model="searchQuery"
          placeholder="Enter Supplier ID..."
          class="input-field"
        ></el-input>
      </el-col>

      <!-- 搜索按钮 -->
      <el-col :span="1">
        <el-button
          slot="append"
          icon="Search"
          @click="searchSupplier"
        ></el-button>
      </el-col>

      <!-- 修改按钮 -->
      <el-col :span="4">
        <el-button type="primary" @click="handleModifyClick" plain>
          Modify
        </el-button>
      </el-col>
    </el-row>

    <!-- 主体内容区域，包含侧边栏和主要内容 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="300px" class="sidebar">
        <div class="find-text">Find</div>
        <div class="sidebar-content">
          <div class="filter-header">Find Supplier By :</div>
          <!-- 过滤条件表单 -->
          <el-row>
            <el-col :span="24">
              <el-form label-position="left" label-width="118px">
                <el-form-item label="Supplier Name :">
                  <el-input
                    v-model="filters.keyword1"
                    placeholder="Enter keyword..."
                  ></el-input>
                </el-form-item>
                <el-form-item label="Country :">
                  <el-input
                    v-model="filters.keyword2"
                    placeholder="Enter keyword..."
                  ></el-input>
                </el-form-item>
                <el-form-item label="Contact Info :">
                  <el-input
                    v-model="filters.keyword3"
                    placeholder="Enter keyword..."
                  ></el-input>
                </el-form-item>
                <el-form-item label="User ID :">
                  <el-input
                    v-model="filters.keyword4"
                    placeholder="Enter keyword..."
                  ></el-input>
                </el-form-item>
                <!-- 过滤按钮 -->
                <el-button
                  type="primary"
                  plain
                  @click="filterResults"
                  style="margin-left: 200px"
                  >Filter</el-button
                >
              </el-form>
            </el-col>
          </el-row>
          <br />
          <div class="result-text">Results:</div>
          <!-- 供应商数据表格 -->
          <el-table
            :data="tableData"
            @row-dblclick="viewDetails"
            highlight-current-row
            @current-change="handleCurrentChange"
          >
            <el-table-column
              prop="supplierID"
              label="Supplier ID"
            ></el-table-column>
            <el-table-column
              prop="supplierName"
              label="supplierName"
            ></el-table-column>
            <el-table-column prop="userID" label="User ID"></el-table-column>
          </el-table>
        </div>
      </el-aside>

      <!-- 主内容区域 -->
      <el-main class="main-content" v-if="selectedSupplier">
        <el-tabs v-model="activeTab">
          <!-- 通用信息标签页 -->
          <el-tab-pane label="Common" name="common">
            <div>
              <p class="text-title">Primary</p>
              <el-divider class="divider"></el-divider>
              <span class="text-label">Supplier ID :</span>
              <span class="text-value">{{
                selectedSupplier.supplierID || "000000"
              }}</span>
              <span class="text-label">Supplier Name :</span>
              <span class="text-value">{{
                selectedSupplier.supplierName || "000000"
              }}</span>
              <span class="text-label">BP Role :</span>
              <span class="text-value">{{
                selectedSupplier.partnerFunctions || "000000"
              }}</span>
              <p class="text-title">Address</p>
              <el-divider class="divider"></el-divider>
              <span class="text-label">Street Address :</span>
              <span class="text-value">{{
                selectedSupplier.streetAddress || "000000"
              }}</span>
              <span class="text-label">Postal Code :</span>
              <span class="text-value">{{
                selectedSupplier.postalCode || "000000"
              }}</span>
              <p>
                <span class="text-label">Country :</span>
                <span class="text-value">{{
                  selectedSupplier.country || "000000"
                }}</span>
                <span class="text-label">Region :</span>
                <span class="text-value">{{
                  selectedSupplier.region || "000000"
                }}</span>
                <span class="text-label">City :</span>
                <span class="text-value">{{
                  selectedSupplier.city || "000000"
                }}</span>
              </p>
              <p class="text-title">Communication</p>
              <el-divider class="divider"></el-divider>
              <span class="text-label">Language :</span>
              <span class="text-value">{{
                selectedSupplier.communicationLang || "000000"
              }}</span>
              <p class="text-title">Contact :</p>
              <el-divider class="divider"></el-divider>
              <span class="text-label">Contact Info :</span>
              <span class="text-value">{{
                selectedSupplier.contactInfo || "000000"
              }}</span>
              <span class="text-label">User ID:</span>
              <span class="text-value">{{
                selectedSupplier.userID || "000000"
              }}</span>
            </div>
          </el-tab-pane>

          <!-- 供应商 & 账户 & 支付标签页 -->
          <el-tab-pane label="Vendor & Account & Payment" name="vendor">
            <div>
              <p class="text-title">Tax Data</p>
              <el-divider class="divider"></el-divider>
              <span class="text-label1">Tax Number :</span>
              <span class="text-value">{{
                selectedSupplier.taxNumber || "000000"
              }}</span>
              <p class="text-title">Account Management</p>
              <el-divider class="divider"></el-divider>
              <span class="text-label1">Reconciliation Acct :</span>
              <span class="text-value">{{
                selectedSupplier.reconciliationAcct || "000000"
              }}</span>
              <p class="text-title">Payment Data</p>
              <el-divider class="divider"></el-divider>
              <span class="text-label1">Terms of Payments :</span>
              <span class="text-value">{{
                selectedSupplier.termsOfPayment || "000000"
              }}</span>
              <span class="text-label1">Check Double Invoice :</span>
              <span class="text-value">{{
                selectedSupplier.checkDoubleInvoice || "000000"
              }}</span>
              <p class="text-title">Correspondence</p>
              <el-divider class="divider"></el-divider>
              <span class="text-label1">Clerk at Vendor :</span>
              <span class="text-value">{{
                selectedSupplier.clerkName || "000000"
              }}</span>
            </div>
          </el-tab-pane>

          <!-- 采购标签页 -->
          <el-tab-pane label="Purchasing" name="purchasing">
            <div>
              <p class="text-title">Purchasing Organization</p>
              <el-divider class="divider"></el-divider>
              <span class="text-label1">Purch. Organization :</span>
              <span class="text-value">{{
                selectedSupplier.purchasingOrg || "000000"
              }}</span>
              <p class="text-title">Purchase Data</p>
              <el-divider class="divider"></el-divider>
              <span class="text-label1">Order Currency :</span>
              <span class="text-value">{{
                selectedSupplier.orderCurrency || "000000"
              }}</span>
            </div>
          </el-tab-pane>
        </el-tabs>
        <br />
        <!-- 切换标签页按钮 -->
        <el-button type="primary" plain @click="switchTab">
          Switch Tab
        </el-button>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "vue";
import axios from "axios";
import { ElMessageBox } from "element-plus";

export default {
  setup() {
    // 使用 Vue Router 的导航功能
    const router = useRouter();
    // 过滤条件的响应式对象
    const filters = ref({
      keyword1: "",
      keyword2: "",
      keyword3: "",
      keyword4: "",
    });

    // 表格数据和选中的供应商的响应式对象
    const tableData = ref([]);
    const selectedSupplier = ref(null);
    // 当前激活的标签页
    const activeTab = ref("common");
    // 搜索查询内容的响应式对象
    const searchQuery = ref("");

    // 导航到指定路径
    function navigateTo(path) {
      router.push(path);
    }

    // 搜索供应商
    async function searchSupplier() {
      try {
        if (!searchQuery.value) {
          ElMessageBox.alert(
            "Please enter a Supplier ID before searching.",
            "No Input",
            {
              confirmButtonText: "OK",
              type: "warning",
            }
          );
          return;
        }

        const response = await axios.post("/api/supplier/query", {
          supplierID: searchQuery.value,
        });

        if (response.data.code === 200 && response.data.data.length > 0) {
          selectedSupplier.value = response.data.data[0];
        } else {
          ElMessageBox.alert(
            "No supplier found with the given ID.",
            "Search Failed",
            {
              confirmButtonText: "OK",
              type: "error",
            }
          );
          selectedSupplier.value = null;
        }
      } catch (error) {
        console.error("Error fetching supplier data:", error);
        ElMessageBox.alert("Failed to fetch supplier data!", "Error", {
          confirmButtonText: "OK",
          type: "error",
        });
      }
    }

    // 过滤结果
    async function filterResults() {
      try {
        if (
          !filters.value.keyword1 &&
          !filters.value.keyword2 &&
          !filters.value.keyword3 &&
          !filters.value.keyword4
        ) {
          ElMessageBox.alert(
            "Please enter at least one filter criterion.",
            "No Filters",
            {
              confirmButtonText: "OK",
              type: "warning",
            }
          );
          return;
        }

        const response = await axios.post("/api/supplier/query", {
          supplierName: filters.value.keyword1,
          country: filters.value.keyword2,
          contactInfo: filters.value.keyword3,
          userID: filters.value.keyword4,
        });
        console.log(response.data);

        if (response.data.code === 200 && response.data.data.length > 0) {
          tableData.value = response.data.data;
        } else {
          ElMessageBox.alert(
            "No results found with the given filters.",
            "Filter Results",
            {
              confirmButtonText: "OK",
              type: "warning",
            }
          );
          tableData.value = [];
        }
      } catch (error) {
        console.error("Error filtering results:", error);
        ElMessageBox.alert("Failed to fetch results!", "Error", {
          confirmButtonText: "OK",
          type: "error",
        });
      }
    }

    // 处理修改按钮点击事件
    const handleModifyClick = async () => {
      if (selectedSupplier.value) {
        const supplierID = selectedSupplier.value.supplierID;
        router.push({ name: "ModifySupplier", params: { id: supplierID } });
      } else {
        ElMessageBox.alert(
          "Please select a supplier to modify.",
          "No Supplier Selected",
          {
            confirmButtonText: "OK",
            type: "warning",
          }
        );
      }
    };

    // 查看供应商详细信息
    function viewDetails(row) {
      selectedSupplier.value = row;
    }

    // 处理当前行的改变事件
    function handleCurrentChange(row) {
      selectedSupplier.value = row;
    }

    // 切换标签页
    function switchTab() {
      activeTab.value = activeTab.value === "common" ? "vendor" : "common";
    }

    return {
      filters,
      tableData,
      handleModifyClick,
      selectedSupplier,
      activeTab,
      searchQuery,
      navigateTo,
      searchSupplier,
      filterResults,
      viewDetails,
      handleCurrentChange,
      switchTab,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");
.supplier {
  background: linear-gradient(
    to bottom,
    rgba(127, 167, 226, 1),
    rgba(197, 217, 247, 1),
    rgba(255, 255, 255, 1)
  );
  height: 100vh;
  margin: 0;
  padding: 0 80px; /* 设置页面两侧的内边距 */
  box-sizing: border-box; /* 包括内边距和边框在内 */
}

.header {
  display: flex;
  align-items: center;
  padding: 20px 80px; /* 设置 header 的内边距 */
  border-bottom: 2px solid black; /* 修改为黑色边框 */
}

.title {
  flex-grow: 1;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  color: white; /* 修改为白色 */
}

.House {
  font-size: 25px;
  right: 60px;
}

.sidebar {
  background-color: #f5f4f4;
  padding: 20px;
  margin-bottom: 40px;
  overflow-y: auto;
}

.find-text {
  color: #498be6;
  font-weight: bold;
  margin-bottom: 10px;
}

.sidebar-content {
  margin-top: 20px;
}

.filter-header {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
}

.result-text {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
}

.main-content {
  padding: 20px;
  background-color: #fff;
  margin-bottom: 40px;
  overflow-y: auto;
}

.toolbar {
  margin-top: 20px;
  margin-bottom: 20px;
}

.create-new {
  font-size: 15px;
  color: white;
  text-decoration: underline;
  right: 60px;
}

.top {
  margin-top: 20px;
  margin-bottom: 20px;
}

.label {
  font-size: 17px;
}

.text-title {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
}

.text-label {
  font-size: 14px;
  margin-bottom: 5px;
  display: inline-block;
  width: 120px; /* 设置标签的固定宽度 */
  font-family: "Inter", sans;
  color: #498be6;
}

.text-label1 {
  font-size: 14px;
  margin-bottom: 5px;
  display: inline-block;
  width: 160px; /* 设置标签的固定宽度 */
  font-family: "Inter", sans;
  color: #498be6;
}

.text-value {
  font-size: 14px;
  margin-bottom: 20px;
  display: inline-block;
  width: 190px; /* 设置固定宽度 */
  font-family: "Inter", sans;
}
.divider {
  margin-top: 15px; /* 设置分割线的上边距 */
  margin-bottom: 15px; /* 设置分割线的下边距 */
}
</style>
