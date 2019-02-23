<template>
  <div class="m-examination">
    <div class="m-search-box ">
      <div>
        <!--<el-input v-model="medical_name" class="m-input-s" placeholder="搜索商品"></el-input>-->
        <!--<el-select v-model="medical_status" placeholder="请选择">-->
        <!--<el-option-->
        <!--v-for="item in options"-->
        <!--:key="item.value"-->
        <!--:label="item.label"-->
        <!--:value="item.value">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--<span class="m-btn m-search-btn" @click="getProdcut">-->
        <!--<svg-icon icon-class="icon-search" />-->
        <!--<span>搜索</span>-->
        <!--</span>-->
      </div>
      <div>
          <span class="m-btn active" @click="changeRoute">
            <span>新增活动</span>
          </span>
      </div>
    </div>
    <div class="m-content">
      <el-table :data="product_data" v-loading="loading" class="m-table"  stripe @selection-change="handleSelectionChange"  style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column align="center" prop="send_status" label="状态">
          <template slot-scope="scope">
            <span  :class="scope.row.send_status == '活动中'?'m-sale':'m-done'">{{scope.row.send_status}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="send_title" label="标题"></el-table-column>
        <el-table-column align="center" prop="send_use"  label="赠数量" ></el-table-column>
        <el-table-column align="center" prop="send_num"  label="满数量" ></el-table-column>
        <el-table-column align="center" prop="medical_for" label="有效期">
          <template slot-scope="scope">
            {{scope.row.send_starttime}}-{{scope.row.send_endtime}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="medical_list" label="关联产品"></el-table-column>
        <!--<el-table-column align="center" prop="examiner_telphone" label="体检方式"></el-table-column>-->
        <el-table-column align="center" label="操作" >
          <template slot-scope="scope">
            <div class="m-flex-center">
              <!--<div class="m-icon-div"  @click="lookProduct(scope.row.send_id)">-->
                <!--<svg-icon icon-class="icon-editor"></svg-icon>-->
                <p @click="lookProduct(scope.row.send_id)">查看</p>
              <!--</div>-->
              <!--<div class="m-icon-div" @click="deleteProduct(scope.row.send_id,'line')">-->
                <!--<svg-icon icon-class="icon-delete"></svg-icon>-->
                <!--<p>删除</p>-->
              <!--</div>-->
            </div>
          </template>
        </el-table-column>
      </el-table>


      <div class="m-bottom m-flex-between">
        <div class="m-btn-box">
          <span class="m-btn" @click="online">中止</span>
          <span class="m-btn cancel" @click="deleteProduct">删除</span>
        </div>
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
        product_data:[
          {}
        ],
        loading:false,
        total_page:0,
        input:'',
        page_num:1,
        multipleSelection: [],
      }
    },
    components:{
      Pagination
    },
    mounted(){
      // this.getUser();
      this.getProdcut();
    },
    methods:{
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //  获取产品
      getProdcut(){
        this.loading = true;
        axios.get(api.get_send_list,{
          params: {
            page_num:this.page_num,
            page_size:10
          }}).then(res => {
          if(res.data.status == 200){
            let arr = [].concat(res.data.data);
            this.product_data = [].concat(arr);
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
        this.getProdcut();
      },
      //查看
      lookProduct(item,name) {
        this.$router.push({path: '/activity/addPresent',query:{send_id:item}})
      },
      //中止
      online(){
        let arr = [];
        for(let i =0;i<this.multipleSelection.length;i++){
          arr.push(this.multipleSelection[i].send_id)
        }
        this.$confirm('确定要中止当前活动吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(api.offline_send,{
            send_list:arr
          }).then(res => {
            if(res.data.status == 200){
              this.getProdcut();
              this.$message({
                type: 'success',
                message: res.data.message
              });
            }else{
              this.$message({
                type: 'error',
                message: res.data.message
              });
            }
          })
        }).catch(() => {

        });

      },
      deleteProduct(item,name){
        let arr = [];
        if(name){
          arr.push(item)
        }else{
          for(let i =0;i<this.multipleSelection.length;i++){
            arr.push(this.multipleSelection[i].send_id)
          }
        }
        this.$confirm('确定要删除当前活动吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(api.delete_send,{
            send_list:arr
          }).then(res => {
            if(res.data.status == 200){
              this.getProdcut();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else{
              this.$message({
                type: 'error',
                message: res.data.message
              });
            }
          })
        }).catch(() => {

        });
      },
      //  去往新增
      changeRoute(){
        this.$router.push('/activity/addPresent')
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .m-examination{
    .m-table-img{
      display: inline-block;
      width: 90px;
      height: 90px;
      background-color: #409EFF;
    }
    .m-mr{
      margin-left: 20px;
    }
    .m-bottom{
      margin-top: 20px;
    }
    .m-sale{
      color: #42B983;
    }
    .m-done{
      color: #E20421;
    }
  }
</style>
