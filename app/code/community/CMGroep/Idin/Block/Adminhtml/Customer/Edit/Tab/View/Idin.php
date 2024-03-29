<?php
/**
 * MIT License
 *
 * Copyright (c) 2017 CM Groep
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
class CMGroep_Idin_Block_Adminhtml_Customer_Edit_Tab_View_Idin extends Mage_Adminhtml_Block_Template
{
    protected $_customer;

    /**
     * Retrieves current customer
     *
     * @return Mage_Customer_Model_Customer
     */
    public function getCustomer()
    {
        if (!$this->_customer) {
            $this->_customer = Mage::registry('current_customer');
        }

        return $this->_customer;
    }

    /**
     * Returns true if age has been verified
     *
     * @return bool
     */
    public function getCustomerAgeVerified()
    {
        return $this->getCustomer()->getIdinAgeVerified() == 1;
    }

    /**
     * Returns true if the customer is connected with iDIN
     *
     * @return bool
     */
    public function getCustomerIdinConnected()
    {
        return empty($this->getCustomer()->getIdinBin()) == false;
    }

    /**
     * Injects extra CSS file, only on the customer edit page
     *
     * @return Mage_Core_Block_Abstract
     */
    protected function _prepareLayout()
    {
        $this->getLayout()->getBlock('head')->addCss('cm/idin/css/support.css');
        return parent::_prepareLayout();
    }

    /**
     * Only render the block when iDIN data is available
     *
     * @return string
     */
    public function _toHtml()
    {
        if ($this->getCustomerIdinConnected() || $this->getCustomerAgeVerified()) {
            return parent::_toHtml();
        }
    }
}