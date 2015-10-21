<!-- target: shopForm -->
<div class="crumb">
    <span class="title">| 店铺管理 > <!-- if: ${formType} === 'create' -->新增<!-- else: -->编辑<!-- /if -->店铺</span>
</div>

<div data-ui-id="form" data-ui-type="Form" data-ui-submit-button="submit" data-ui-auto-validate="true" class="container">
    <div class="form">

        <div class="row">
            <div class="field-name">店铺名</div>
            <div class="field-value">
                <div class="ui-textbox" data-ui="id:name;name:name;type:TextBox;width:200;value:@data.name;required:required;">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="field-name">店铺logo</div>
            <div class="field-value" style="height:auto;">
                <div id="preview" class="preview preview-horizontal"></div>
                <div class="uploader-detail">
                    <div type="file"
                        data-ui-id="uploader"
                        data-ui-type="Uploader"
                        data-ui-action="@data.uploadUrl"
                        data-ui-file-type="auto"
                        data-ui-name="logo"
                        data-ui-text="&lt;span class='ui-icon-upload'&gt;&lt;/span&gt; 上传LOGO"
                        title="上传LOGO"
                        accept=".gif,.jpg,.png"
                    ></div>
                    <p class="uploader-desc">
                        1.图片尺寸不低于400*200，推荐800*400
                        <br>
                        2.单张图片大小不超过300k
                     </p>
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
            <div class="field-name">购物中心</div>
            <div class="field-value">
                <div data-ui="type:Select;id:city;width:200;datasource:@cityList;value:@data.city"></div>
                <div data-ui="type:Select;id:mall;name:mallid;width:200;datasource:@mallList;value:@data.mall;required:required;"></div>
            </div>
        </div>

        <div class="row">
            <div class="field-name">地址</div>
            <div class="field-value">
                <div class="ui-textbox" data-ui="id:address;name:address;type:TextBox;width:300;value:@data.address;required:required;">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="field-value">
                <button data-ui="type:Button;variants:submit;id:submit;group:submit;" class="ui-large"><span class="ui-icon-check"></span>确认提交</button>
            </div>
        </div>

    </div>
</div>
