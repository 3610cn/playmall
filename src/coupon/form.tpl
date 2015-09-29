<!-- target: couponForm -->
    <div class="crumb">
        <span class="title">| 优惠  > <!-- if: ${formType} === 'create' -->新增<!-- else: -->编辑<!-- /if -->优惠</span>
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
                    <div data-ui="type:Select;id:city;width:200;datasource:@cityList;value:@data.city"></div>
                    <div data-ui="type:Select;id:mall;name:mall;width:200;datasource:@mallList;value:@data.mall"></div>
                    <div data-ui="type:Select;id:shop;name:shop;width:200;datasource:@shopList;value:@data.shop;required:required;"></div>
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
