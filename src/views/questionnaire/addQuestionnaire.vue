<template>
  <div class="m-people-experience">
    <div class="m-content">
      <el-table :data="question_data" v-loading="loading" class="m-table" stripe   style="width: 100%">
        <el-table-column align="center" label="顺序">
          <template slot-scope="scope">
            {{scope.$index +1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="question_title"  label="问题" ></el-table-column>
        <el-table-column align="center" prop="question_choose"  label="选项" >
          <template slot-scope="scope">
            <span v-for="(item,index) in scope.row.question_choose" class="m-xuan">{{item}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" >
          <template slot-scope="scope">
            <div class="m-flex-center">
              <div class="m-icon-div" @click="editeQues(scope.row.question_id,'row')">
                <svg-icon icon-class="icon-editor"></svg-icon>
                <p>修改</p>
              </div>
              <div class="m-icon-div">
                <svg-icon icon-class="icon-delete"></svg-icon>
                <p>删除</p>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <p>
        <span class="m-add" @click="editeQues">新增</span>
      </p>

    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import api from '../../api/api'
  export default {
    name: "index",
    data(){
      return {
        question_data:[
          {

          }
        ],
        loading:false,
      }
    },
    mounted(){
      this.getQues();
    },
    methods:{
      getQues(){
        this.loading = true;
        axios.get(api.get_question_list).then(res => {
          if(res.data.status == 200){
            this.question_data = res.data.data;
            this.total_page = res.data.total_page;
            this.loading = false;
          }else{
            this.$message.error(res.data.message);
          }
        })
      },
      editeQues(item,name){
        this.$router.push({path:'/questionnaire/editeQuestionnaire',query:{question_id:name?item :''}})
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
.m-people-experience{
  .m-add{
    color: #409EFF;
    text-decoration: underline;
    margin-top: 50px;
    margin-left: 30px;
    display: block;
    cursor: pointer;
  }
  .m-xuan{
    margin-right: 10px;
    &:last-child{
      margin-right: 0;
    }
  }
}
</style>
