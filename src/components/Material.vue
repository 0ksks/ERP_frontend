<template>
  <el-container class="material">
    <!-- Header 区域 -->
    <el-header class="header">
      <el-icon class="House" @click="navigateTo('/')">
        <House />
      </el-icon>
      <span class="title">Create Material Masters for Trading Goods</span>
    </el-header>

    <!-- Header 下方的一排内容 -->
    <el-row class="top">
      <!-- Create new button -->
      <el-col :span="7">
        <el-button
          type="text"
          @click="navigateTo('/NewMaterial')"
          class="create-new"
        >
          Create new
        </el-button>
      </el-col>

      <!-- Centered content -->
      <el-col :span="2">
        <span class="label">Materail :</span>
      </el-col>

      <el-col :span="4">
        <el-input
          v-model="searchQuery"
          placeholder="Enter Material ID..."
          class="input-field"
        ></el-input>
      </el-col>
      <el-col :span="1">
        <el-button
          slot="append"
          icon="Search"
          @click="searchMaterial"
        ></el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="handleModifyClick" plain>
          Modify
        </el-button>
      </el-col>
    </el-row>

    <!-- 主体内容区域，包含侧边栏和主要内容 -->
    <el-container>
      <el-aside width="300px" class="sidebar">
        <div class="find-text">Find</div>
        <div class="sidebar-content">
          <div class="filter-header">Find Material By :</div>
          <el-row>
            <el-col :span="24">
              <el-form label-position="left" label-width="118px">
                <el-form-item label="Material Name :">
                  <el-input
                    v-model="filters.keyword1"
                    placeholder="Enter keyword..."
                  ></el-input>
                </el-form-item>
                <el-form-item label="Description :">
                  <el-input
                    v-model="filters.keyword2"
                    placeholder="Enter keyword..."
                  ></el-input>
                </el-form-item>
                <el-form-item label="Material Group :">
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
          <el-table
            :data="tableData"
            @row-dblclick="viewDetails"
            highlight-current-row
            @current-change="handleCurrentChange"
          >
            <el-table-column
              prop="materialID"
              label="Material ID"
            ></el-table-column>
            <el-table-column
              prop="materialName"
              label="Material Name"
            ></el-table-column>
            <el-table-column prop="userID" label="User ID"></el-table-column>
          </el-table>
        </div>
      </el-aside>

      <!-- 主内容 -->
      <el-main class="main-content" v-if="selectedMaterial">
        <div>
          <div>
            <el-button type="text" @click="openDialog" class="stock">
              Detail Stock Information
            </el-button>
            <el-dialog title="Storage Information" v-model="dialogFormVisible">
              <el-row :gutter="20">
                <el-col :span="10">
                  <div>
                    materialID:
                    <span>{{ selectedMaterial.materialID }}</span>
                  </div>
                </el-col>
                <el-table :data="gridData" style="margin-top: 5vh">
                  <el-table-column
                    property="stockID"
                    label="stockID"
                    width="100"
                  ></el-table-column>
                  <el-table-column
                    property="plant"
                    label="plant"
                    width="100"
                  ></el-table-column>
                  <el-table-column
                    property="storageLocation"
                    label="storageLocation"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    property="quantity"
                    label="quantity"
                    width="100"
                  ></el-table-column>
                  <el-table-column
                    property="unitOfMeasure"
                    label="unitOfMeasure"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    property="stockType"
                    label="stockType"
                    width="100"
                  ></el-table-column>
                  <el-table-column
                    property="valuationType"
                    label="valuationType"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    property="batch"
                    label="batch"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    property="specialStockIndicator"
                    label="specialStockIndicator"
                    width="200"
                  ></el-table-column>
                  <el-table-column
                    property="userID"
                    label="userID"
                    width="100"
                  ></el-table-column>
                </el-table>
              </el-row>
              <div>
                <canvas id="stockChartCanvas" width="400" height="200"></canvas>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogFormVisible = false"
                  >OK</el-button
                >
              </div>
            </el-dialog>
          </div>
          <p class="text-title">General</p>
          <el-divider class="divider"></el-divider>
          <span class="text-label">Material ID :</span>
          <span class="text-value">{{
            selectedMaterial.materialID || "000000"
          }}</span>
          <span class="text-label">Material Name :</span>
          <span class="text-value">{{
            selectedMaterial.materialName || "000000"
          }}</span>
          <span class="text-label">Description :</span>
          <span class="text-value">{{
            selectedMaterial.description || "000000"
          }}</span>
          <p>
            <span class="text-label">Base Unit :</span>
            <span class="text-value">{{
              selectedMaterial.baseUnit || "000000"
            }}</span>
            <span class="text-label">Material Group :</span>
            <span class="text-value">{{
              selectedMaterial.materialGroup || "000000"
            }}</span>
            <span class="text-label">Division :</span>
            <span class="text-value">{{
              selectedMaterial.division || "000000"
            }}</span>
          </p>
          <p class="text-title">Dimensions</p>
          <el-divider class="divider"></el-divider>
          <span class="text-label">Gross Weight :</span>
          <span class="text-value">{{
            selectedMaterial.grossWeight || "000000"
          }}</span>
          <span class="text-label">Net Weight :</span>
          <span class="text-value">{{
            selectedMaterial.netWeight || "000000"
          }}</span>
          <span class="text-label">Weight Unit :</span>
          <span class="text-value">{{
            selectedMaterial.weightUnit || "000000"
          }}</span>
          <p>
            <span class="text-label">Volume :</span>
            <span class="text-value">{{
              selectedMaterial.volume || "000000"
            }}</span>
            <span class="text-label">Volume Unit :</span>
            <span class="text-value">{{
              selectedMaterial.volumeUnit || "000000"
            }}</span>
          </p>

          <p class="text-title">Shipping Data(times in days)</p>
          <el-divider class="divider"></el-divider>
          <span class="text-label">Trans.Grp :</span>
          <span class="text-value">{{
            selectedMaterial.transportationGroup || "000000"
          }}</span>
          <span class="text-label">Pack Material :</span>
          <span class="text-value">{{
            selectedMaterial.packMaterial || "000000"
          }}</span>
          <span class="text-label">Avail.Check :</span>
          <span class="text-value">{{
            selectedMaterial.availabilityCheck || "000000"
          }}</span>
          <p>
            <span class="text-label">Loading Group :</span>
            <span class="text-value">{{
              selectedMaterial.loadingGroup || "000000"
            }}</span>
          </p>

          <p class="text-title">MRP Procedure</p>
          <el-divider class="divider"></el-divider>
          <span class="text-label">MRP Type :</span>
          <span class="text-value">{{
            selectedMaterial.mrpType || "000000"
          }}</span>
          <span class="text-label">MRP Controller:</span>
          <span class="text-value">{{
            selectedMaterial.mrpController || "000000"
          }}</span>

          <p class="text-title">Lot Size Data</p>
          <el-divider class="divider"></el-divider>
          <span class="text-label">Lot Sizing Proc :</span>
          <span class="text-value">{{
            selectedMaterial.lotSize || "000000"
          }}</span>

          <p class="text-title">Scheduling</p>
          <el-divider class="divider"></el-divider>
          <span class="text-label">Plan.Delv.Tome :</span>
          <span class="text-value">{{
            selectedMaterial.planningDeliveryTime || "000000"
          }}</span>

          <p class="text-title">Accounting</p>
          <el-divider class="divider"></el-divider>
          <span class="text-label">Valuation Class :</span>
          <span class="text-value">{{
            selectedMaterial.valuationClass || "000000"
          }}</span>
          <span class="text-label">Moving Price:</span>
          <span class="text-value">{{
            selectedMaterial.movingPrice || "000000"
          }}</span>
          <span class="text-label">Price Unit:</span>
          <span class="text-value">{{
            selectedMaterial.priceUnit || "000000"
          }}</span>
          <p>
            <span class="text-label">Standard Price:</span>
            <span class="text-value">{{
              selectedMaterial.standardPrice || "000000"
            }}</span>
          </p>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { useRouter } from "vue-router";
