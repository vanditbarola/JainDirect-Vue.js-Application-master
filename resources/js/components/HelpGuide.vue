<template>
    <div x-data="app()" x-cloak>
      
        <section class="help_guide_section pt-5 mt-5 pt-xxl-0 pt-xl-0 pt-lg-0 pt-md-0 pb-5 mb-5 ">
            <div class="container">
                <div class="accordion pt-xl-2 pt-xxl-2 pt-md-2 pt-0 pb-3" role="tablist">
                    <b-card-header header-tag="header" class="accordion_div" role="tab">
                        <b-button class="acc_btn" v-b-toggle.accordion-1>Organization Account</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
                        <div class="accordian_boby">
                            <div v-html="text1"></div>
                        </div>
                    </b-collapse>
                    <b-card-header header-tag="header" class="accordion_div" role="tab">
                        <b-button class="acc_btn" v-b-toggle.accordion-2 variant="warning">Bank Account</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                        <div class="accordian_boby">
                            <div v-html="text2"></div>
                        </div>
                    </b-collapse>
                    <b-card-header header-tag="header" class="accordion_div" role="tab">
                        <b-button class="acc_btn" v-b-toggle.accordion-3 variant="warning">QR Code Stickers And Image</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                        <div class="accordian_boby">
                            <div v-html="text3"></div>
                        </div>
                    </b-collapse>
                    <b-card-header header-tag="header" class="accordion_div" role="tab">
                        <b-button class="acc_btn" v-b-toggle.accordion-4 variant="warning">Website</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
                        <div class="accordian_boby">
                            <div v-html="text4"></div>
                        </div>
                    </b-collapse>
                    <b-card-header header-tag="header" class="accordion_div" role="tab">
                        <b-button class="acc_btn" v-b-toggle.accordion-5 variant="warning">Steps For Account Creation and QR code creation</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
                        <div class="accordian_boby">
                            <div v-html="text5"></div>
                        </div>
                    </b-collapse>
                    <b-card-header header-tag="header" class="accordion_div" role="tab">
                        <b-button class="acc_btn" v-b-toggle.accordion-6 variant="warning">Steps To Create Free Website</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-6" accordion="my-accordion" role="tabpanel">
                        <div class="accordian_boby">
                            <div v-html="text6"></div>
                        </div>
                    </b-collapse>
                    <b-card-header header-tag="header" class="accordion_div" role="tab">
                        <b-button class="acc_btn" v-b-toggle.accordion-7 variant="warning">What is the benefits to us?</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-7" accordion="my-accordion" role="tabpanel">
                        <div class="accordian_boby">
                            <div v-html="text7"></div>
                        </div>
                    </b-collapse>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { BButton, BCard, BCardHeader, BCollapse, BCardBody, BCardText } from 'bootstrap-vue';

