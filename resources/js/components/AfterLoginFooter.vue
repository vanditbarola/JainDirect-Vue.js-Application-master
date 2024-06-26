<template>
    <section style="background: #2E2E2E 0% 0% no-repeat padding-box;" class="fixed-bottom mt-2 footer_login">
        <div class="container p-2">
            <div class="row g-0 text-xs-center">
                <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                    <label class="footer_login_after">© {{currentDate.getFullYear()}} JainDirect.org
                        | All Rights Reserved.</label>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <label class="footer_login_after">Write to us:<a
                            href="mailto:info@jaindirect.org" class="footer_login_after" style="text-decoration:none;">info@jaindirect.org</a></label>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                    <label style=" font-family: 'Roboto' !important; font-size: 12px;color:#FFC527;">JainDirect.org <span class="footer_login_after">All right Reserved</span></label>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data(){
        return {
            currentDate: new Date,
        }
    }
}
</script>
