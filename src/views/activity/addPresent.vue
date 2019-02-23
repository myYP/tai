<template>
  <div class="m-addActivity">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" :disabled="disabled" label-position="left">
      <el-form-item label="标题" prop="send_title">
        <el-input v-model="form.send_title"></el-input>
        <p class="m-alert-text">建议问题文字在x字以内</p>
      </el-form-item>
      <el-form-item label="赠数量" prop="send_use">
       <el-input v-model="form.send_use" type="number" class="m-input-s"></el-input>
      </el-form-item>
      <el-form-item label="满数量" prop="send_num">
        <el-input v-model="form.send_num" type="number" class="m-input-s"></el-input>
      </el-form-item>
      <el-form-item label="有效期限" required>
        <el-col :span="6">
          <el-form-item  prop="send_starttime">
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="form.send_starttime" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="6">
          <el-form-item  prop="send_endtime">
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="form.send_endtime" style="width: 100%;"></el-date-picker>
          </el-form-item>

        </el-col>
      </el-form-item>
      <el-form-item label="关联商品" prop="medical_list">
        <el-table :data="form.medical_list" v-loading="loading" class="m-table"  stripe   style="width: 100%">
          <!--<el-table-column align="center" prop="examiner_name" label="状态">-->
          <!--<template slot-scope="scope">-->
          <!--<span  :class="scope.row.medical_status == '出售中'?'m-sale':'m-done'">{{scope.row.medical_status}}</span>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column align="center" prop="medical_name" label="标题"></el-table-column>
          <el-table-column align="center"   label="主图" >
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
          <el-table-column align="center" label="操作" v-if="!disabled">
            <template slot-scope="scope">
              <div class="m-flex-center" >
                <div class="m-icon-div" @click="deleteProduct(scope.$index)">
                  <svg-icon icon-class="icon-delete"></svg-icon>
                  <p>删除</p>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="m-bottom m-flex-between">
          <div class="m-btn-box">
            <el-popover
              placement="right"
              width="800"
              v-model="show_prop"
              trigger="click">
              <el-table :data="product_data" v-loading="loading" class="m-table"  stripe  @selection-change="handleSelectionChange"  style="width: 100%">
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
              </el-table>
              <div class="m-flex-between" style="margin-top: 20px;">
                <div >
                  <span class="m-btn" @click="saveProduct">确定</span>
                  <span class="m-btn cancel" @click="show_prop = false">取消</span>
                </div>
                <pagination :total="total_page" @pageChange="pageChange"></pagination>
              </div>
              <span class="m-btn" slot="reference" v-if="!disabled">新增</span>
            </el-popover>

          </div>
        </div>
      </el-form-item>

    </el-form>

    <div class="m-flex-center" style="margin-top: 100px;" v-if="!disabled">
      <span class="m-btn" @click="saveActivity">保存</span>
      <span class="m-btn cancel" @click="cancelTab">取消</span>
    </div>
  </div>
</template>

<script>
  import Pagination from "../../components/common/page";
  import axios from 'axios';
  import api from '../../api/api'
  export default {
    name: "add-deduction",
    data(){
      return{
        form: {
          send_title: '',
          send_use: '',
          send_num: '',
          send_starttime: '',
          send_endtime: '',
          medical_list:[]
        },
        rules:{
          send_title:[
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          send_use:[
            { required: true, message: '请输入折扣', trigger: 'blur' }
          ],
          send_num:[
            { required: true, message: '请输入使用条件', trigger: 'blur' }
          ],
          send_starttime:[
            { required: true, message: '请输入开始时间', trigger: 'blur' }
          ],
          send_endtime:[
            { required: true, message: '请选择结束时间', trigger: 'blur' }
          ],
          medical_list:[
            { required: true, message: '请选择关联商品', trigger: 'blur' }
          ]
        },
        product_data:[],
        multipleSelection: [],
        page_num:1,
        total_page:0,
        loading:false,
        show_prop:false,
        disabled:false
      }
    },
    components:{
      Pagination
    },
    inject: ['reload'],
    mounted(){
      // this.getUser();
      this.getProdcut();
      if(this.$route.query.send_id){
        this.disabled = true;
        this.getDetail();
      }
    },
    methods:{
      //  获取详情
      getDetail(){
        this.loading = true;
        axios.get(api.get_send_message,{
          params: {
            send_id:this.$route.query.send_id,
            page_num:1,
            page_size:999
          }}).then(res => {
          if(res.data.status == 200){
            this.form = res.data.data;
            this.loading = false;
          }else{
            this.$message.error(res.data.message);
          }
        })
      },
      //  获取产品
      getProdcut(){
        this.loading = true;
        axios.get(api.get_medical_list,{
          params: {
            page_num:this.page_num,
            page_size:5,
            use_type: 1
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      saveProduct(){
        let arr = [];
        arr = this.form.medical_list.concat(this.multipleSelection);
        let x = new Set(arr);
        this.form.medical_list = [...x];
        this.show_prop = false;
      },
      saveActivity(){
        let that = this,_form=[];
        _form = Object.assign(that.form);
        let arr = [];
        for(let i =0;i<_form.medical_list.length;i++){
          arr.push(_form.medical_list[i].medical_id);
        }
        _form.medical_list = [].concat(arr);
        this.$refs['form'].validate((valid) => {
          if (valid) {
            axios.post(api.new_send,_form).then(res => {
              if(res.data.status == 200){
                this.$notify.success(res.data.message);
                this.$router.push('/activity/present');
              }else{
                this.$message({
                  type: 'error',
                  message: res.data.message
                });
              }
            })

          }
        })
      },
      cancelTab(){
        this.reload();
      },
      deleteProduct(index){
        let that = this;
        this.$confirm('确认删除该商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.form.medical_list.splice(index,1);
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
  .m-addActivity{
    .m-label{
      margin-right: 10px;
      color: #999999;
    }
    .m-alert-text{
      color: #999999;
      font-size: 12px;
    }

  }
</style>
