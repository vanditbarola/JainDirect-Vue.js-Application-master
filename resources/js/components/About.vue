<template>
   <section class="mt-4 pt-5 pb-5" style="background-color: #F8F8F8;">
        <div class="container">
            <label class="section_header m-2 px-2">About Us</label>
            <div class="card m-2 mt-3 mb-3 p-4 about_card1">
                <div class="row g-0">
                    <div class="col-md-4 col-lg-4 col-xl-4 col-xxl-4 col-sm-12 col-xs-12">
                        <img src="images/jd_logo_new.png" class="img-fluid about_img1" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="about2 p-3">
                            "JainDirect is a project - Of the Jains, By the Jains and For the Jains", which has been
                            pioneered with a vision to provide free lifetime online presence to each and every non
                            commercial Jain organization which includes any Jain Temple, Dharamshala, Bhoojnalya
                            associated with Temple/Dharamshala, Educational Institute, Goshala, Old Age home, Anath
                            Ashram, Muni Sangh, etc..
                        </div>
                    </div>
                </div>
            </div>
            <div class="card m-2 mt-4 mb-3 p-4 about_card1">
                <div class="row g-1">
                    <div class="col-md-4 col-lg-4 col-xl-4 col-xxl-4 col-sm-12 col-xs-12">
                        <img src="images/trust_photo.png" class="img-fluid about_img1" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="about2 p-3">
                            The institution behind this Nobel cause is "Vineet Jain Charitable Trust” which has its
                            presence in NCR and Bangalore. It has been providing support financial as well as non
                            financial support to many Jain organizations. This Trust is a pure social endeavor to make
                            world a better place. The Trust plans on taking many projects to help the society and do
                            charity work.
                        </div>
                    </div>
                </div>
            </div>
            <div class="card m-2 mt-4 mb-3 p-4 about_card1">
                <div class="row g-1">
                    <div class="col-md-4 col-lg-4 col-xl-4 col-xxl-4 col-sm-12 col-xs-12">
                        <img src="/images/vineet-photo.jpg" class="img-fluid about_img1" alt="..."  data-toggle="tooltip" title="Vineet Jain" >
                    </div>
                    <div class="col-md-8">
                        <div class="about2 p-3">
                            Vineet Jain, who has done his B.Tech and M.Tech in computer science and engineering from
                            IIT, came up with this vision to provide a latest technology based online platform wherein
                            all Jain organizations take benefits of the technology. He currently runs his own IT company
                            in Bangalore. He believes in giving back to the society and is very keen to help the Jain
                            community, esp. by using his technological expertise. He is a member of JITO and Rotary
                            Club. He is involved in many charitable projects and he was also part of a team which won
                            Guinness World Record for one of the charitable projects.
                            <br>
                            <br>
                            Remarkably, Vineet Jain has been accredited with numerous achievements towards his
                            dedication for the Jain society. He has published a report on the preservation of Jain
                            manuscripts that was inaugurated by the President of India in 1994 during Shravanabelagola
                            Mahamastakabhisheka. He had also developed a software for computerization of booking
                            software in that Mahamastakabhisheka, but it was not used. He also did research work on
                            Ancient Indian language computerization at C-DAC, Pune, and IIT Bombay.
                            <br>
                            <br>
                            Vineet Jain and his family lives by the values of Jain religion and follows the legacy and
                            teachings of his Grand Father "Shri Radha Mohan Jain" who managed the working of Shri
                            Digambar Jain Naya Mandir Ji, Dharam Pura, Chandni Chowk, Delhi and was also associated with
                            Shri Digambar Jain Lal Mandir Ji, Chandni Chowk, Delhi for many years.
                        </div>
                    </div>
                </div>
            </div>

            <div class="row g-3">
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <div class="card h-100 mission_card m-3">
                        <label class="mission_card_head p-2 pt-4">Our Mission</label>
                        <div class=" mission_card_body p-4">
                            We are doing this to enable all Jain Organizations to take advantage of technology in the
                            simplest and absolutely free of cost. We want to contribute to the Jain society. This is
                            100% charity work. There are no financial benefits, directly or indirectly to us.
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <div class="card h-100 appeal_card m-3">
                        <label class="appeal_card_head p-2 pt-4">Our Appeal</label>
                        <div class="appeal_card_body p-4">
                           We appeal to every Jain Organization and all Jain to come forward and be a part of this revolutionary mission.
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                    <div class="card h-100 vission_card m-3">
                        <label class="vission_card_head p-2 pt-4">Our Vission</label>
                        <div class="vission_card_body p-4">
                            Provide a world-class latest technology-enabled platform for Jain Organizations and bring them under one roof. Everything to do with Jainism is under one roof and available to everyone. Provide everything free of cost.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: "App",
    data() {
        return {
            token: localStorage.getItem('storeToken'),
        };
    },
    beforeMount(){
        if(!this.token){
            localStorage.removeItem('storeMobile');
            localStorage.removeItem('storeEmail');
        }
    }
}
</script>
