<template>
    <div>
      <div class="m-search-box">
        <div>

        </div>
        <div>
          <span class="m-btn active" @click="changeRoute">
            <svg-icon icon-class="icon-add"></svg-icon>
            <span>新增文章</span>
          </span>
        </div>
      </div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="science_name"
          label="文章标题"
          align="center">
        </el-table-column>
        <el-table-column
          prop="img"
          label="文章主图"
          align="center"
          width="380">
          <template slot-scope="scope">
            <img :src="scope.row.science_pic" class="m-table-img" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="updatetime"
          label="发布时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="science_type"
          align="center"
          label="是否推荐">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.science_type"
              active-color="#409EFF"
              inactive-color="#ff4949">
            </el-switch>
          </template>

        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <div class="m-flex-center">
              <div class="m-icon-div" @click="changeclick(scope.row.science_id,'row')">
                <svg-icon icon-class="icon-editor"></svg-icon>
                <p>修改</p>
              </div>
              <div class="m-icon-div" @click="deleteClick(scope.row.science_id)">
                <svg-icon icon-class="icon-delete"></svg-icon>
                <p>删除</p>
              </div>
            </div>


          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total_page" @pageChange="pageChange"></pagination>
    </div>
</template>

<script>
  import Pagination from "../../components/common/page";
  import axios from 'axios';
  import api from '../../api/api'
    export default {
        name: "index",
      data(){
          return{
            tableData:[{}],
            value2:false,
            total_page:0,
            page_num:1
          }
      },
      components:{
        Pagination
      },
      mounted(){
        this.getList();
      },
      methods:{
        //  获取列表
        getList(){
          this.loading = true;
          axios.get(api.get_science_list,{
            params: {
              page_num:this.page_num,
              page_size:10,
              use_type: 0
            }}).then(res => {
            if(res.data.status == 200){
              let arr = [].concat(res.data.data);
              for(let i=0;i<arr.length;i++){
                if(arr[i].science_type == 1){
                  arr[i].science_type = true;
                }else{
                  arr[i].science_type = false;
                }
              }
              this.tableData = [].concat(arr);
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
          this.getList()
        },
        changeRoute(){
          this.$router.push('/material/addMaterial');
        },
        changeclick(item,name){
          if(name){
            this.$router.push({path:'/material/addMaterial',query:{science_id:item}});
          }
        },
        deleteClick(item){
          this.$confirm('此操作将永久删除该知识, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios.get(api.delete_science,
              {
                params:{
                  science_id:item
                }
              }
            ).then(res => {
              if(res.data.status == 200){
                this.getList();
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

</style>
