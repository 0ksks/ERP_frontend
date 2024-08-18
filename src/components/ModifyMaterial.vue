<template>
  <el-container class="material">
    <!-- Header 区域 -->
    <el-header class="header">
      <el-icon class="Back" @click="navigateTo('/Material')">
        <ArrowLeft />
      </el-icon>
      <el-icon class="House" @click="navigateTo('/')">
        <House />
      </el-icon>
      <span class="title">Modify Material Masters</span>
    </el-header>

    <!-- Header 下方的一排内容 -->
    <br />

    <!-- 主体内容区域 -->
    <el-container>
      <!-- 主内容 -->
      <el-main class="main-content" v-if="selectedMaterial">
        <div>
          <p class="text-title">General</p>
          <el-divider class="divider"></el-divider>
          <el-form :model="selectedMaterial" label-width="150px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="Material ID:">
                  <el-input
                    v-model="selectedMaterial.materialID"
                    class="text-value"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Material Name:">
                  <el-input
                    v-model="selectedMaterial.materialName"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Description:">
                  <el-input
                    v-model="selectedMaterial.description"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Base Unit:">
                  <el-input
                    v-model="selectedMaterial.baseUnit"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Material Group:">
                  <el-input
                    v-model="selectedMaterial.materialGroup"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Division:">
                  <el-input
                    v-model="selectedMaterial.division"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <p class="text-title">Dimensions</p>
            <el-divider class="divider"></el-divider>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="Gross Weight:">
                  <el-input
                    v-model="selectedMaterial.grossWeight"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Net Weight:">
                  <el-input
                    v-model="selectedMaterial.netWeight"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Weight Unit:">
                  <el-input
                    v-model="selectedMaterial.weightUnit"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Volume:">
                  <el-input
                    v-model="selectedMaterial.volume"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Volume Unit:">
                  <el-input
                    v-model="selectedMaterial.volumeUnit"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <p class="text-title">Shipping Data(times in days)</p>
            <el-divider class="divider"></el-divider>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="Trans.Grp:">
                  <el-input
                    v-model="selectedMaterial.transportationGroup"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Pack Material:">
                  <el-input
                    v-model="selectedMaterial.packMaterial"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Avail.Check:">
                  <el-input
                    v-model="selectedMaterial.availabilityCheck"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Loading Group:">
                  <el-input
                    v-model="selectedMaterial.loadingGroup"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <p class="text-title">MRP Procedure</p>
            <el-divider class="divider"></el-divider>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="MRP Type:">
                  <el-input
                    v-model="selectedMaterial.mrpType"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="MRP Controller:">
                  <el-input
                    v-model="selectedMaterial.mrpController"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <p class="text-title">Lot Size Data</p>
            <el-divider class="divider"></el-divider>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="Lot Sizing Proc:">
                  <el-input
                    v-model="selectedMaterial.lotSize"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <p class="text-title">Scheduling</p>
            <el-divider class="divider"></el-divider>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="Plan.Deliv.Time:">
                  <el-input
                    v-model="selectedMaterial.plannedDeliveryTime"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <p class="text-title">Lot Size Data</p>
            <el-divider class="divider"></el-divider>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="Valuation Class:">
                  <el-input
                    v-model="selectedMaterial.valuationClass"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Moving Price:">
                  <el-input
                    v-model="selectedMaterial.movingPrice"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Price Unit:">
                  <el-input
                    v-model="selectedMaterial.priceUnit"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="Standard Price:">
                  <el-input
                    v-model="selectedMaterial.standardPrice"
                    class="text-value"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <br />

        <el-button type="primary" plain @click="saveMaterial()">
          Save
        </el-button>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { ElMessageBox } from 'element-plus';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const selectedMaterial = ref(null);

    const fetchMaterialDetails = async materialID => {
      try {
        const response = await axios.post('/api/material/query', 
          { materialID }, 
          { 
            headers: {
              Authorization: `Bearer ${token_value}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.code === 200 && response.data.data.length > 0) {
          selectedMaterial.value = response.data.data[0];
        } else {
          ElMessageBox.alert(
            'No material found with the given ID.',
            'Search Failed',
            {
              confirmButtonText: 'OK',
              type: 'error',
            }
          );
          selectedMaterial.value = null;
        }
      } catch (error) {
        console.error('Error fetching material data:', error);
        ElMessageBox.alert('Failed to fetch material data!', 'Error', {
          confirmButtonText: 'OK',
          type: 'error',
        });
      }
    };

    onMounted(() => {
      const materialID = route.params.id;
      if (materialID) {
        fetchMaterialDetails(materialID);
      } else {
        ElMessageBox.alert('No Material ID provided.', 'Error', {
          confirmButtonText: 'OK',
          type: 'error',
        });
      }
    });

    const navigateTo = path => {
      router.push(path);
    };

    const saveMaterial = async () => {
      if (!selectedMaterial.value) {
        ElMessageBox.alert('No material data to save.', 'Error', {
          confirmButtonText: 'OK',
          type: 'error',
        });
        return;
      }

      try {
        const response = await axios.post('/api/material/save',
          selectedMaterial.value,
          {
            headers: {
              Authorization: `Bearer ${token_value}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.code === 200) {
          ElMessageBox.alert(
            'Material information saved successfully!',
            'Success',
            {
              confirmButtonText: 'OK',
              type: 'success',
            }
          );
        } else {
          ElMessageBox.alert('Failed to save material information.', 'Error', {
            confirmButtonText: 'OK',
            type: 'error',
          });
        }
      } catch (error) {
        console.error('Error saving material data:', error);
        ElMessageBox.alert('Failed to save material data!', 'Error', {
          confirmButtonText: 'OK',
          type: 'error',
        });
      }
    };

    return {
      selectedMaterial,
      navigateTo,
      saveMaterial,
    };
  },
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

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

.title {
  flex-grow: 1;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  color: white;
}

.House {
  font-size: 25px;
  right: 50px;
}

.Back {
  font-size: 25px;
  right: 60px;
}

.main-content {
  padding: 20px;
  background-color: #fff;
  margin-bottom: 40px;
  overflow-y: auto;
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
  width: 120px;
  font-family: 'Inter', sans;
  color: #498be6;
}

.text-value {
  font-size: 14px;
  margin-bottom: 20px;
  display: inline-block;
  width: 190px;
  font-family: 'Inter', sans;
}

.divider {
  margin-top: 15px;
  margin-bottom: 15px;
}

.label {
  font-size: 14px;
  display: inline-block;
  font-family: 'Inter', sans;
}

.value {
  display: inline-block;
  width: 150px; /* 设置标签的固定宽度 */
  font-family: 'Inter', sans;
}

.top {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
}
</style>
