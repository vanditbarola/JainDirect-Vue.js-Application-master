<template>
  <section>
    <div class="container">
      <div class="card mb-8 mt-4"
        style="background: #FFFFFF 0% 0% no-repeat padding-box; box-shadow: 0px 3px 6px #00000029;   border: 1px solid #D8D8D8;  border-radius: 5px;">
        <div class="row row-cols-2">
          <div class="col-sm-7 col-xs-7 col-md-7 col-lg-9 col-xl-9 col-xxl-9" id="folder_left">
            <div class="latest_news px-4 mt-2">
              <label class="section_header">Library</label>
              <label class="section_body float-end">
                <a class="gallery_link"><i class="bi bi-filter-left"></i>Sort By Name</a>
              </label>
            </div>
            <div class="row p-3 px-4 g-4 mb-5">
              <div class="col-md-12 col-lg-4 col-xl-4 col-xxl-4 col-sm-6 col-xs-12 col-sm-12 card-folder-1">
                <div class="tree">
                  <ul>
                    <li>
                      <details>
                        <summary class="summary_main">
                          <figure class="caret caret_img c1" onclick="toggleMyul1()">
                            <img src="/images/folder.png" class="caret_img">
                            <figcaption class="text-center px-2 caret_caption">Folder name1</figcaption>
                          </figure>
                        </summary>
                      </details>
                    </li>
                  </ul>
                  <ul id="myul1" style="display: none;">
                    <label class="text-center caret_caption"> Folder Name1</label>
                    <li>
                      <details>
                        <summary><span class=" folder_li"> Folder </span></summary>
                        <ul>
                          <li class="folder_li">
                            <details>
                              <summary><span class=" folder_li"> Word </span></summary>
                              <ul>
                                <li class="folder_li">word file1 dbhsdsd adba abjadjj adbja</li><br />
                                <li class="folder_li">word file2</li><br />
                              </ul>
                            </details>
                          </li>
                          <li class="folder_li">
                            <details>
                              <summary><span class=" folder_li"> Excel </span></summary>
                              <ul>
                                <li class="folder_li">Excel file1</li><br />
                                <li class="folder_li">Excel file2</li><br />
                              </ul>
                            </details>
                          </li>
                          <li class="folder_li">
                            <details>
                              <summary><span class=" folder_li"> Pdf </span></summary>
                              <ul>
                                <li class="folder_li">pdf file1</li><br />
                                <li class="folder_li">Pdf file2</li><br />
                              </ul>
                            </details>
                          </li>
                        </ul>
                      </details>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-5 col-xs-5 col-md-5 col-lg-3 col-xl-3 col-xxl-3" id="folder_right"
            style="box-shadow: 0px 3px 6px #00000029;border: 1px solid #D8D8D8;border-radius: 5px; background: #FFFFFF 0% 0% no-repeat padding-box">
            <label class="section_sub_header p-3 m-1 mt-2">File structure</label>
            <div class="card-folder-2" id="cardFolder2">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.show {
  display: block !important;
}
.card-folder-2 li {
  display: inline;
}
</style>

<script>
function toggleMyul1() {
  const myul1 = document.getElementById('myul1');
  myul1.classList.toggle('show');
  const cardFolder2 = document.getElementById('cardFolder2');
  cardFolder2.innerHTML = myul1.innerHTML;
}

function copyContentToCardFolder2(element) {
  const cardFolder2 = document.getElementById('cardFolder2');
  cardFolder2.innerHTML = element.innerHTML;
}

document.addEventListener("DOMContentLoaded", function () {
  const caretImg = document.querySelector('.caret_img');
  caretImg.addEventListener("click", toggleMyul1);
});
</script>