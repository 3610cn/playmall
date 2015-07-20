<!-- target: freshForm -->
    <div class="title-wrapper">
        <div class="title">
            <h2>发布抢鲜</h2>
        </div>
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
                    <div data-ui="type:Select;id:mall;name:mall;width:200;datasource:@data.mallList;"></div>
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
                <div class="field-name">活动详情</div>
                <div class="field-value detail" style="height:auto;">
                    <div data-ui="type:UMEditor;id:content;name:content;required:required;width:90%;height:600;content:@data.content;"></div>
                </div>
            </div>

        </div>

        <p class="submit">
            <button data-ui="type:Button;variants:danger;id:submit;" class="ui-large"><span class="ui-icon-check"></span>确认提交</button>
        </p>
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
