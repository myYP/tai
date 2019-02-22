<template>
    <div class="m-admin">
      <div class="m-search-box">
        <div>
          <el-input v-model="admin_name" class="m-input-s" placeholder="搜索用户名"></el-input>
          <span class="m-btn m-search-btn" @click="getAdmin">
            <svg-icon icon-class="icon-search" />
            <span>搜索</span>
          </span>
        </div>
        <div>
          <span class="m-btn active" @click="addEdit">
            <svg-icon icon-class="icon-add"></svg-icon>
            <span>添加管理员</span>
          </span>
        </div>
      </div>

      <div class="m-content">
        <el-table :data="admin_data" v-loading="loading" class="m-table" stripe  :default-sort = "{prop: 'logintime', order: 'descending'}" style="width: 100%">
          <el-table-column align="center" prop="admin_name" label="用户名"></el-table-column>
          <el-table-column align="center" prop="admin_idno"  label="账号" ></el-table-column>
          <!--<el-table-column align="center" prop="adlevel" label="权限"  :filters="level" :filter-method="filterTag"></el-table-column>-->
          <el-table-column align="center" prop="admin_last_time" sortable label="最近登录时间" column-key="admin_last_time" ></el-table-column>
          <el-table-column align="center" label="操作" >
            <template slot-scope="scope">
              <el-popover trigger="manual" placement="left" v-model="admin_data[scope.$index].click">
                <div class="m-absolute-modal">
                  <p>{{scope.row.adname}}管理员数据管理</p>
                  <div class="m-admin-input-box">
                    <el-input v-model="scope.row.admin_name" placeholder="用户名" class="m-input-xs"></el-input>
                    <!--<el-select v-model="scope.row.adlevel" class="m-input-xs" placeholder="权限">-->
                      <!--<el-option-->
                        <!--v-for="item in level"-->
                        <!--:key="item.value"-->
                        <!--:label="item.name"-->
                        <!--:value="item.value">-->
                      <!--</el-option>-->
                    <!--</el-select>-->
                    <el-input v-model="scope.row.admin_idno" placeholder="账号" class="m-input-xs"></el-input>
                    <el-input v-model="scope.row.admin_password" type="password" placeholder="密码" class="m-input-xs"></el-input>
                  </div>
                  <div class="m-modal-btn-box m-flex-start">
                    <span class="m-btn active" @click="saveChange(scope.$index,true,scope.row)">保存</span>
                    <span class="m-btn cancel"  @click="saveChange(scope.$index,false)">取消</span>
                  </div>
                </div>
                <span class="m-table-link m-bd name-wrapper" slot="reference"  @click="manageClick(scope.$index)">管理</span>

              </el-popover>
              <span class="m-table-link"   @click="deleteAdmin(scope.row.admin_id)">删除</span>
            </template>
          </el-table-column>
        </el-table>


        <div class="m-bottom">
          <pagination :total="total_page" @pageChange="pageChange"></pagination>
        </div>
      </div>
      <div class="m-modal" v-if="add_admin">
        <div class="m-absolute-modal m-add-modal" >
          <p>管理员数据管理</p>
          <div class="m-admin-input-box">
            <el-input v-model="new_admin.admin_name" placeholder="用户名" class="m-input-xs"></el-input>
            <!--<el-select v-model="new_admin.adlevel" class="m-input-xs" placeholder="权限">-->
              <!--<el-option-->
                <!--v-for="item in level"-->
                <!--:key="item.value"-->
                <!--:label="item.name"-->
                <!--:value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
            <el-input v-model="new_admin.admin_idno" placeholder="账号" class="m-input-xs"></el-input>
            <el-input v-model="new_admin.admin_password" type="password" placeholder="密码" class="m-input-xs"></el-input>
          </div>
          <div class="m-modal-btn-box m-flex-start">
            <span class="m-btn active" @click.stop="addAdmin(true)">保存</span>
            <span class="m-btn cancel" @click.stop="addAdmin(false)">取消</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Pagination from "../../components/common/page";
  import axios from 'axios';
  import api from '../../api/api'
    export default {
        data(){
          return{
            input:'',
            add_admin:false,
            new_admin:{
              admin_name:'',
              admin_password:'',
              admin_idno:''
            },
            admin_data:[],
            total_page:0,
            page_num:1,
            loading:false,
            admin_name:''
          }
        },
      components:{
        Pagination
      },
      mounted(){
        this.getAdmin();
      },
      methods:{
        //  获取管理员列表
        getAdmin(){
          this.loading = true;
          axios.get(api.get_admin_list,{
            params: {
              page_num:this.page_num,
              page_size:10,
              admin_name: this.admin_name
            }}).then(res => {
              if(res.data.status == 200){
                let arr = [].concat(res.data.data);
                for(let i=0;i<arr.length;i++){
                  arr[i].click=false;
                  arr[i].admin_password = '******';
                }
                this.admin_data = [].concat(arr);
                this.total_page = res.data.total_page;
                this.loading = false;
              }else{
                this.$message.error(res.data.message);
              }
          })
        },
        // /点击管理
        manageClick(index){
          let arr = [].concat(this.admin_data);
          if(arr[index].click){
            arr[index].click = !arr[index].click;
          }else{
            for(let i=0;i<arr.length;i++){
              arr[i].click=false;
            }
            arr[index].click = true;
          }
          this.admin_data = [].concat(arr);
        },
        //保存 取消
        saveChange(index,bool,a){
          let arr = [].concat(this.admin_data);
          if(bool){
            let params = JSON.parse(JSON.stringify(a));
            axios.post(api.update_admin+'?admin_id='+params.admin_id,
              {
                admin_idno:params.admin_idno,
                admin_name:params.admin_name,
                admin_password:params.admin_password
              }
            ).then(res => {
              if(res.data.status == 200){
                arr[index].click = false;
                this.admin_data = [].concat(arr);
                this.$notify.success(res.data.message)
              }else{
                this.$message.error(res.data.message);
              }
            })
          }else{
            arr[index].click = false;
            this.admin_data = [].concat(arr);
          }

        },
        //分页
        pageChange(num){
          this.page_num = num;
          this.getAdmin()
        },
        //点击弹出新增会员
        addEdit(){
          this.add_admin = true;
        },
        //新增会员保存
        addAdmin(bool){
          if(bool){
            let params = JSON.parse(JSON.stringify(this.new_admin));
            axios.post(api.add_admin,{
              admin_idno:params.admin_idno,
              admin_name:params.admin_name,
              admin_password:params.admin_password
            }).then(res => {
              if(res.data.status ==200){
                this.$notify.success(res.data.message)
                this.add_admin = false;
                this.new_admin = {
                  admin_name:'',
                  admin_password:'',
                  admin_idno:''
                };
                this.getAdmin(1);
              }else{
                this.$message.error(res.data.message);
              }
            })
          }else{
            this.add_admin = false;
          }
        },
        deleteAdmin(item){
          this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios.get(api.delete_admin,
              {
                params:{
                  admin_id:item
                }
              }
            ).then(res => {
              if(res.data.status == 200){
                this.getAdmin(1);
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

.m-modal-text{
  display: inline-block;
  /*position: relative;*/

}
.m-modal{
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

}
.m-table-link{
  &.m-bd{
    margin-right: 47px;
  }
}
.m-absolute-modal{
  /*position: absolute;*/
  background-color: #fff;
  top: 0;
  /*left: -4.3rem;*/
  width: 440px;
  height: 230px;
  /*box-shadow:0 3px 6px rgba(0,0,0,0.16);*/
  /*border-radius: 10px;*/
  z-index: 100;
  /*padding: 0.37rem 0.26rem 0.5rem 0.44rem;*/
  text-align: left;
  &.m-add-modal{
    width: 540px;
    height: 280px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow:0 3px 6px rgba(0,0,0,0.16);
    border-radius: 10px;
    transform: translateX(-250px) translateY(-150px);
    padding: 37px 26px 50px 44px;
  }
  .m-admin-input-box{
    margin: 30px 0 10px;
    .m-input-xs{
      width: 200px;
      margin-right: 10px;
      display: inline-block;
      margin-bottom: 20px;
    }
  }


}
</style>
