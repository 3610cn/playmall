<!-- target: experienceListPage -->
    <div class="container list">
        <button data-ui="type:Button;variants:primary;id:createButton;" class="ui-large list-button-add"><span class="ui-icon-plus"></span> 新增活动</button>
        <!-- import: experienceList -->
    </div>

<!-- target: experienceList -->
<div data-ui-type="Table" data-ui-id="list" data-ui-datasource="@list.data" data-ui-extension-command-type="Command">
</div>


<!-- target: coupleAction -->
 <div data-ui-type="Panel" 
    data-ui-id="couple-action-wrapper"
    data-ui-hidden="hidden">
    <div data-ui-type="ActionPanel"
        data-ui-action-options="@actionOptions"
        data-ui-id="couple-binder" 
        data-ui-url="@url"></div>
    <button id="actionAddSubmit" data-ui-type="Button"
        data-ui-skin="spring" data-ui-id="addSubmit" type="submit">提交</button>
    <div id="actionAddCancel" data-ui-type="Button" data-ui-id="addCancel"
        data-ui-skin="link">取消</div>
</div>