import { ref, onMounted, nextTick } from "vue";
import Chart from "chart.js/auto";
import axios from "axios";
import { ElMessageBox } from "element-plus";

export default {
  setup() {
    const router = useRouter();
    const filters = ref({
      keyword1: "",
      keyword2: "",
      keyword3: "",
      keyword4: "",
    });

    const tableData = ref([]);
    const selectedMaterial = ref(null);
    const searchQuery = ref("");

    const dialogFormVisible = ref(false);
    const gridData = ref([]);

    async function fetchData(materialID) {
      try {
        const response = await axios.get(
          "/api/stock/display_success/finished",
          {
            params: { materialID },
          }
        );
        if (response.data.code === 1 && response.data.data.length > 0) {
          gridData.value = response.data.data;
          nextTick(() => {
            initChart();
          });
        } else {
          gridData.value = []; // Clear data if no results
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

    let chart = ref(null);

    const openDialog = () => {
      dialogFormVisible.value = true;
      if (selectedMaterial.value && selectedMaterial.value.materialID) {
        fetchData(selectedMaterial.value.materialID);
      }
    };

    const initChart = () => {
      const canvas = document.getElementById("stockChartCanvas");
      if (!canvas) {
        console.error("Canvas element not found.");
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Failed to get Canvas 2D context.");
        return;
      }

      const data = gridData.value;

      let cumulativeSum = 0;
      const cumulativeData = data.map((item) => {
        // 确保 item.quantity 转换为数字
        const quantity = Number(item.quantity); // 或者使用 +item.quantity
        cumulativeSum += quantity;
        console.log("cumulativeSum:", cumulativeSum); // 输出累计和
        return cumulativeSum;
      });

      const stockIDs = data.map((item) => item.stockID);

      if (chart.value) {
        chart.value.destroy();
      }

      chart.value = new Chart(ctx, {
        type: "bar",
        data: {
          labels: stockIDs,
          datasets: [
            {
              label: "Quantity",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
              data: data.map((item) => item.quantity),
            },
            {
              label: "Cumulative Quantity",
              type: "line",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
              data: cumulativeData,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Quantity",
              },
            },
            x: {
              title: {
                display: true,
                text: "Stock ID",
              },
            },
          },
        },
      });
    };
    onMounted(() => {
      initChart();
    });

    function navigateTo(path) {
      router.push(path);
    }

    async function searchMaterial() {
      try {
        // 检查是否输入了搜索关键词
        if (!searchQuery.value) {
          ElMessageBox.alert(
            "Please enter a Material ID before searching.",
            "No Input",
            {
              confirmButtonText: "OK",
              type: "warning",
            }
          );
          return;
        }

        // 发送请求获取指定 Material ID 的详细信息
        const response = await axios.get("/api/material/query_success", {
          params: {
            materialID: searchQuery.value,
          },
        });

        if (response.data.code === 1 && response.data.data.length > 0) {
          selectedMaterial.value = response.data.data[0]; // 假设返回的 data 是数组，取第一个元素
        } else {
          ElMessageBox.alert(
            "No material found with the given ID.",
            "Search Failed",
            {
              confirmButtonText: "OK",
              type: "error",
            }
          );
          selectedMaterial.value = null;
        }
      } catch (error) {
        console.error("Error fetching material data:", error);
        ElMessageBox.alert("Failed to fetch material data!", "Error", {
          confirmButtonText: "OK",
          type: "error",
        });
      }
    }

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

        // 发送请求获取过滤后的结果
        const response = await axios.get("/api/material/query_success", {
          params: {
            materialName: filters.value.keyword1,
            description: filters.value.keyword2,
            materialGroup: filters.value.keyword3,
            userID: filters.value.keyword4,
          },
        });

        if (response.data.code === 1 && response.data.data.length > 0) {
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

    const handleModifyClick = async () => {
      if (selectedMaterial.value) {
        const materialID = selectedMaterial.value.materialID;
        router.push({ name: "ModifyMaterial", params: { id: materialID } });
      } else {
        ElMessageBox.alert(
          "Please select a material to modify.",
          "No Material Selected",
          {
            confirmButtonText: "OK",
            type: "warning",
          }
        );
      }
    };

    function viewDetails(row) {
      selectedMaterial.value = row;
    }

    function handleCurrentChange(row) {
      selectedMaterial.value = row;
    }

    return {
      filters,
      tableData,
      handleModifyClick,
      selectedMaterial,
      searchQuery,
      navigateTo,
      searchMaterial,
      filterResults,
      viewDetails,
      handleCurrentChange,

      dialogFormVisible,
      gridData,
      openDialog,
      initChart,
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

.stock {
  font-size: 15px;
  color: #498be6;
  text-decoration: underline;
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
  color: #969fab;
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
  display: inline-block;
  width: 190px; /* 设置固定宽度 */
  font-family: "Inter", sans;
}
.divider {
  margin-top: 15px; /* 设置分割线的上边距 */
  margin-bottom: 15px; /* 设置分割线的下边距 */
}
</style>
