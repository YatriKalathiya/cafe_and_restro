// -------------------------------category list js ------------------------------->
var cat_list_data =[{img:'/sujal_img/masaladaso.png',title:'Masala Dosa',continate:'south india',type:'non veg',rate:'4.7',des:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, eaque quia eius maiores, alias eligendi fuga iure sit commodi aliquid consequatur amet odio error deleniti, dolor exercitationem iste a. Ipsa!',price:'$ 120'},{img:'/sujal_img/masaladaso.png',title:'Masala Dosa',continate:'south india',type:'pure veg',rate:'4.5',des:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, eaque quia eius maiores, alias eligendi fuga iure sit commodi aliquid consequatur amet odio error deleniti, dolor exercitationem iste a. Ipsa!',price:'$ 120'},{img:'/sujal_img/masaladaso.png',title:'Masala Dosa',continate:'south india',type:'pure veg',rate:'4.5',des:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, eaque quia eius maiores, alias eligendi fuga iure sit commodi aliquid consequatur amet odio error deleniti, dolor exercitationem iste a. Ipsa!',price:'$ 120'},{img:'/sujal_img/masaladaso.png',title:'Masala Dosa',continate:'south india',type:'pure veg',rate:'4.5',des:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, eaque quia eius maiores, alias eligendi fuga iure sit commodi aliquid consequatur amet odio error deleniti, dolor exercitationem iste a. Ipsa!',price:'$ 120'},{img:'/sujal_img/masaladaso.png',title:'Masala Dosa',continate:'south india',type:'pure veg',rate:'4.5',des:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, eaque quia eius maiores, alias eligendi fuga iure sit commodi aliquid consequatur amet odio error deleniti, dolor exercitationem iste a. Ipsa!',price:'$ 120'},{img:'/sujal_img/masaladaso.png',title:'Masala Dosa',continate:'south india',type:'pure veg',rate:'4.5',des:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, eaque quia eius maiores, alias eligendi fuga iure sit commodi aliquid consequatur amet odio error deleniti, dolor exercitationem iste a. Ipsa!',price:'$ 120'},{img:'/sujal_img/masaladaso.png',title:'Masala Dosa',continate:'south india',type:'pure veg',rate:'4.5',des:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, eaque quia eius maiores, alias eligendi fuga iure sit commodi aliquid consequatur amet odio error deleniti, dolor exercitationem iste a. Ipsa!',price:'$ 120'},{img:'/sujal_img/masaladaso.png',title:'Masala Dosa',continate:'south india',type:'pure veg',rate:'4.5',des:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, eaque quia eius maiores, alias eligendi fuga iure sit commodi aliquid consequatur amet odio error deleniti, dolor exercitationem iste a. Ipsa!',price:'$ 120'},{img:'/sujal_img/masaladaso.png',title:'Masala Dosa',continate:'south india',type:'pure veg',rate:'4.5',des:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, eaque quia eius maiores, alias eligendi fuga iure sit commodi aliquid consequatur amet odio error deleniti, dolor exercitationem iste a. Ipsa!',price:'$ 120'}]
function cat_list(){
   var id = document.getElementById('s_catlist_card');
   id.innerHTML = cat_list_data.map((el,id)=>{
       return `<div class="col py-4 ">
               <div class="s_catlist_card m-xxl-0 m-auto">
                   <div class="s_catlist_img" >
                       <img src="${el.img}" class="w-100">
                       ${el.type === 'pure veg' ? `<img src="/sujal_img/veg.png" class="s_catlist_icon">` :`<img src="/sujal_img/nonveg.png" class="s_catlist_icon">`}
                       
                   </div>
                   <div class=" p-3">
                       <h5>${el.title}</h5>
                       <div >
                           <small class="d-flex text-secondary">
                               ${el.continate}
                               <ul class="d-flex ps-0 mx-3">
                                   <li class="mx-3">${el.type}</li>
                                   <li class="mx-3 "><img src="/sujal_img/star.png" class="mx-1 align-self-center mb-1"><span>${el.rate}</span></li>
                               </ul>
                           </small>
                           <p class="sp_fs_12">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, eaque quia eius maiores, alias eligendi fuga iure sit commodi aliquid consequatur amet odio error deleniti, dolor exercitationem iste a. Ipsa!</p>
                       </div>
                       <div class="d-flex align-content-center justify-content-between"> 
                           <h4 class="sp_color_yellow">${el.price}</h4>
                           <button type="button" class="s_add_btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Add</button>
                          

<!-- Modal -->
<div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
 <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
   <div class="modal-content">
       <button type="button" class="btn-close ms-auto text-white" data-bs-dismiss="modal" aria-label="Close">
           
       </button>
       <h5 class="modal-title text-center" id="exampleModalLabel">Customize As Per Your Taste</h5>
     <div class="modal-body">
     <div class="s_modal_inner">
       <small>
           <p class="s_modal_inp">Add Instructions</p>
           <hr>
           <p class="s_modal_inp">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, necessitatibus, tenetur, architecto quae quod ea expedita quibusdam debitis inventore illum atque iure perferendis.</p>
       </small>
     </div>
     <div class="s_modal_inner">
           <h5 class="s_modal_inp">Size</h5>
           <hr>
           <ul class="list-unstyled s_modal_inp">
           <li class="d-flex justify-content-between align-items-center py-2"><p class="mb-0">Small</p><input type="radio" name="size" value="small"></li>
           <li class="d-flex justify-content-between align-items-center py-2"><p class="mb-0">Medium</p><p class="ms-auto mb-0 px-3">+$4</p><input type="radio" name="size" value="medium"></li>
           <li class="d-flex justify-content-between align-items-center py-2"><p class="mb-0">Large</p><p class="ms-auto mb-0 px-3">+$7</p><input type="radio" name="size" value="large"></li>
           <ul>
     </div>
     <div class="s_modal_inner">
           <h5 class="s_modal_inp">Add Instructions</h5>
           <hr>
           <p class="s_modal_inp">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed, necessitatibus, tenetur, architecto quae quod ea expedita quibusdam debitis inventore illum atque iure perferendis.</p>
     </div>
     </div>
     <div class="modal-footer">
       <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
       <button type="button" class="btn btn-primary">Save changes</button>
     </div>
   </div>
 </div>
</div>
                       </div>
                   </div>
               </div>
           </div>`
   }).join('');
}

// --------------------------window onload functions---------------------------------
window.onload = function(){
   // subcat_load();
   cat_list();
}