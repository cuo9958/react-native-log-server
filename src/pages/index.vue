<template>
  <div class="main">
    <div class="list-box">
      <div class="box-title">
        错误<Badge class="title-tip" :count="errCount"></Badge>
      </div>
      <Collapse accordion>
        <Panel v-for="(item,index) of errList" :key="index">
           {{item.data[0]}}{{item.time}}
            <p slot="content" class="txts">
              {{JSON.stringify(item)}}
            </p>
           </Panel>
    </Collapse>
    </div>
    <div class="list-box">
      <div class="box-title">
        警告<Badge class="title-tip" :count="warmCount"></Badge>
      </div>
      <Collapse accordion>
        <Panel v-for="(item,index) of warmList" :key="index">
            {{item.data[0]}}}{{item.time}}
            <p slot="content" class="txts">
              {{JSON.stringify(item)}}
            </p>
            </Panel>
    </Collapse>
    </div>
    <div class="list-box">
      <div class="box-title">
        消息<Badge class="title-tip" :count="infoCount"></Badge>
      </div>
      <Collapse accordion>
       <Panel v-for="(item,index) of infoList" :key="index">
            {{item.data[0]}}{{item.time}}
            <p slot="content" class="txts">
              {{JSON.stringify(item)}}
            </p>
        </Panel>
    </Collapse>
    </div>
    <!-- <Button @click="test" type="primary">测试</Button> -->
  </div>
</template>

<script>
import socketio from "socket.io-client";
export default {
  name: "index",
  data() {
    return {
      errList: [],
      errCount: 0,
      warmList: [],
      warmCount: 0,
      infoList: [],
      infoCount: 0
    };
  },
  async mounted() {
    const socketuri=window.location.origin;
    // const socketuri = "http://120.78.57.59:3000";
    // const socketuri = "http://127.0.0.1:8090";
    var socket = socketio(socketuri, {
      query: {
        token: "client"
      }
    });
    socket.on("info", data => {
      data.time = new Date();
      this.infoList.unshift(data);
      this.infoCount++;
    });
    socket.on("warm", data => {
      data.time = new Date();
      this.warmList.unshift(data);
      this.warmCount++;
    });
    socket.on("err", data => {
      data.time = new Date();
      this.errList.unshift(data);
      this.errCount++;
    });
    this.refresh();
  },
  methods: {
    async refresh() {},
    test() {
      fetch("http://127.0.0.1:8090/info?id=1");
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
  max-width: 30%;
}
.box-title {
  padding: 10px;
}
.title-tip {
  float: right;
}
.txts{
  word-break: break-all;
}
</style>
