<!-- target: userListPage -->
    <div class="crumb">
        <span class="title">| 用户管理</span>
        <button data-ui="type:Button;variants:create;id:createButton;" class="list-button-add"><span class="ui-icon-plus"></span>新增用户</button>
    </div>
    <div class="container list">
        <!-- import: userList -->
    </div>

<!-- target: userList -->
<div data-ui-type="Table" data-ui-id="list" data-ui-datasource="@list.data" data-ui-extension-command-type="Command">
</div>
