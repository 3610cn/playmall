<!-- target: coupleFormMain -->
    <div data-ui-id="form" data-ui-type="Form" data-ui-submit-button="submit" data-ui-auto-validate="true" class="couple-container">
        <div class="form">

            <div class="row">
                <div class="field-name">优惠内容</div>
                <div class="field-value">
                    <div class="ui-textbox" data-ui="id:content;name:content;type:TextBox;mode:textarea;width:300;height:100;value:@data.content;required:required;">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="field-name">优惠名额</div>
                <div class="field-value">
                    <div class="ui-textbox" data-ui="id:count;name:count;type:TextBox;width:300;value:@data.count;required:required;">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="field-value">
                    <button data-ui="type:Button;variants:submit;id:submit;" class="ui-large"><span class="ui-icon-check"></span>确认提交</button>
                </div>
            </div>
        </div>
    </div>
