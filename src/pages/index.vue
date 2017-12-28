<template>
  <div class="main">
    <div class="setting">
      <Form  label-position="right" :label-width="1" style="width:300px">
          <FormItem>
              <Row>
                <Col span="18">
                <Input v-model="formData.name" placeholder="请填写拦截值"></Input>
                </Col>
                <Col span="4" offset="1">
                <Button @click="addName" type="primary">添加</Button>
                </Col>
              </Row>
          </FormItem>
      </Form>
      <Table stripe :columns="columns" :data="namelist"></Table>
    </div>
    <div class="list-box">
      <Form  label-position="right" :label-width="1" >
        <FormItem>
              <Row>
                <Col span="9">
                <Input v-model="formData.tag" placeholder="过滤tag"></Input>
                </Col>
                <Col span="9" offset="1">
                <Input v-model="formData.ip" placeholder="过滤ip"></Input>
                </Col>
                <Col span="4" offset="1">
                <Button @click="start" type="primary">清除日志</Button>
                </Col>
              </Row>
          </FormItem>
      </Form>
      <Tabs type="card">
        <TabPane :label="'错误:'+errCount" name="name1">
          <Collapse accordion>
              <Panel v-for="(item,index) of errList" :key="index">
              {{item.name}}@{{item.date|format}};ip:{{item.ip}}
                <p slot="content" class="txts">
                  请求地址:{{item.url}}<br />
                  {{JSON.stringify(item.header)}}
                  <Button @click="see(item.id)" size="small" type="primary">查看数据</Button>
                </p>
              </Panel>
        </Collapse>
        </TabPane>
        <TabPane :label="'警告:'+warmCount" name="name2">
          <Collapse accordion>
            <Panel v-for="(item,index) of warmList" :key="index">
                {{item.name}}@{{item.date|format}};ip:{{item.ip}}
                <p slot="content" class="txts">
                  请求地址:{{item.url}}<br />
                  {{JSON.stringify(item.header)}}
                  <Button @click="see(item.id)" size="small" type="primary">查看数据</Button>
                </p>
                </Panel>
        </Collapse>
        </TabPane>
        <TabPane :label="'消息:'+infoCount" name="name3">
          <Collapse accordion>
            <Panel v-for="(item,index) of infoList" :key="index">
                  {{item.name}}@{{item.date |format}};ip:{{item.ip}}
                  <p slot="content" class="txts">
                    请求地址:{{item.url}}<br />
                  {{JSON.stringify(item.header)}}
                  <Button @click="see(item.id)" size="small" type="primary">查看数据</Button>
                  </p>
              </Panel>
          </Collapse>
        </TabPane>
    </Tabs>
    </div>
  </div>
</template>

<script>
import socketio from "socket.io-client";
import request from "../common/request";

// const test_url = "http://127.0.0.1:8090/api";
const test_url = "api";
const socketuri = window.location.origin + window.location.pathname;
// const socketuri = "http://l-php40.ops.bj2.daling.com:8002";
// const socketuri = "http://127.0.0.1:8090";

let socket_path = "/socket.io";
let socket;
if (window.location.pathname.indexOf("rnmonitor") >= 0) {
  socket_path = "/rnmonitor/socket.io";
}
export default {
  name: "index",
  data() {
    return {
      errList: [],
      errCount: 0,
      warmList: [],
      warmCount: 0,
      infoList: [],
      infoCount: 0,
      formData: {
        name: "",
        tag: "",
        ip: ""
      },
      columns: [
        {
          title: "name",
          key: "name"
        },
        {
          title: "Action",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "Delete"
              )
            ]);
          }
        }
      ],
      namelist: []
    };
  },
  async mounted() {
    this.refresh();
    socket = socketio(socketuri, {
      path: socket_path,
      query: {
        token: "client"
      }
    });
    socket.on("info", data => {
      if (this.formData.tag && data.header.name != this.formData.tag) return;
      if (this.formData.ip && data.ip.indexOf(this.formData.ip) < 0) return;
      console.log(data);
      this.infoList.unshift(data);
      if (this.infoList.length > 99) {
        this.infoList.pop();
      } else {
        this.infoCount++;
      }
    });
    socket.on("warm", data => {
      if (this.formData.tag && data.header.name != this.formData.tag) return;
      if (this.formData.ip && data.ip.indexOf(this.formData.ip) < 0) return;
      console.log(data);
      this.warmList.unshift(data);
      if (this.warmList.length > 99) {
        this.warmList.pop();
      } else {
        this.warmCount++;
      }
    });
    socket.on("err", data => {
      if (this.formData.tag && data.header.name != this.formData.tag) return;
      if (this.formData.ip && data.ip.indexOf(this.formData.ip) < 0) return;
      console.log(data);
      this.errList.unshift(data);
      if (this.errList.length > 99) {
        this.errList.pop();
      } else {
        this.errCount++;
      }
    });
  },
  methods: {
    async refresh() {
      let res = await request.getJson(test_url + "/get");
      this.namelist = res.data;

      let msgs = await request.getJson(test_url + "/getlist");
      for (let index = 0; index < msgs.data.length; index++) {
        const item = msgs.data[index];
        item.time = new Date();
        this.infoList.unshift(item);
      }
      this.infoCount += msgs.data.length;
    },
    //clear
    start() {
      this.errList = [];
      this.warmList = [];
      this.infoList = [];
    },
    async addName() {
      if (!this.formData.name) return;
      let res = await request.getJson(
        test_url + "/set?name=" + this.formData.name
      );
      this.namelist.push({ name: this.formData.name });
      this.formData.name = "";
    },
    remove(index) {
      var name = this.namelist.splice(index, 1);
      request.getJson(test_url + "/del?name=" + name[0].name);
    },
    async see(id) {
      let res = await request.getJson(test_url + "/getData?id=" + id);
      if (res && res.code == 1) {
        this.$Modal.info({
          title: "数据",
          content: JSON.stringify(res.data)
        });
      }
    }
  },
  filters: {
    format(v) {
      var v = new Date(v);
      let str = "yyyy-MM-dd hh:mm:ss";
      str = str.replace("yyyy", v.getFullYear());
      str = str.replace("MM", v.getMonth() + 1);
      str = str.replace("dd", v.getDate());
      str = str.replace("hh", v.getHours());
      str = str.replace("mm", v.getMinutes());
      str = str.replace("ss", v.getSeconds());
      return str;
    }
  }
};
</script>

<style scoped>
.main {
  display: flex;
  padding: 10px;
}
.list-box {
  flex: 1;
  margin: 0 5px;
  max-width: 70%;
}
.box-title {
  padding: 10px;
}
.title-tip {
  float: right;
}
.txts {
  word-break: break-all;
}
.setting {
  width: 300px;
}
</style>
