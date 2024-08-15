<template>
  <el-container class="material">
    <el-header class="header">
      <el-icon class="House" @click="navigateTo('/')">
        <House />
      </el-icon>
      <span class="title">Display Document Flow</span>
    </el-header>

    <div style="margin-left: 5vh; text-align: center">
      <el-row :gutter="8" class="input">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            UserID:
            <input v-model="address1" style="margin-left: 5vh" />
          </div>
        </el-col>

        <!-- GO按钮 -->
        <el-col :span="1">
          <el-button
            type="primary"
            class="button"
            style="
              font-weight: bold;
              height: 2vh;
              width: 10vh;
              display: flex;
              justify-content: center;
              align-items: center;
            "
            @click="console.log('fetch')"
          >
            <span style="margin: auto">GO</span>
          </el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 筛选出的记录 -->
    <div style="margin-left: 10vh">
      <el-table
        :data="filteredTableData"
        height="75vh"
        border
        class="custom-table"
        style="width: 180vh; border-collapse: collapse; margin-top: 5vh"
      >
        <el-table-column
          prop="userID"
          label="userID"
          width="312"
        ></el-table-column>
        <el-table-column
          prop="PurchaseOrderID"
          label="PurchaseOrderID"
          width="510"
        ></el-table-column>
        <el-table-column
          prop="GoodReceiptID"
          label="GoodReceiptID"
          width="510"
        ></el-table-column>
      </el-table>
    </div>
  </el-container>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const address1 = ref("");
    const tableData = ref([]);
    const filteredTableData = ref([]);
    const router = useRouter();

    const fetchData = () => {
      console.log("fetch");
      axios
        .get("/api/document_flow/display_success/finished")
        .then((response) => {
          tableData.value = response.data;
          applyFilter();
        })
        .catch((error) => {
          console.error("Error fetching data", error);
        });
    };

    function navigateTo(path) {
      router.push(path);
    }

    const applyFilter = () => {
      if (address1.value.trim() === "") {
        filteredTableData.value = tableData.value;
      } else {
        filteredTableData.value = tableData.value.filter((item) => {
          return item.userID === address1.value;
        });
      }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      address1,
      filteredTableData,
      navigateTo,
      applyFilter,
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
