<template>
    <section class="section_tab_dashboard_news mt-3">
        <div class="mx-3 pt-3 px-1">
            <label class="dashboard_news_title">Branch</label>
            <button class="dashboard_news_btn" data-bs-toggle="modal" data-bs-target="#AddBranchModal">Add
                Branch</button>
        </div>
        <!--Add branch-->
        <div class="modal " id="AddBranchModal" tabindex="-1" aria-labelledby="AddBranchModalLabel"
            aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <img src="/images/modal_cancel.svg" class="cancel_createmmbr_btn_modal" data-bs-dismiss="modal"
                        aria-label="Close" alt="...">
                    <div class="modal-body">
                        <form class="px-4 mx-4 mt-3 mb-5">
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                    <label for="branchSansthaName" class="create_comitte_member_label">Sanstha name<span
                                            class="required mx-1">*</span></label>
                                    <input type="text" class="form-control mt-2 create_comitte_member_input1"
                                        id="branchSansthaName" placeholder="Enter sanstha name">
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                    <label for="branchUniqueurl" class="create_comitte_member_label">unique url<span
                                            class="required mx-1">*</span></label>
                                    <input type="text" class="form-control mt-2 create_comitte_member_input1"
                                        id="branchUniqueurl" readonly>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                    <label for="branchCategory" class="create_comitte_member_label">Sanstha
                                        Category<span class="required mx-1">*</span></label>
                                    <br><select class="create_comitte_member_input1 mt-2" id="branchCategory">
                                        <option class="create_comitte_member_label" disabled selected hidden
                                            value="Select Category">Select Category</option>
                                        <option class="create_comitte_member_label" value="temple">Temple</option>
                                        <option class="create_comitte_member_label" value="education">Education</option>
                                        <option class="create_comitte_member_label" value="dharamshala">Dharamshala
                                        </option>
                                        <option class="create_comitte_member_label" value="bhojnalya">Bhojnalya</option>
                                        <option class="create_comitte_member_label" value="muniseva">Muni Seva</option>
                                        <option class="create_comitte_member_label" value="orphanage">Orphanage</option>
                                        <option class="create_comitte_member_label" value="oldage">Old Age</option>
                                        <option class="create_comitte_member_label" value="gausala">Gausala</option>
                                    </select>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                    <label for="branchDenomination"
                                        class="create_comitte_member_label">Denomination</label>
                                    <div class="branch_radio_div">
                                        <input class="mediaVisibility_input" type="radio" name="branchdemonination"
                                            id="branchsthanakvasi">
                                        <label class="form-check-label create_comitte_member_label"
                                            for="branchsthanakvasi">sthanakvasi</label>
                                        <br><input class="mediaVisibility_input" type="radio" name="branchdemonination"
                                            id="branchSwethamber">
                                        <label class="form-check-label create_comitte_member_label"
                                            for="branchSwethamber">Shwetamber</label>
                                        <br><input class="mediaVisibility_input" type="radio" name="branchdemonination"
                                            id="branchDogamber">
                                        <label class="form-check-label create_comitte_member_label"
                                            for="branchDogamber">Digambar</label>
                                        <br><input class="mediaVisibility_input" type="radio" name="branchdemonination"
                                            id="branchAny">
                                        <label class="form-check-label create_comitte_member_label"
                                            for="branchAny">Any</label>
                                    </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-4">
                                    <input class="branc_check" type="checkbox" value="" id="BranchCheckBox">
                                    <label class="create_comitte_member_label" for="BranchCheckBox">
                                        Membership Enable
                                    </label>
                                </div>
                                <div class="d-flex mt-4">
                                    <button class="btn profile_edit_pro_btn" type="button"
                                        data-bs-dismiss="modal">CANCEL</button>
                                    <button class="btn ms-3 profile_edit_pro_btn" type="button" data-bs-toggle="modal"
                                        data-bs-target="#branchContactModal">NEXT</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
        <!--branch Contact-->
        <div class="modal fade" id="branchContactModal" tabindex="-1" aria-labelledby="branchContactModalLabel"
            aria-hidden="true"  data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <img src="/images/modal_cancel.svg" class="cancel_createmmbr_btn_modal" data-bs-dismiss="modal"  aria-label="Close"
                       alt="...">
                       
                    <div class="modal-body">
                        <form class="px-4 mx-4 mt-3 mb-5">
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                    <label for="branchMobileNumber" class="create_comitte_member_label">Mobile
                                        Number<span class="required mx-1">*</span></label>
                                    <input type="text" class="form-control mt-2 create_comitte_member_input1"
                                        id="branchMobileNumber" placeholder="Enter mobile number" required>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                    <label for="branchEmail" class="create_comitte_member_label">Email Id<span
                                            class="required mx-1">*</span></label>
                                    <input type="text" class="form-control mt-2 create_comitte_member_input1"
                                        id="branchEmail" placeholder="Enter email" required>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                    <label for="branchAddress" class="create_comitte_member_label">Address<span
                                            class="required mx-1">*</span></label>
                                    <input type="text" class="form-control mt-2 create_comitte_member_input1"
                                        id="branchAddress" placeholder="Enter address" required>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                    <label for="branchCountry" class="create_comitte_member_label">Country<span
                                            class="required mx-1">*</span></label>
                                    <select class="form-select start_date_input" id="branchCountry">
                                        <option class="create_comitte_member_label" value="" disabled selected hidden>Select country</option>
                                        <option class="create_comitte_member_label" value="india">India</option>
                                        <option class="create_comitte_member_label" value="uk">United Kingdom</option>
                                        <option class="create_comitte_member_label" value="us">United states</option>
                                    </select>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                    <label for="branchState" class="create_comitte_member_label">State<span
                                            class="required mx-1">*</span></label>
                                    <select class="form-select start_date_input" id="branchState">
                                        <option class="create_comitte_member_label"  value="" disabled selected hidden>Select state</option>
                                        <option class="create_comitte_member_label" value="karnataka">Karnataka</option>
                                        <option class="create_comitte_member_label" value="kerala">Kerala</option>
                                        <option class="create_comitte_member_label" value="ap">Andra Pradesh</option>
                                        <option class="create_comitte_member_label" value="gujurath">Gujurath</option>
                                    </select>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                    <label for="branchCity" class="create_comitte_member_label">State<span
                                            class="required mx-1">*</span></label>
                                    <select class="form-select start_date_input" id="branchCity">
                                        <option  class="create_comitte_member_label" disabled selected hidden>Select city</option>
                                        <option class="create_comitte_member_label" value="bangalore">bangalore</option>
                                        <option class="create_comitte_member_label"  value="magalore">Mangalore</option>
                                        <option class="create_comitte_member_label" value="mysore">Mysore</option>
                                    </select>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                    <label for="branchPincode" class="create_comitte_member_label">Pincode<span
                                            class="required mx-1">*</span></label>
                                    <input type="text" class="form-control mt-2 create_comitte_member_input1"
                                        id="branchPincode" placeholder="Enter pincode" required>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                    <label for="branchYoutube" class="create_comitte_member_label">
                                        <i class="bi bi-youtube me-1"></i>Youtube</label>
                                    <input type="email" class="form-control mt-2 create_comitte_member_input1"
                                        id="branchYoutube" placeholder="Enter youtube link " >
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                    <label for="branchInstagram" class="create_comitte_member_label">
                                        <i class="bi bi-instagram me-1"></i>Instagram</label>
                                    <input type="email" class="form-control mt-2 create_comitte_member_input1"
                                        id="branchInstagram" placeholder="Enter instagram link " >
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                    <label for="branchFacebook" class="create_comitte_member_label">
                                        <i class="bi bi-facebook me-1"></i>Facebook</label>
                                    <input type="email" class="form-control mt-2 create_comitte_member_input1"
                                        id="branchFacebook" placeholder="Enter facebook link " >
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                    <label for="branchTwitter" class="create_comitte_member_label">
                                        <i class="bi bi-twitter me-1"></i>Twitter</label>
                                    <input type="email" class="form-control mt-2 create_comitte_member_input1"
                                        id="branchTwitter" placeholder="Enter twitter link " >
                                </div>
                                <div class="d-flex mt-4">
                                    <button class="btn profile_edit_pro_btn" type="button" >CLEAR</button>
                                    <button class="btn ms-3 profile_edit_pro_btn" type="button" >SUBMIT</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </section>

</template>