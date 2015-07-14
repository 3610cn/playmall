<!-- target: experienceListPage -->
    <!-- import: nav -->
    <div class="title-wrapper">
        <div class="title">
            <h2>活动列表</h2>
        </div>
    </div>

    <div class="container list">
        <button data-ui="type:Button;variants:primary;id:createButton;" class="ui-large list-button-add"><span class="ui-icon-plus"></span> 新增活动</button>
        <!-- import: experienceList -->
    </div>

<!-- target: experienceList -->
<div data-ui-type="Table" data-ui-id="list" data-ui-datasource="@list.data" data-ui-extension-command-type="Command">
</div>
