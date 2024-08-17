<template>
  <div>
    <div>
      <span>materialID:</span>
      <span id="ID">00000023</span>
    </div>
    <div>
      <!-- 打开嵌套表单的 Dialog -->
      <el-button type="text" @click="openDialog">打开Stock</el-button>
      <el-dialog title="Storage Information" v-model="dialogFormVisible">
        <el-row :gutter="20">
          <el-col :span="10">
            <div>
              materialID:
              <span>{{ materialID }}</span>
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
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from "vue";
import Chart from "chart.js/auto";

export default {
  setup() {
    const materialID = ref("00000023");
    const dialogFormVisible = ref(false);
    const gridData = ref([
      {
        stockID: "001",
        plant: "Plant A",
        storageLocation: "Location 1",
        quantity: 100,
        unitOfMeasure: "pcs",
        stockType: "Type A",
        valuationType: "Type X",
        batch: "Batch 2023",
        specialStockIndicator: "Yes",
        userID: "user1",
      },
      {
        stockID: "002",
        plant: "Plant B",
        storageLocation: "Location 2",
        quantity: 50,
        unitOfMeasure: "kg",
        stockType: "Type B",
        valuationType: "Type Y",
        batch: "Batch 2024",
        specialStockIndicator: "No",
        userID: "user2",
      },
      {
        stockID: "003",
        plant: "Plant A",
        storageLocation: "Location 3",
        quantity: 75,
        unitOfMeasure: "pcs",
        stockType: "Type C",
        valuationType: "Type Z",
        batch: "Batch 2023",
        specialStockIndicator: "Yes",
        userID: "user3",
      },
    ]);
    let chart = ref(null);

    const openDialog = () => {
      dialogFormVisible.value = true;
      nextTick(() => {
        initChart();
      });
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
        cumulativeSum += item.quantity;
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

    return {
      materialID,
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

.top {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
