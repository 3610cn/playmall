<!-- target: userForm -->
<div class="crumb">
    <span class="title">| 用户管理 > <!-- if: ${formType} === 'create' -->新增<!-- else: -->编辑<!-- /if -->用户</span>
</div>

<div data-ui-id="form" data-ui-type="Form" data-ui-submit-button="submit" data-ui-auto-validate="true" class="container">
    <div class="form">

        <div class="row">
            <div class="field-name">用户名</div>
            <div class="field-value">
                <div class="ui-textbox" data-ui="id:username;name:username;type:TextBox;width:200;value:@data.username;required:required;">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="field-name">手机号</div>
            <div class="field-value">
                <div class="ui-textbox" data-ui="id:phone;name:phone;type:TextBox;width:160;value:@data.phone;required:required;">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="field-name">角色</div>
            <div class="field-value">
                <div data-ui="type:Select;id:role;width:200;datasource:@roleList;value:@data.role"></div>
            </div>
        </div>

        <div class="row">
            <div class="field-name">密码</div>
            <div class="field-value">
                <input type="password" class="ui-textbox" data-ui="id:password;name:password;type:TextBox;width:200;value:@data.password;required:required;" />
            </div>
        </div>

        <div class="row">
            <div class="field-name">重复密码</div>
            <div class="field-value">
                <input type="password" class="ui-textbox" data-ui="name:confirmPassword;type:TextBox;width:200;value:@data.password;required:required;" />
            </div>
        </div>

        <div class="row">
            <div class="field-value">
                <button data-ui="type:Button;variants:submit;id:submit;group:submit;" class="ui-large"><span class="ui-icon-check"></span>确认提交</button>
            </div>
        </div>

    </div>
</div>
