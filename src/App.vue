<template>
  <div class="layout" id="app">
    <div class="nav">
      <div class="layout-logo">
      </div>
      
    </div>
    <div class="layout-content">
      <Row type="flex" style="height:100%">
        <Col span="5" class="menu">
        <Menu active-name="1" theme="dark" width="auto" :open-names="['1']">
          <MenuItem name="1">
          <Icon type="ios-analytics"></Icon>
          全局监控
          </MenuItem>
          <Submenu name="2">
            <template slot="title">
          <Icon type="ios-keypad">
          </Icon>
          用户管理
</template>
                            <MenuItem name="2-1">用户信息</MenuItem>
                        </Submenu>
                    </Menu>
                </Col>
                <Col span="19">
                    <router-view/>
                </Col>
          </Row>
        </div>
        <div class="layout-copy">
            2011-2016 &copy; TalkingData
        </div>
  </div>           
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background: #efefef;
}
#app {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
}
.nav {
  height: 50px;
  background: #1c2438;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 10px;
  left: 20px;
}
.layout-content {
  flex: 1;
  min-height: 200px;
  margin: 0;
  overflow: hidden;
  background: #fff;
  position: relative;
}
.menu {
  background: #495060;
}
.layout-content-main {
  padding: 10px;
}
.layout-copy {
  text-align: center;
  padding: 5px 0;
  color: #9ea7b4;
}
</style>
