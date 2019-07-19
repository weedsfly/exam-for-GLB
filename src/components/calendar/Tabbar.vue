<template>
    <div class="tabbar">
        <ul>
            <li><i class="icon-work"></i>工作</li>
            <li><i class="icon-role"></i>角色</li>
            <li><i class="icon-things"></i>事项圈</li>
            <li><i class="icon-workmate"></i>同事</li>
            <li class="isActive"><i class="icon-calendar"></i>日历</li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'Tabbar',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.tabbar {
    position: fixed;
    z-index: 10;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: #fff;
    box-shadow:0 0 5px #ccc;
    border-top: 1px solid #eee;
    ul {
        display: flex;
        li {
            flex: 1;
            text-align: center;
            color: #bcbcbc;
            font-size: 12px;
            font-weight: bold;
            padding-top: 3px;
            &.isActive {
                color: #2a579a;
            }
            i {
                display: block;
                margin: 0 auto;
                width: 26px;
                height: 26px;
                &.icon-work {
                    background: url(../../assets/images/icon-work.png);
                    background-size: cover;
                }
                &.icon-role {
                    background: url(../../assets/images/icon-role.png);
                    background-size: cover;
                }
                &.icon-things {
                    background: url(../../assets/images/icon-things.png);
                    background-size: cover;
                }
                &.icon-workmate {
                    background: url(../../assets/images/icon-workmate.png);
                    background-size: cover;
                }
                &.icon-calendar {
                    background: url(../../assets/images/icon-calendar.png);
                    background-size: cover;
                }
            }
        }
    }
}
</style>
