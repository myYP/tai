<template>
    <div class="m-order-detail" v-if="allData">
       <h3 class="m-order-detail-title">订单详情</h3>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="m-order-part">
            <h3 class="m-order-detail-title">订单详情</h3>
            <div class="m-order-detail-text">
              <p>
                <span class="m-label">订单编号：</span>
                <span>{{allData.order_no}}</span>
              </p>
              <p>
                <span class="m-label">体检人：</span>
                <span>{{allData.order_user_name}}</span>
              </p>
              <p>
                <span class="m-label">联系方式：</span>
                <span>{{allData.order_user_telphone}}</span>
              </p>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="m-order-part m-flex">
            <svg-icon icon-class="icon-order-status"/>
            <div>
              <p class="m-status-text">
                订单状态：买家已支付，等待样本寄送。
              </p>
              <div class="m-step-box m-flex-between">
                <step :list="list"></step>
                <span class="m-btn">提交进度</span>
              </div>
              <el-form :inline="true" :model="allData" class="demo-form-inline">
                <el-form-item label="寄样人">
                  <el-input v-model="allData.order_user_send" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="单号">
                  <el-input v-model="allData.order_no_send" placeholder=""></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        style="width: 100%;margin: 20px 0;">
        <el-table-column
          prop=""
          label="商品"
          align="center"
        >
          <template slot-scope="scope">
            <div class="m-flex-center">
              <img :src="scope.row.medical_pic[0]" alt="" style="display: inline-block;width: 120px;height: 120px;margin-right: 20px;">
              <span>{{scope.row.medical_name}}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="order_location"
          label="地点"
          align="center"
        >
          <template slot-scope="scope">
            {{scope.row.order_location_type}} - {{scope.row.order_location}}
          </template>
        </el-table-column>
        <el-table-column
          prop="order_price"
          label="小计（元）"
          align="center" >
        </el-table-column>
        <el-table-column
          prop="order_status"
          label="状态"
          align="center" >
        </el-table-column>
      </el-table>
      <p class="m-order-text">订单共1件商品，总计：{{allData.order_price}}</p>
      <div class="m-bottom m-flex-center">
        <span class="m-btn">上传报告</span>
      </div>
    </div>
</template>

<script>
  import step from '../../components/common/step';
  import axios from 'axios';
  import api from '../../api/api'
    export default {
        name: "order-detail",
      data(){
          return{
            tableData: [],
            allData: null,
            list:[
              {
                name:'样本已寄',
                time:'',
                active:false
              },
              {
                name:'样本已收',
                time:'',
                active:false
              },
              {
                name:'样本分析',
                time:'',
                active:false
              },
              {
                name:'分析完毕',
                time:'',
                active:false
              }
            ]
          }
      },
      components:{
          step
      },
      mounted(){
          this.getDetail();
      },
      methods:{
          getDetail(){
            axios.get(api.get_order_message,{
              params: {
                order_id:this.$route.query.order_id,
              }}).then(res => {
              if(res.data.status == 200){
                let arr = [];
                arr.push(res.data.data);
                this.tableData = [].concat(arr);
                this.allData =  res.data.data;
              }else{
                this.$message.error(res.data.message);
              }
            })
          }
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
.m-order-detail{
  .m-order-detail-title{
    /*font-size: 18px;*/
    margin-bottom: 20px;
  }
  .m-order-part{
    height: 310px;
    border: 1px solid #DBDCDC;
    padding: 20px;
    &.m-flex{
      display: flex;
      flex-flow: row;
      align-items: flex-start;
      justify-content: flex-start;
    }
    .m-order-detail-text{
      p{
        margin-bottom: 14px;
        color: #808080;
        font-size: 12px;
        .m-label{
          display: inline-block;
          width: 60px;
          text-align: right;
        }
      }
    }
    .svg-icon{
      width: 63px;
      height: 63px;
      margin-right: 20px;
    }
    .m-step-box{
      margin-bottom: 30px;
    }
    .m-status-text{
      line-height: 63px;
    }
  }
  .m-order-text{
    font-size: 14px;
    color: #595757;
    text-align: right;
  }
  .m-bottom{
    margin-top: 50px;
  }
}
</style>
