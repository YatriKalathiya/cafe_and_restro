// ------------------------------------------------------------ sub_category js ------------------------------------------------------------
var sub_cat_data =[{name: 'Dosa' ,image:'dosa.png'},{name: 'Samosa' ,image:'samosa.png'},{name: 'Paratha' ,image:'paratha.png'},{name: 'Biryani' ,image:'biryani.png'},{name: 'Pav Bhaji' ,image:'pavbhaji.png'},{name: 'Chaat' ,image:'chaat.png'},{name: 'Kichdi' ,image:'khichdi.png'},{name: 'Breads' ,image:'breads.png'},{name: 'rice' ,image:'rice.png'},{name: 'Bevrages' ,image:'bevrage.png'}];

function subcat_load(){
    var id= document.getElementById('sp_sub_cat');
    id.innerHTML='';
    sub_cat_data.forEach((el,id1)=>{
        const itemdata =`<a href='./category_list.html' class="col d-flex justify-content-center pb-5" onclick="addcat('${el.name}')">
                <div class="sp_sub_cat_content">
                    <div class="sp_sub_cat_img">
                        <img src="/sujal_img/${el.image}" alt="Card image cap" class="w-100">
                    </div>
                    <h4 class="sp_sub_cat_title">${el.name}</h4>
                </div>
            </a>`;
            
        id.innerHTML+=itemdata;
    })

}
function addcat(el){
    console.log(el);
    localStorage.setItem('selected_cat', el);
    window.location.href = './category_list.html';  // Redirect to new page on button click.
}
window.onload = function(){
    subcat_load();
    // cat_list();
}