export default {
    components: {
        BButton,
        BCard,
        BCardHeader,
        BCollapse,
        BCardBody,
        BCardText,
    },
    data() {
        return {
            text1: `
                    <ul class="custom-list">
                        <li class="help_guide_li">Any India based Jain (non-commercial) organization can  register. They need
                                        not be charitable.</li>
                        <li class="help_guide_li">Organization type includes Temples, Dharamshala, Bhoojnalya
                                        associated
                                        with Temple/dharamshala, Education Institutes, Goshala, Old Age homes, Ananth
                                        Ashram, Muni
                                        Sangh, books, etc.</li>
                       <li class="help_guide_li">We are all Jains and we welcome all Jains of all sects.</li>
                        <li class="help_guide_li">Account is free of charge and it is lifetime.</li>
                        <li class="help_guide_li">You will only need to provide Organization name, contact
                                        details, and
                                        bank
                                        account number. All other information is optional. You can add as much information,
                                        now or
                                        later
                                        about your organization. This includes Organization details, Program Details, News,
                                        Events
                                        and
                                        Appeal for Funds.</li>
                        <li class="help_guide_li"> In one login account, you can create one or more
                                        Organization. Each
                                        organization is treated separately and have their own details. No detail of one
                                        organization
                                        is
                                        used in others.</li>
                        </ul>
      `,
      text2:`
      <ul class="custom-list">
                                    <li class="help_guide_li">Bank details include account holder name, account number and
                                        IFSC
                                        code.</li>
                                    <li class="help_guide_li">Bank details are needed to generate QR code.</li>
                                    <li class="help_guide_li">Bank account details are kept private and secure. They are not
                                        disclosed</li>
                                    <li class="help_guide_li">For anyone to make payment, there is no need to enter
                                        organization
                                        bank account details. Just scan QR code and pay.</li>
                                    <li class="help_guide_li">People can either scan the QR code sticker or go to
                                        Organization page
                                        on the website and scan it to make payment.</li>
                                    <li class="help_guide_li">QR code can be shared via Whatsapp, Email etc.</li>
                                    <li class="help_guide_li">No KYC is required.</li>
                                </ul>
      `,
      text3:`
      <ul class="custom-list">
                                    <li class="help_guide_li">A QR code is generated which people can scan and pay money. It
                                        will be
                                        directly deposited to your account.</li>
                                    <li class="help_guide_li">Same QR code will work for payment from Paytm, Gpay, PhonePe
                                        etc. You
                                        don't need a separate account with anyone of them.</li>
                                    <li class="help_guide_li">QR code can be scanned with any mobile payment app including
                                        PayTm,
                                        GPay, PhonePay and many more or bank app. One can then pay it using any means you
                                        want just
                                        like a regular mobile app payment.</li>
                                    <li class="help_guide_li">This feature allows you to accept payment easily at your
                                        premise
                                        without being present or online.</li>
                                    <li class="help_guide_li">This is useful in improving donations as lot of people can't
                                        make
                                        payment via bank or can't come to your organization to pay.</li>
                                    <li class="help_guide_li">There are no transaction charges from us.</li>
                                    <li class="help_guide_li">Your transactions are private and we don't have any record of
                                        who has
                                        paid to you and how much. This is due to fact that we don't get any report from
                                        payment app
                                        or your bank. The details are with known to you and the person paying it.</li>
                                    <li class="help_guide_li">You can order QR code stickers. We will ship the required
                                        quantity by
                                        post to you.</li>
                                </ul>
      `,
      text4:`
      <ul class="custom-list">
                                    <li class="help_guide_li">The account allows you to create a website where you can list
                                        you
                                        organization details, your programs, any events you are having, news you want to
                                        share with
                                        others.</li>
                                    <li class="help_guide_li">You can add text as well as photos with each item.</li>
                                    <li class="help_guide_li">You can as many events, programs and news items.</li>
                                    <li class="help_guide_li">You can also appeal for funds or anything else by posting
                                        appeals. Please
                                        post important appeals and not regular appeals.</li>
                                    <li class="help_guide_li">We can also send automatically all your information to people
                                        whose
                                        contact you have provided. This is very important as it will save you time to do so.
                                        You can
                                        simply provide free list of people and we will keep them UpToDate on anything to do
                                        with your
                                        organization as posted online.</li>
                                    <li class="help_guide_li">You can also share to your contacts QR code along with a
                                        message as many
                                        times as you want. You can do that simply by type a message and pressing send
                                        button.</li>
                                    <li class="help_guide_li">With our free website you can reach a much larger set of
                                        people.</li>
                                    <li class="help_guide_li">You will also get a free web address which you can share with
                                        others.</li>
                                    <li class="help_guide_li">History of all News, Events, Appeals is kept. This becomes a
                                        good
                                        reference for you and others for future use.</li>
                                    <li class="help_guide_li">We plan on adding a lot of new features shortly.</li>
                                    <li class="help_guide_li">It is totally free.</li>
                                </ul>
      `,
      text5:`
      <ul class="custom-list">
                                    <li class="help_guide_li">Create account using email address or phone number.</li>
                                    <li class="help_guide_li">Provide organisation details including name, address, contact person and bank details.</li>
                                    <li class="help_guide_li">We list your organization online and create QR code for you</li>
                                    <li class="help_guide_li">You can now use QR code online and also order Free of charge QR code</li>
                                    <li class="help_guide_li">We ship QR code to you and you can use them at your premise</li>
                                    <li class="help_guide_li">You can also share QR code with people</li>
                                    <li class="help_guide_li">People can pay using QR code and share you the payment confirmation by WhatsApp etc.</li>
                                </ul>
      `,
      text6:`
      <ul class="custom-list">
                                    <li class="help_guide_li">Basic details as provided in Account registration are shown
                                    </li>
                                    <li class="help_guide_li">You can add more details including description of your
                                        organisation, Logo,
                                        photos, programs and videos and events. You can update this information anytime you
                                        want.</li>
                                    <li class="help_guide_li">If your organization is in need of emergency funds then you
                                        can post an
                                        appeal also to request that.</li>
                                    <li class="help_guide_li">All of the abo r information is published on our website</li>
                                    <li class="help_guide_li">If you provide a list of contacts the we can keep them
                                        informed of the
                                        above information. To do so, you need to add list online</li>
                                </ul>
      `,
      text7:`
      <ul class="custom-list">
                                    <li class="help_guide_li">We are doing this as we want to contribute to the society. This is a 100% charity work. There is no financial benefit, directly or indirectly to us.</li>
                                    <li class="help_guide_li">We don't make any money when anyone pays. In fact, all transactions are between an individual bank and organization bank and we are not involved. We are not even aware of any transaction details. It is not possible for us to make money on this.</li>
                                    <li class="help_guide_li">We are investing all the money required for this project.</li>
                                </ul>
      `,
        };
    },
};
</script>


