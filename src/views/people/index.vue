<template>
    <div class="m-people-index">
      <div class="m-search-box">
        <div>
          <el-input v-model="user_name" class="m-input-s" placeholder="搜索昵称"></el-input>
          <el-input v-model="user_telphone" class="m-input-s" placeholder="搜索手机号"></el-input>
          <span class="m-btn m-search-btn" @click="getUser">
            <svg-icon icon-class="icon-search" />
            <span>搜索</span>
          </span>
        </div>
      </div>
      <div class="m-content">
        <el-table :data="people_data" v-loading="loading" class="m-table" stripe   style="width: 100%">
          <el-table-column align="center" prop="user_name" label="昵称"></el-table-column>
          <el-table-column align="center" prop="user_icon" label="头像">
            <template slot-scope="scope">
              <img :src="scope.row.user_icon" class="m-table-img" alt="">
            </template>
          </el-table-column>
          <el-table-column align="center" prop="user_telphone"  label="手机号" ></el-table-column>
          <el-table-column align="center" label="操作" >
            <template slot-scope="scope">
                <div class="m-icon-div" @click="deleteUser(scope.row.user_id)">
                  <svg-icon icon-class="icon-delete"></svg-icon>
                  <p>删除</p>
                </div>
            </template>
          </el-table-column>
        </el-table>


        <div class="m-bottom">
          <pagination :total="total_page" @pageChange="pageChange"></pagination>
        </div>
      </div>
    </div>
</template>

<script>
  import Pagination from "../../components/common/page";
  import axios from 'axios';
  import api from '../../api/api'
    export default {
        name: "index",
      data(){
          return {
            people_data:[],
            loading:false,
            total_page:0,
            user_telphone:'',
            user_name:'',
            page_num:1
          }
      },
      components:{
        Pagination
      },
      mounted(){
        this.getUser();
      },
      methods:{
        //  获取管理员列表
        getUser(){
          this.loading = true;
          axios.get(api.get_all_user,{
            params: {
              page_num:this.page_num,
              page_size:10,
              user_telphone: this.user_telphone,
              user_name: this.user_name
            }}).then(res => {
            if(res.data.status == 200){
              this.people_data = res.data.data;
              this.total_page = res.data.total_page;
              this.loading = false;
            }else{
              this.$message.error(res.data.message);
            }
          })
        },
        //分页
        pageChange(num){
          this.page_num = num;
          this.getUser();
        },
        deleteUser(item){
          this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios.get(api.delete_user,
              {
                params:{
                  user_id:item
                }
              }
            ).then(res => {
              if(res.data.status == 200){
                this.getUser();
                this.$notify.success(res.data.message)
              }else{
                this.$message.error(res.data.message);
              }
            })
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {

          });
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less" scoped>
.m-people-index{
  .m-table-img{
    display: inline-block;
    width: 90px;
    height: 90px;
    background-color: #409EFF;
  }
}
</style>
