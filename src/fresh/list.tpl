<!-- target: freshListPage -->
    <div class="crumb">
        <span class="title">| 抢鲜</span>
        <button data-ui="type:Button;variants:create;id:createButton;" class="list-button-add"><span class="ui-icon-plus"></span>新增抢鲜</button>
        <button data-ui="type:Button;variants:create;id:verifyButton;" class="list-button-add"><span class="ui-icon-check"></span>核销抢鲜码</button>
    </div>
    <div class="container list">
        <!-- import: freshList -->
    </div>

<!-- target: freshList -->
<div data-ui-type="Table" data-ui-id="list" data-ui-datasource="@list.data" data-ui-extension-command-type="Command">
</div>
