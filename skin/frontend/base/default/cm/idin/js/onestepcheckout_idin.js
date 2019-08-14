/**
 * MIT License
 *
 * Copyright (c) 2016 CM Groep
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @category   CMGroep
 * @package    Idin
 * @author     Epartment Ecommerce B.V. <support@epartment.nl>
 * @copyright  2016-2017 CM Groep
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 */
var IdinOneStepCheckout = Class.create();
IdinOneStepCheckout.prototype = {
    initialize: function(idinContainer, idinLoginContainer, form, aboveContainer, requireVerification) {
        this.idinContainer = idinContainer;
        this.idinLoginContainer = idinLoginContainer;
        this.form = form;
        this.aboveContainer = aboveContainer;
        this.requireVerification = requireVerification;

        this.insertIdinContainer();

        if (this.requireVerification) {
            this.disableOneStepCheckout();
        }

        if ($$('.account-login-checkout:not(#' + this.idinLoginContainer + ')').length > 0) {
            $$('.account-login-checkout:not(#' + this.idinLoginContainer + ')')[0].hide();
        }
    },

    /**
     * Inserts the iDIN template above the checkout because
     * of missing layout handles in OneStepCheckout
     */
    insertIdinContainer: function() {
        var element = $(this.idinContainer).remove();
        $(this.aboveContainer).insert({
            before: element
        });

        element.show();

        if ($(this.idinLoginContainer)) {
            var element = $(this.idinLoginContainer).remove();
            $(this.aboveContainer).insert({
                before: element
            });

            element.show();
        }
    },

    toggleLogin: function() {
        $('idin-onestepcheckout-login-wrapper').toggle();
    },

    /**
     * Adds the class for disabling the checkout on CSS level
     */
    disableOneStepCheckout: function() {
        $$('.checkoutcontainer')[0].addClassName('idin-disabled');
    },

    /**
     * Starts the age verification transaction
     */
    start: function() {
        var form = new VarienForm(this.form);

        if (form.validator && form.validator.validate()) {
            $(this.form).submit();
        }
    }
};