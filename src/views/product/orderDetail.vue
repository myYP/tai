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
                订单状态：{{allData.order_status}}。
              </p>
              <div class="m-step-box m-flex-between">
                <step :list="list"></step>
                <span class="m-btn" v-if="!(list[0].active && !list[1].active)" @click="changeStatus">提交进度</span>
              </div>
              <el-form :inline="true" :model="allData" class="demo-form-inline">
                <el-form-item label="寄样人">
                  <el-input v-model="allData.order_user_send" placeholder="" :disabled="list[0].active"></el-input>
                </el-form-item>
                <el-form-item label="单号">
                  <el-input v-model="allData.order_no_send" placeholder="" :disabled="list[0].active"></el-input>
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
      <div class="m-bottom m-flex-center" v-if="list[2].active">
        <span class="m-box">
            <span class="m-btn">上传报告</span>
            <input type="file" name="file" @change="uploadPdf" class="m-export-btn" id="main"/>
        </span>

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
            ],
            order_pdf:''
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
                this.list = [].concat(res.data.data.status_type)
              }else{
                this.$message.error(res.data.message);
              }
            })
          },
        uploadPdf(event){
          let form = new FormData();
          form.append("file", event.target.files[0]);
          form.append("FileType", 'order_pdf');
          axios.post(api.upload_files ,form).then(res => {
            if(res.data.status == 200){
              this.order_pdf = res.data.data;
              var file = document.getElementById('main');
              file.value ='';
            }else{
              this.$message({
                type: 'error',
                message: '服务器请求失败，请稍后再试 '
              });
            }
          },error =>{
            this.$message({
              type: 'error',
              message: '服务器请求失败，请稍后再试 '
            });
          })
        },
        changeStatus(){
          let params = {},update_type=1;
          if(this.list[2].active){
            if(!this.order_pdf){
              this.$message({
                type: 'error',
                message: '请上传报告'
              });
              return false;
            }
            params.order_pdf = this.order_pdf;
            update_type = 4
          }else if(this.list[1].active){
            update_type = 6
          }else{
            if(!this.allData.order_user_send){
              this.$message({
                type: 'error',
                message: '请填写寄件人'
              });
              return false;
            }else if(!this.allData.order_no_send){
              this.$message({
                type: 'error',
                message: '请填写单号'
              });
              return false;
            }
            params = {
              order_user_send:this.allData.order_user_send,
              order_no_send: this.allData.order_no_send
            }
          }
          axios.post(api.update_order +'?order_id='+this.$route.query.order_id + '&update_type=' +update_type,params).then(res => {
            if(res.data.status == 200){
              this.$notify.success(res.data.message);
              this.$router.push('/product/appoint');
            }else{
              this.$message({
                type: 'error',
                message: res.data.message
              });
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
      margin-bottom: 50px;
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
    .m-box{
      position: relative;
      display: inline-block;
      overflow: hidden;
      .m-export-btn{
        position: absolute;
        right: 0;
        top: 0;
        opacity: 0;
        -ms-filter: alpha(opacity=0);
      }
    }

  }
}
</style>
