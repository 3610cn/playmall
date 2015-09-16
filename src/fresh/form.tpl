<!-- target: freshForm -->
    <div class="crumb">
        <span class="title">| 抢鲜 > 发布活动</span>
    </div>

    <div data-ui-id="form" data-ui-type="Form" data-ui-submit-button="submit" data-ui-auto-validate="true" class="container">
        <div class="form">

            <div class="row">
                <div class="field-name">活动名称</div>
                <div class="field-value">
                    <div class="ui-textbox" data-ui="id:title;name:title;type:TextBox;width:500;value:@data.title;required:required;">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="field-name">开始时间</div>
                <div class="field-value">
                    <div data-ui="type:Calendar;id:startDate;name:startDate;value:@data.startDate;"></div>
                    <div data-ui="type:Select;id:startTime;width:140;datasource:@timeList;value:@data.startTime;" name="startTime"></div>
                </div>
            </div>

            <div class="row">
                <div class="field-name">结束时间</div>
                <div class="field-value">
                    <div data-ui="type:Calendar;id:endDate;name:endDate;value:@data.endDate;"></div>
                    <div data-ui="type:Select;id:endTime;width:140;datasource:@timeList;value:@data.endTime;" name="endTime"></div>
                </div>
            </div>

            <div class="row">
                <div class="field-name">活动地点</div>
                <div class="field-value">
                    <div data-ui="type:Select;id:city;width:200;datasource:@cityList;<!-- if: ${user.role} !== 'admin' -->readOnly:readOnly;<!-- /if -->value:@data.city"></div>
                    <div data-ui="type:Select;id:mall;name:mall;width:200;datasource:@mallList;<!-- if: ${user.role} !== 'admin' -->readOnly:readOnly;<!-- /if -->value:@data.mall"></div>
                    <div data-ui="type:Select;id:shop;name:shop;width:200;datasource:@shopList;<!-- if: ${user.role} !== 'admin' -->readOnly:readOnly;<!-- /if -->value:@data.shop;required:required;"></div>
                </div>
            </div>

            <div class="row">
                <div class="field-name">限制人数</div>
                <div class="field-value">
                    <div class="ui-textbox" data-ui="id:count;name:count;type:TextBox;width:120;value:@data.count;required:required;">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="field-name">活动图片</div>
                <div class="field-value" style="height:auto;">
                    <div type="file"
                        data-ui-id="uploader"
                        data-ui-type="Uploader"
                        data-ui-action="@data.uploadUrl"
                        data-ui-file-type="auto"
                        data-ui-name="upload"
                        data-ui-text="&lt;span class='ui-icon-upload'&gt;&lt;/span&gt; 上传文件"
                        title="上传图片"
                        accept=".gif,.jpg,.png"
                    ></div>
                    <div class="fresh-image-list" data-ui="id:imageList;name:imageList;type:ImageList;datasource:@data.imageList;">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="field-name">活动详情</div>
                <div class="field-value detail" style="height:auto;">
                    <div data-ui="type:UMEditor;id:content;name:content;width:90%;height:600;content:@data.content;"></div>
                </div>
            </div>

            <div class="row">
                <div class="field-value">
                    <button data-ui="type:Button;variants:submit;id:submit;group:submit;" class="ui-large"><span class="ui-icon-check"></span>确认提交</button>
                </div>
            </div>
        </div>
    </div>

<!-- target: verifyFreshForm -->
    <div data-ui-id="form" data-ui-type="Form" data-ui-submit-button="submit" data-ui-auto-validate="true" class="container verify-container">
        <div class="form">

            <div class="row">
                <div class="field-value">
                    <div class="ui-textbox" data-ui="id:code;name:code;type:TextBox;width:500;required:required;placeholder:请输入验证码;"></div><span id="verifyMessage" class="verify-message"></span><button data-ui="type:Button;variants:danger;id:submit;" class="ui-large" style="margin-left: 30px;"><span class="ui-icon-check"></span>确定</button>
                </div>
            </div>
        </div>

    </div>
