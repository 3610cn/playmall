<!-- target: experienceListPage -->
    <div class="crumb">
        <span class="title">| ${desc}</span>
        <button data-ui="type:Button;variants:create;id:createButton;" class="list-button-add"><span class="ui-icon-plus"></span>发布活动</button>
    </div>
    <div class="container list">
        <!-- import: experienceList -->
    </div>

<!-- target: experienceList -->
<div data-ui-type="Table" data-ui-id="list" data-ui-datasource="@list.data" data-ui-extension-command-type="Command">
</div>


<!-- target: couponAction -->
 <div data-ui-type="Panel" 
    data-ui-id="coupon-action-wrapper"
    data-ui-hidden="hidden">
    <div data-ui-type="ActionPanel"
        data-ui-action-options="@actionOptions"
        data-ui-id="coupon-binder" 
        data-ui-url="@url"></div>
    <button id="actionAddSubmit" data-ui-type="Button"
        data-ui-skin="spring" data-ui-id="addSubmit" type="submit">提交</button>
    <div id="actionAddCancel" data-ui-type="Button" data-ui-id="addCancel"
        data-ui-skin="link">取消</div>
</div>
