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
      <span class="title">Create New Supplier</span>
    </el-header>

    <!-- Header 下方的一排内容 -->
    <br />
    <el-row class="top">
      <el-col :span="1"></el-col>
      <el-col :span="3">
        <span class="label">Business Partner:</span>
      </el-col>
      <el-col :span="5">
        <el-input v-model="form.supplierIDr" class="value" disabled></el-input>
      </el-col>
      <el-col :span="3">
        <span class="label">Create in BP Role:</span>
      </el-col>
      <el-col :span="5">
        <el-input v-model="form.partnerFunctions" class="value"></el-input>
      </el-col>
      <el-col :span="3">
        <span class="label">Company Code:</span>
      </el-col>
      <el-col :span="4">
        <el-input v-model="form.companyCode" class="value"></el-input>
      </el-col>
    </el-row>

    <!-- 主体内容区域 -->
    <el-container>
      <!-- 主内容 -->
      <el-main class="main-content">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="Common" name="common">
            <div>
              <p class="text-title">Name</p>
              <el-divider class="divider"></el-divider>
              <el-form :model="selectedSupplier" label-width="150px">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="Supplier Name:">
                      <el-input
                        v-model="selectedSupplier.suppliername"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <p class="text-title">Address</p>
                <el-divider class="divider"></el-divider>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="Street Address:">
                      <el-input
                        v-model="selectedSupplier.streetAddress"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="Postal Code:">
                      <el-input
                        v-model="selectedSupplier.postalCode"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="Country:">
                      <el-input
                        v-model="selectedSupplier.country"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="Region:">
                      <el-input
                        v-model="selectedSupplier.region"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="City:">
                      <el-input
                        v-model="selectedSupplier.city"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <p class="text-title">Communication</p>
                <el-divider class="divider"></el-divider>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="Language:">
                      <el-input
                        v-model="selectedSupplier.communicationLang"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <p class="text-title">Name</p>
                <el-divider class="divider"></el-divider>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="Contact Info:">
                      <el-input
                        v-model="selectedSupplier.contactInfo"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="User ID:">
                      <el-input
                        v-model="selectedSupplier.userID"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-tab-pane>

          <el-tab-pane label="Vendor & Account & Payment" name="vendor">
            <div>
              <p class="text-title">Tax Data</p>
              <el-divider class="divider"></el-divider>
              <el-form :model="selectedSupplier">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="Tax Number:">
                      <el-input
                        v-model="selectedSupplier.taxNumber"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <p class="text-title">Account Management</p>
                <el-divider class="divider"></el-divider>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="Reconciliation Acct:">
                      <el-input
                        v-model="selectedSupplier.reconciliationAcct"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <p class="text-title">Payment Data</p>
                <el-divider class="divider"></el-divider>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="Terms of Payments:">
                      <el-input
                        v-model="selectedSupplier.termsOfPayment"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="Check Double Invoice:">
                      <el-input
                        v-model="selectedSupplier.checkDoubleInvoice"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <p class="text-title">Correspondence</p>
                <el-divider class="divider"></el-divider>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="Clerk at Vendor:">
                      <el-input
                        v-model="selectedSupplier.clerkName"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-tab-pane>

          <el-tab-pane label="Purchasing" name="purchasing">
            <div>
              <p class="text-title">Purchasing Organization</p>
              <el-divider class="divider"></el-divider>
              <el-form :model="selectedSupplier" label-width="150px">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="Purch. Organization:">
                      <el-input
                        v-model="selectedSupplier.purchasingOrg"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <p class="text-title">Purchase Data</p>
                <el-divider class="divider"></el-divider>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="Order Currency:">
                      <el-input
                        v-model="selectedSupplier.orderCurrency"
                        class="text-value"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
        <br />

        <!-- 根据当前激活的标签页，动态显示按钮 -->
        <el-button
          type="primary"
          plain
          @click="activeTab !== 'purchasing' ? nextTab() : saveSupplier()"
        >
          {{ activeTab !== "purchasing" ? "Next Tab" : "Save" }}
        </el-button>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "vue";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ElMessageBox } from "element-plus";

// 设置模拟请求
const mock = new MockAdapter(axios);

// 模拟POST /supplier/create请求的响应
mock.onPost("/api/supplier/create_success").reply(200, {
  code: 1,
  message: "success",
  data: {
    supplierID: "supplierID_value",
  },
});

export default {
  setup() {
    const router = useRouter();
    const form = ref({
      businessPartner: "",
      bpRole: "",
      companyCode: "",
    });

    const selectedSupplier = ref({});
    const activeTab = ref("common");

    function navigateTo(path) {
      router.push(path);
    }
    // Define nextTab method
    const nextTab = () => {
      if (activeTab.value === "common") {
        activeTab.value = "vendor";
      } else if (activeTab.value === "vendor") {
        activeTab.value = "purchasing";
      }
    };

    async function saveSupplier() {
      // 验证表单是否填写完整
      if (
        !form.value.businessPartner ||
        !form.value.bpRole ||
        !form.value.companyCode
      ) {
        ElMessageBox.alert(
          "Please fill in all required fields.",
          "Incomplete Information",
          {
            confirmButtonText: "OK",
            type: "warning",
          }
        );
        return;
      }

      try {
        // 发送请求保存供应商数据
        const response = await axios.post(
          "/api/supplier/create_success",
          form.value
        );

        if (response.data.code === 1) {
          ElMessageBox.alert(
            `Supplier created successfully! Supplier ID: ${response.data.data.supplierID}`,
            "Success",
            {
              confirmButtonText: "OK",
              type: "success",
            }
          );
          // 清空表单
          form.value = {
            businessPartner: "",
            bpRole: "",
            companyCode: "",
          };
        } else {
          ElMessageBox.alert(
            "Failed to create supplier. Please try again.",
            "Error",
            {
              confirmButtonText: "OK",
              type: "error",
            }
          );
        }
      } catch (error) {
        console.error("Error saving supplier data:", error);
        ElMessageBox.alert(
          "Failed to create supplier. Please try again.",
          "Error",
          {
            confirmButtonText: "OK",
            type: "error",
          }
        );
      }
    }

    return {
      form,
      selectedSupplier,
      activeTab,
      navigateTo,
      saveSupplier,
      nextTab,
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
  font-family: "Inter", sans;
  color: #498be6;
}

.text-value {
  font-size: 14px;
  margin-bottom: 20px;
  display: inline-block;
  width: 190px;
  font-family: "Inter", sans;
}

.divider {
  margin-top: 15px;
  margin-bottom: 15px;
}

.label {
  font-size: 14px;
  display: inline-block;
  font-family: "Inter", sans;
}

.value {
  display: inline-block;
  width: 150px; /* 设置标签的固定宽度 */
  font-family: "Inter", sans;
}

.top {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
}
</style>
