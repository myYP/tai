<template>
  <div class="m-people-experience">
    <div class="m-search-box">
      <div>
        <el-input v-model="examiner_name" class="m-input-s" placeholder="搜索昵称"></el-input>
        <el-input v-model="examiner_telphone" class="m-input-s" placeholder="搜索手机号"></el-input>
        <span class="m-btn m-search-btn">
            <svg-icon icon-class="icon-search" />
            <span>搜索</span>
          </span>
      </div>
    </div>
    <div class="m-content">
      <el-table :data="people_data" v-loading="loading" class="m-table" stripe   style="width: 100%">
        <el-table-column align="center" prop="examiner_name" label="昵称">
          <template slot-scope="scope">
            <el-input v-model="scope.row.examiner_name" class="m-input-xs" placeholder="请输入内容" :disabled="!scope.row.click"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="examiner_telphone" label="手机号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.examiner_telphone" class="m-input-xs" placeholder="请输入内容" :disabled="!scope.row.click"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="examiner_birth"  label="生日" >
          <template slot-scope="scope">
            <el-input v-model="scope.row.examiner_birth" class="m-input-xs" placeholder="请输入内容"   :disabled="!scope.row.click"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" >
          <template slot-scope="scope">
            <div class="m-flex-center">
              <div class="m-icon-div" v-if="!scope.row.click" @click="changeClick(scope.$index)">
                <svg-icon icon-class="icon-editor"></svg-icon>
                <p>修改</p>
              </div>
              <span class="m-table-btn" v-if="scope.row.click" @click="sureClick(scope.$index)">确定</span>
              <span class="m-table-btn cancel" v-if="scope.row.click" @click="cancelClick(scope.$index)"> 取消</span>
              <div class="m-icon-div" @click="deleteUser(scope.row.examiner_id)">
                <svg-icon icon-class="icon-delete"></svg-icon>
                <p>删除</p>
              </div>
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
        input:'',
        page_num:1,
        examiner_name:'',
        examiner_telphone:''
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
        axios.get(api.get_medical_user,{
          params: {
            page_num:this.page_num,
            page_size:10,
            examiner_telphone: this.examiner_telphone,
            examiner_name: this.examiner_name
          }}).then(res => {
          if(res.data.status == 200){
            let arr = [].concat(res.data.data);
            for(let i=0;i<arr.length;i++){
              arr[i].click=false;
            }
            this.people_data = [].concat(arr);
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
      //点击修改
      changeClick(index){
        let arr = [].concat(this.people_data);
        arr[index].click = true;
        this.people_data = [].concat(arr);
      },
      //确定
      sureClick(index){
        axios.post(api.update_medical_user +'?examiner_id=' +this.people_data[index].examiner_id,{
          examiner_name:this.people_data[index].examiner_name,
          examiner_telphone: this.people_data[index].examiner_telphone,
          examiner_birth: this.people_data[index].examiner_birth,
          examiner_sex: this.people_data[index].examiner_sex
        }).then(res => {
          if(res.data.status == 200){
            let arr = [].concat(this.people_data);
            arr[index].click = false;
            this.people_data = [].concat(arr);
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          }else{
            this.$message({
              type: 'error',
              message: '删除成功!'
            });
          }
        })
      },
      cancelClick(index){
        let arr = [].concat(this.people_data);
        arr[index].click = false;
        this.people_data = [].concat(arr);
      },
      deleteUser(item){
        this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get(api.delete_medical_user,
            {
              params:{
                examiner_id:item
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
        }).catch(() => {

        });
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .m-people-experience{
    .m-table-btn{
      display: inline-block;
      padding: 0 10px;
      background-color: #2D3A4B;
      color: #fff;
      margin-right: 10px;
      &.cancel{
        background-color: #F8F8F8;
        color: #2D3A4B;
      }
    }
  }
</style>
