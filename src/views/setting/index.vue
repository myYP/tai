<template>
    <div class="m-setting">
      <div class="m-setting-row" v-for="(item,index) in input_list">
        <span class="m-label">客服电话{{index + 1}}</span>
        <el-input v-model="item.custom_telphone" placeholder="请输入内容" class="m-input-s"></el-input>
        <div class="m-btn-box">
          <span class="m-btn" @click="saveInput(item.custom_id,index)">保存</span>
          <span class="m-btn cancel" @click="cancelInput">重置</span>
          <span class="m-btn cancel" @click="deleteInput(item.custom_id)">删除</span>
        </div>
      </div>
      <p class="m-add-text">
        <span @click="addTel">新增电话</span>
      </p>
    </div>
</template>

<script>
  import axios from 'axios';
  import api from '../../api/api';
    export default {
        name: "index",
      data(){
          return{
            input:'',
            input_list:[],
          }
      },
      mounted(){
          this.getList();
      },
      inject: ['reload'],
      methods:{
        getList(){
          axios.get(api.get_custom_list).then(res => {
            if(res.data.status == 200){
              let arr = [].concat(res.data.data);
              for(let i=0;i<arr.length;i++){
                arr[i].click=false;
              }
              this.input_list = [].concat(arr);
              this.total_page = res.data.total_page;
              this.loading = false;
            }else{
              this.$message.error(res.data.message);
            }
          })
        },
        addTel(){
            this.input_list.push({custom_id: "", custom_telphone: ""});
        },
        saveInput(item,i){
          if(item){
            axios.post(api.update_custom + '?custom_id=' +item,{
              custom_telphone:this.input_list[i].custom_telphone
            }).then(res => {
              if(res.data.status == 200){
                this.$notify.success(res.data.message);
                this.getList();
              }else{
                this.$message.error(res.data.message);
              }
            })
          }else{
            axios.post(api.new_custom,{
              custom_telphone:this.input_list[i].custom_telphone
            }).then(res => {
              if(res.data.status == 200){
                this.$notify.success(res.data.message);
                this.getList();
              }else{
                this.$message.error(res.data.message);
              }
            })
          }
        },
        cancelInput(){
          this.reload();
        },
        deleteInput(item){
          this.$confirm('此操作将永久删除该客服电话, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios.get(api.delete_custom ,{
              params:{
                custom_id: item
              }
            }).then(res => {
              if(res.data.status == 200){
                this.$notify.success(res.data.message);
                this.getList();
              }else{
                this.$message.error(res.data.message);
              }
            })
          }).catch(() => {

          });

        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
.m-setting{
  .m-setting-row{
    margin-bottom: 20px;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: flex-start;
    .m-label{
      display: inline-block;
      margin-right: 20px;
    }
    .m-btn-box{
      margin-left: 50px;
    }
  }
  .m-add-text{
    span{
      color: #409EFF;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
