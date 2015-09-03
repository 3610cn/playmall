<!-- target: nav -->
<div data-ui-type="Tab" data-ui-id="nav" data-ui-height="500" data-ui-variants="align-left vertical">
    <ul data-role="navigator">
        <li class="experience">体验</li>

        <!-- if: ${role} === 'admin' || ${role} === 'shop' -->
        <li class="fresh">抢鲜</li>
        <!-- /if -->

        <!-- if: ${role} === 'admin' -->
        <li class="bigshot">大咖</li>
        <!-- /if -->

    </ul>
</div>
<!--
<div class="ui-tab-content ui-tab-content-top-border">
<div class="ui-tab-panel" title="tab1" id="a">我是Tab1</div>
<div class="ui-tab-panel" title="tab2" id="b">我是Tab2</div>
<div class="ui-tab-panel" title="tab3" id="c">我是Tab3</div>
</div>商户不能编辑大咖
loki(2235240071) 9:43:00 
三个角色
商户   编辑抢鲜，体验
商圈   编辑体验
管理员  都可以编辑
-->
