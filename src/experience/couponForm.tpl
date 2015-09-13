<!-- target: couponFormMain -->
    <div data-ui-id="form" data-ui-type="Form" data-ui-submit-button="submit" data-ui-auto-validate="true" class="coupon-container">
        <div class="form">

            <div class="row">
                <div class="field-name">选择优惠</div>
                <div class="field-value">
                    <div data-ui="type:Select;id:couponList;width:250;datasource:@data.couponList;value:@couponId" name="cid">
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
