<template>
   <el-container class="supplier">
    <!-- Header 区域 -->
    <el-header class="header">
      <el-icon class="Back" @click="navigateTo('/Supplier')">
        <ArrowLeft />
      </el-icon>
      <el-icon class="House" @click="navigateTo('/')">
        <House />
      </el-icon>
      <span class="title">Modify Supplier</span>
    </el-header>

    <!-- 主体内容区域 -->
<br/>
<el-container>
  <el-main class="main-content" v-if="selectedSupplier">
    <el-tabs v-model="activeTab">
      <!-- Common Tab -->
      <el-tab-pane label="Common" name="common">
        <div>
          <p class="text-title">Primary</p>
          <el-divider class="divider"></el-divider>
          <el-row :gutter="20">
            <el-col :span="8">
              <span class="text-label">Supplier ID :</span>
              <el-input v-model="selectedSupplier.supplierID" class="text-value"  disabled/>
            </el-col>
            <el-col :span="8">
              <span class="text-label">Supplier Name :</span>
              <el-input v-model="selectedSupplier.suppliername" class="text-value" />
            </el-col>
            <el-col :span="8">
              <span class="text-label">BP Role :</span>
              <el-input v-model="selectedSupplier.partnerFunctions" class="text-value" />
            </el-col>
          </el-row>
          
          <p class="text-title">Address</p>
          <el-divider class="divider"></el-divider>
          <el-row :gutter="20">
            <el-col :span="8">
              <span class="text-label">Street Address :</span>
              <el-input v-model="selectedSupplier.streetAddress" class="text-value" />
            </el-col>
            <el-col :span="8">
              <span class="text-label">Postal Code :</span>
              <el-input v-model="selectedSupplier.postalCode" class="text-value" />
            </el-col>
            <el-col :span="8">
              <span class="text-label">Country :</span>
              <el-input v-model="selectedSupplier.country" class="text-value" />
            </el-col>
            <el-col :span="8">
              <span class="text-label">Region :</span>
              <el-input v-model="selectedSupplier.region" class="text-value" />
            </el-col>
            <el-col :span="8">
              <span class="text-label">City :</span>
              <el-input v-model="selectedSupplier.city" class="text-value" />
            </el-col>
          </el-row>

          <p class="text-title">Communication</p>
          <el-divider class="divider"></el-divider>
          <el-row :gutter="20">
            <el-col :span="8">
              <span class="text-label">Language :</span>
              <el-input v-model="selectedSupplier.communicationLang" class="text-value" />
            </el-col>
          </el-row>

          <p class="text-title">Name</p>
          <el-divider class="divider"></el-divider>
          <el-row :gutter="20">
            <el-col :span="8">
              <span class="text-label">Contact Info :</span>
              <el-input v-model="selectedSupplier.contactInfo" class="text-value" />
            </el-col>
            <el-col :span="8">
              <span class="text-label">User ID:</span>
              <el-input v-model="selectedSupplier.userID" class="text-value" />
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>

      <!-- Vendor & Account & Payment Tab -->
      <el-tab-pane label="Vendor & Account & Payment" name="vendor">
        <div>
          <p class="text-title">Tax Data</p>
          <el-divider class="divider"></el-divider>
          <el-row :gutter="20">
            <el-col :span="8">
              <span class="text-label1">Tax Number :</span>
              <el-input v-model="selectedSupplier.taxNumber" class="text-value" />
            </el-col>
          </el-row>

          <p class="text-title">Account Management</p>
          <el-divider class="divider"></el-divider>
          <el-row :gutter="20">
            <el-col :span="8">
              <span class="text-label1">Reconciliation Acct :</span>
              <el-input v-model="selectedSupplier.reconciliationAcct" class="text-value" />
            </el-col>
          </el-row>

          <p class="text-title">Payment Data</p>
          <el-divider class="divider"></el-divider>
          <el-row :gutter="20">
            <el-col :span="8">
              <span class="text-label1">Terms of Payments :</span>
              <el-input v-model="selectedSupplier.termsOfPayment" class="text-value" />
            </el-col>
            <el-col :span="8">
              <span class="text-label1">Check Double Invoice :</span>
              <el-input v-model="selectedSupplier.checkDoubleInvoice" class="text-value" />
            </el-col>
          </el-row>

          <p class="text-title">Correspondence</p>
          <el-divider class="divider"></el-divider>
          <el-row :gutter="20">
            <el-col :span="8">
              <span class="text-label">Clerk at Vendor :</span>
              <el-input v-model="selectedSupplier.clerkName" class="text-value" />
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>

      <!-- Purchasing Tab -->
      <el-tab-pane label="Purchasing" name="purchasing">
        <div>
          <p class="text-title">Purchasing Organization</p>
          <el-divider class="divider"></el-divider>
          <el-row :gutter="20">
            <el-col :span="8">
              <span class="text-label1">Purch. Organization :</span>
              <el-input v-model="selectedSupplier.purchasingOrg" class="text-value" />
            </el-col>
          </el-row>

          <p class="text-title">Purchase Data</p>
          <el-divider class="divider"></el-divider>
          <el-row :gutter="20">
            <el-col :span="8">
              <span class="text-label1">Order Currency :</span>
              <el-input v-model="selectedSupplier.orderCurrency" class="text-value" />
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
    <br/>
     <!-- 根据当前激活的标签页，动态显示按钮 -->
     <el-button
          type="primary"
          plain
          @click="activeTab !== 'purchasing' ? nextTab() : handleSave()"
        >
          {{ activeTab !== 'purchasing' ? 'Next Tab' : 'Save' }}
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
    const activeTab = ref('common');
    const selectedSupplier = ref(null);

    const fetchSupplierDetails = async (supplierID) => {
      try {
        const response = await axios.get('/api/supplier/query_success', {
          params: { supplierID }
        });

        if (response.data.code === 1 && response.data.data.length > 0) {
          selectedSupplier.value = response.data.data[0];
        } else {
          ElMessageBox.alert('No supplier found with the given ID.', 'Search Failed', {
            confirmButtonText: 'OK',
            type: 'error',
          });
          selectedSupplier.value = null;
        }
      } catch (error) {
        console.error('Error fetching supplier data:', error);
        ElMessageBox.alert('Failed to fetch supplier data!', 'Error', {
          confirmButtonText: 'OK',
          type: 'error',
        });
      }
    };

    onMounted(() => {
      const supplierID = route.params.id;
      if (supplierID) {
        fetchSupplierDetails(supplierID);
      } else {
        ElMessageBox.alert('No Supplier ID provided.', 'Error', {
          confirmButtonText: 'OK',
          type: 'error',
        });
      }
    });

    const navigateTo = (path) => {
      router.push(path);
    };

    const handleSave = async () => {
      if (!selectedSupplier.value) {
        ElMessageBox.alert('No supplier data to save.', 'Error', {
          confirmButtonText: 'OK',
          type: 'error',
        });
        return;
      }

      try {
        const response = await axios.patch('/api/supplier/update_success', selectedSupplier.value);

        if (response.data.code === 1) {
          ElMessageBox.alert('Supplier information saved successfully!', 'Success', {
            confirmButtonText: 'OK',
            type: 'success',
          });
        } else {
          ElMessageBox.alert('Failed to save supplier information.', 'Error', {
            confirmButtonText: 'OK',
            type: 'error',
          });
        }
      } catch (error) {
        console.error('Error saving supplier data:', error);
        ElMessageBox.alert('Failed to save supplier data!', 'Error', {
          confirmButtonText: 'OK',
          type: 'error',
        });
      }
    };

    // Define nextTab method
    const nextTab = () => {
      if (activeTab.value === 'common') {
        activeTab.value = 'vendor';
      } else if (activeTab.value === 'vendor') {
        activeTab.value = 'purchasing';
      }
    };

    return {
      activeTab,
      selectedSupplier,
      navigateTo,
      handleSave,
      nextTab
    };
  }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

.supplier {
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

.text-label1{
  font-size: 14px;
  margin-bottom: 5px;
  display: inline-block;
  width: 160px;
  font-family: 'Inter', sans;
  color: #498be6;
}
.text-label{
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