<template>
  <div class="main">
    <div class="list-box">
      <div class="box-title">
        错误<Badge class="title-tip" :count="errCount"></Badge>
      </div>
      <Collapse accordion>
        <Panel v-for="(item,index) of errList" :key="index">
            史蒂夫·乔布斯
            <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
        </Panel>
    </Collapse>
    </div>
    <div class="list-box">
      <div class="box-title">
        警告<Badge class="title-tip" :count="warmCount"></Badge>
      </div>
      <Collapse accordion>
        <Panel v-for="(item,index) of warmList" :key="index">
            史蒂夫·乔布斯
            <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
        </Panel>
    </Collapse>
    </div>
    <div class="list-box">
      <div class="box-title">
        消息<Badge class="title-tip" :count="infoCount"></Badge>
      </div>
      <Collapse accordion>
       <Panel v-for="(item,index) of infoList" :key="index">
            史蒂夫·乔布斯
            <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
        </Panel>
    </Collapse>
    </div>

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
    // const socketuri=window.location.origin;
    const socketuri = "http://120.78.57.59:3000";
    var socket = socketio(socketuri, {
      query: {
        token: "client"
      }
    });
    socket.on("connect", function() {});
    this.refresh();
  },
  methods: {
    async refresh() {}
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
}
.box-title {
  padding: 10px;
}
.title-tip {
  float: right;
}
</style>
