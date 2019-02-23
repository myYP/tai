<template>
  <div class="m-examination">
    <div class="m-search-box">
      <div>
        <el-input v-model="medical_name" class="m-input-s" placeholder="搜索商品"></el-input>
        <el-select v-model="medical_status" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="m-btn m-search-btn" @click="getProdcut">
            <svg-icon icon-class="icon-search" />
            <span>搜索</span>
          </span>
      </div>
      <div>
          <span class="m-btn active" @click="changeRoute">
            <span>新增商品</span>
          </span>
      </div>
    </div>
    <div class="m-content">
      <el-table :data="product_data" v-loading="loading" class="m-table"  stripe @selection-change="handleSelectionChange"  style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column align="center" prop="examiner_name" label="状态">
          <template slot-scope="scope">
            <span  :class="scope.row.medical_status == '出售中'?'m-sale':'m-done'">{{scope.row.medical_status}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="medical_name" label="标题"></el-table-column>
        <el-table-column align="center" prop="examiner_birth"  label="主图" >
          <template slot-scope="scope">
            <img :src="scope.row.medical_pic[0]" class="m-table-img" alt="">
          </template>
        </el-table-column>
        <el-table-column align="center" prop="medical_price"  label="价格" >
          <template slot-scope="scope">
            ￥{{scope.row.medical_price}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="medical_for" label="适用人群"></el-table-column>
        <!--<el-table-column align="center" prop="examiner_telphone" label="体检方式"></el-table-column>-->
        <el-table-column align="center" label="操作" >
          <template slot-scope="scope">
            <div class="m-flex-center">
              <div class="m-icon-div"  @click="changeClick(scope.row.medical_id)">
                <svg-icon icon-class="icon-editor"></svg-icon>
                <p>修改</p>
              </div>
              <div class="m-icon-div" @click="deleteProduct(scope.row.medical_id,'line')">
                <svg-icon icon-class="icon-delete"></svg-icon>
                <p>删除</p>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>


      <div class="m-bottom m-flex-between">
        <div class="m-btn-box">
          <span class="m-btn" @click="online">上架</span>
          <span class="m-btn m-mr" @click="offline">下架</span>
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
        total_page:1,
        input:'',
        page_num:1,
        medical_name:'',
        use_type:1,
        multipleSelection: [],
        options:[
          {
            value:'出售中',
            label:'出售中'
          },
          {
            value:'已下架',
            label:'已下架'
          },
          {
            value:'',
            label:'全部'
          }
        ],
        medical_status:''
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
        axios.get(api.get_medical_list,{
          params: {
            page_num:this.page_num,
            page_size:10,
            use_type: this.use_type,
            medical_name: this.medical_name,
            medical_status:this.medical_status
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
      //点击修改
      changeClick(id){
        this.$router.push({path:'/product/addProduct',query:{medical_id:id}});
      },
      //上架
      online(){
        let arr = [];
        for(let i =0;i<this.multipleSelection.length;i++){
          arr.push(this.multipleSelection[i].medical_id)
        }
        this.$confirm('确定要上架当前选择的商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(api.online_medical,{
            medical_list:arr
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
      //下架
      offline(){
        let arr = [];
        for(let i =0;i<this.multipleSelection.length;i++){
          arr.push(this.multipleSelection[i].medical_id)
        }
        this.$confirm('确定要下架当前选择的商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(api.offline_medical,{
            medical_list:arr
          }).then(res => {
            if(res.data.status == 200){
              this.getProdcut();
              this.$message({
                type: 'success',
                message:res.data.message
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
            arr.push(this.multipleSelection[i].medical_id)
          }
        }
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(api.delete_medical,{
            medical_list:arr
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
    //  去往新增
      changeRoute(){
        this.$router.push('/product/addProduct')
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
