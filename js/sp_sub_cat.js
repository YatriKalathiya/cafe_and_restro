// ------------------------------------------------------------ sub_category js ------------------------------------------------------------
var sub_cat_data =[{name: 'dosa' ,image:'/sujal_img/dosa.png'},{name: 'samosa' ,image:'/sujal_img/samosa.png'},{name: 'paratha' ,image:'/sujal_img/paratha.png'},{name: 'biryani' ,image:'/sujal_img/biryani.png'},{name: 'pav bhaji' ,image:'/sujal_img/pavbhaji.png'},{name: 'chaat' ,image:'/sujal_img/chaat.png'},{name: 'kichdi' ,image:'/sujal_img/khichdi.png'},{name: 'breads' ,image:'/sujal_img/breads.png'},{name: 'rice' ,image:'/sujal_img/rice.png'},{name: 'bevrages' ,image:'/sujal_img/bevrage.png'}];

function subcat_load(){
    var id= document.getElementById('sp_sub_cat');
    id.innerHTML='';
    sub_cat_data.forEach((el,id1)=>{
        const itemdata =`<a href='./category_list.html' class="col d-flex justify-content-center pb-5">
                <div class="sp_sub_cat_content">
                    <div class="sp_sub_cat_img ${id1==0 ? `border-white`:''}">
                        <img src="${el.image}" alt="Card image cap" class="w-100">
                    </div>
                    <h4 class="sp_sub_cat_title">${el.name}</h4>
                </div>
            </a>`;
            
        id.innerHTML+=itemdata;
    })

}
window.onload = function(){
    subcat_load();
    // cat_list();
}