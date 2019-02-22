<template>
  <div class="m-questionnaire">
    <div class="m-search-box">
      <div>
        <el-input v-model="examiner_name" class="m-input-s" placeholder="搜索提交人"></el-input>
        <span class="m-btn m-search-btn">
            <svg-icon icon-class="icon-search" />
            <span>搜索</span>
          </span>
      </div>
      <div>
          <span class="m-btn active" @click="addQuest">
            <svg-icon icon-class="icon-add"></svg-icon>
            <span>问卷添加/编辑</span>
          </span>
      </div>
    </div>
    <div class="m-content">
      <el-table :data="question_data" v-loading="loading" class="m-table" stripe   style="width: 100%">
        <el-table-column align="center" prop="examiner_name" label="提交人"></el-table-column>
        <el-table-column align="center" prop="createtime"  label="提交时间" ></el-table-column>
        <el-table-column align="center" label="操作" >
          <template slot-scope="scope">
            <div class="m-flex-center">
              <div class="m-icon-div" @click="goClick(scope.row.answeruser_id,'row')">
                <svg-icon icon-class="icon-detail"></svg-icon>
                <p>详情</p>
              </div>
              <!--<div class="m-icon-div">-->
                <!--<svg-icon icon-class="icon-delete"></svg-icon>-->
                <!--<p>删除</p>-->
              <!--</div>-->
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
        question_data:[],
        loading:false,
        total_page:0,
        input:'',
        page_num:1,
        examiner_name:''
      }
    },
    components:{
      Pagination
    },
    mounted(){
      this.getQuestion();
    },
    methods:{
      //  获取管理员列表
      getQuestion(){
        this.loading = true;
        axios.get(api.get_answer_list,{
          params: {
            page_num:this.page_num,
            page_size:10,
            examiner_name: this.examiner_name
          }}).then(res => {
          if(res.data.status == 200){
            this.question_data = res.data.data;
            this.total_page = res.data.total_page;
            this.loading = false;
          }else{
            this.$message.error(res.data.message);
          }
        })
      },
      addQuest(){
        this.$router.push('/questionnaire/addQuestionnaire')
      },
      //分页
      pageChange(num){
        this.page_num = num;
        this.getQuestion();
      },
      goClick(item,name){
        this.$router.push({path:'/questionnaire/questionnaireDetail',query:{answeruser_id:name?item:''}})
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
.m-questionnaire{
  .m-icon-div:first-child{
    margin-right: 0 ;
  }
}
</style>
