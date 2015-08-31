<!-- target: freshListPage -->
    <div class="container list">
        <button data-ui="type:Button;variants:primary;id:createButton;" class="ui-large list-button-add"><span class="ui-icon-plus"></span> 新增抢鲜</button>
        <button data-ui="type:Button;variants:success;id:verifyButton;" class="ui-large list-button-add"><span class="ui-icon-check"></span>核销抢鲜码</button>
        <!-- import: freshList -->
    </div>

<!-- target: freshList -->
<div data-ui-type="Table" data-ui-id="list" data-ui-datasource="@list.data" data-ui-extension-command-type="Command">
</div>
