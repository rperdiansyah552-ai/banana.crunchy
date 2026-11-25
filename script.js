// GANTI nomor berikut dengan nomor WhatsApp Business penjual.
 // Gunakan kode negara 62 tanpa tanda +, spasi, atau angka 0 di depan.
const WHATSAPP_NUMBER = "6281535360775"; // CONTOH: ganti dengan nomor WhatsApp Business kamu

const products = [
 {id:"original",name:"BANANA CRUNCH ORIGINAL",flavor:"Original (Asin)",price:12000,image:"assets/original.jpeg",description:"Keripik pisang rasa original dengan cita rasa gurih dan tekstur renyah. Pilihan sederhana untuk menemani waktu santai.",composition:"Pisang, minyak nabati, garam, dan bahan tambahan pangan sesuai resep produksi. Periksa dan tuliskan komposisi final sesuai bahan yang benar-benar digunakan.",benefits:"Dapat menjadi pilihan camilan saat bersantai atau berkumpul. Pisang merupakan bahan pangan sumber karbohidrat; nilai gizi produk akhir bergantung pada bahan dan proses pengolahannya."},
 {id:"cokelat",name:"BANANA CRUNCH COKELAT",flavor:"Cokelat",price:15000,image:"assets/cokelat.jpeg",description:"Perpaduan keripik pisang renyah dengan sensasi rasa cokelat yang manis dan nikmat.",composition:"Pisang, minyak nabati, bubuk/perisa cokelat, gula, dan bahan tambahan pangan sesuai resep produksi. Sesuaikan dengan label bahan sebenarnya.",benefits:"Memberikan variasi rasa manis untuk teman ngemil. Cocok dinikmati saat istirahat atau dibagikan bersama teman."},
 {id:"stroberi",name:"BANANA CRUNCH STROBERI",flavor:"Stroberi",price:15000,image:"assets/stroberi.jpeg",description:"Keripik pisang dengan rasa stroberi yang manis dan memiliki sensasi buah yang menyegarkan.",composition:"Pisang, minyak nabati, bubuk/perisa stroberi, gula, dan bahan tambahan pangan sesuai resep produksi. Sesuaikan dengan label bahan sebenarnya.",benefits:"Menambah pilihan camilan dengan rasa buah yang berbeda. Praktis untuk menemani aktivitas sehari-hari."},
 {id:"matcha",name:"BANANA CRUNCH MATCHA",flavor:"Matcha",price:15000,image:"assets/matcha.jpeg",description:"Keripik pisang dengan karakter rasa matcha yang khas, cocok untuk pencinta rasa teh hijau.",composition:"Pisang, minyak nabati, bubuk matcha atau perisa matcha, gula, dan bahan tambahan pangan sesuai resep produksi. Sesuaikan dengan label bahan sebenarnya.",benefits:"Memberikan alternatif rasa yang unik bagi pencinta matcha. Bisa menjadi teman bersantai atau berkumpul."},
 {id:"taro",name:"BANANA CRUNCH TARO",flavor:"Taro",price:15000,image:"assets/taro.jpeg",description:"Keripik pisang dengan rasa taro yang lembut dan manis, hadir sebagai pilihan rasa yang berbeda.",composition:"Pisang, minyak nabati, bubuk/perisa taro, gula, dan bahan tambahan pangan sesuai resep produksi. Sesuaikan dengan label bahan sebenarnya.",benefits:"Memberikan variasi camilan dengan rasa taro yang khas. Praktis dinikmati kapan saja."}
];
let cart = JSON.parse(localStorage.getItem("bananaCrunchCart") || "[]");
let activeProduct = null;
const rupiah = n => "Rp" + Number(n).toLocaleString("id-ID");
const $ = id => document.getElementById(id);

function renderProducts(){
 $("productGrid").innerHTML = products.map(p=>`
 <article class="product-card">
  <div class="product-photo"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="tag">100 gram</span></div>
  <div class="product-content"><h3>${p.name}</h3><p class="sub">${p.flavor} • Keripik pisang</p>
   <div class="stars" aria-label="Rating tampilan bintang lima">★★★★★ <small>5.0</small></div>
   <div class="price">${rupiah(p.price)}</div>
   <div class="card-actions"><button class="detail-btn" onclick="openDetail('${p.id}')">LIHAT DETAIL</button><button class="add-btn" onclick="addToCart('${p.id}',1)">+ KERANJANG</button></div>
  </div>
 </article>`).join("");
}
function saveCart(){localStorage.setItem("bananaCrunchCart",JSON.stringify(cart));updateCartCount();}
function updateCartCount(){$("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);}
function addToCart(id,qty=1){const p=products.find(x=>x.id===id);const item=cart.find(x=>x.id===id);if(item)item.qty+=qty;else cart.push({id,qty});saveCart();renderCart();toast(`${p.flavor} ditambahkan ke keranjang`);}
function openDetail(id){activeProduct=products.find(x=>x.id===id);$("detailImage").src=activeProduct.image;$("detailImage").alt=activeProduct.name;$("detailName").textContent=activeProduct.name;$("detailPrice").textContent=rupiah(activeProduct.price);$("detailDescription").textContent=activeProduct.description;$("detailComposition").textContent=activeProduct.composition;$("detailBenefits").textContent=activeProduct.benefits;$("detailQty").value=1;$("detailBackdrop").classList.add("show");}
function renderCart(){
 if(!cart.length){$("cartItems").innerHTML='<div class="empty-cart"><div style="font-size:42px">🛒</div><h3>Keranjang masih kosong</h3><p>Yuk, pilih rasa Banana Crunch favoritmu!</p></div>';}
 else {$("cartItems").innerHTML=cart.map(item=>{const p=products.find(x=>x.id===item.id);return `<div class="cart-item"><img src="${p.image}" alt=""><div><h4>${p.name}</h4><p>${rupiah(p.price*item.qty)}</p><div class="qty-control"><button onclick="changeQty('${p.id}',-1)">−</button><input value="${item.qty}" readonly><button onclick="changeQty('${p.id}',1)">+</button></div></div><button class="remove-item" onclick="removeItem('${p.id}')">Hapus</button></div>`}).join("");}
 $("cartTotal").textContent=rupiah(cartTotal());
}
function cartTotal(){return cart.reduce((s,item)=>s+products.find(p=>p.id===item.id).price*item.qty,0);}
function changeQty(id,delta){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);saveCart();renderCart();}
function removeItem(id){cart=cart.filter(x=>x.id!==id);saveCart();renderCart();}
function openCart(){$("cartBackdrop").classList.add("show");renderCart();}
function toast(msg){$("toast").textContent=msg;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2200);}
function closeModal(id){$(id).classList.remove("show");}
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>closeModal(b.dataset.close)));
["detailBackdrop","checkoutBackdrop","cartBackdrop"].forEach(id=>$(id).addEventListener("click",e=>{if(e.target.id===id)closeModal(id);}));
$("openCart").addEventListener("click",openCart);
$("detailMinus").addEventListener("click",()=>{$("detailQty").value=Math.max(1,Number($("detailQty").value)-1);});
$("detailPlus").addEventListener("click",()=>{$("detailQty").value=Math.max(1,Number($("detailQty").value)+1);});
$("detailAdd").addEventListener("click",()=>{if(activeProduct)addToCart(activeProduct.id,Math.max(1,parseInt($("detailQty").value)||1));closeModal("detailBackdrop");});
$("goCheckout").addEventListener("click",()=>{if(!cart.length){toast("Keranjang masih kosong");return;}closeModal("cartBackdrop");$("checkoutTotal").textContent=rupiah(cartTotal());$("checkoutBackdrop").classList.add("show");});
$("checkoutForm").addEventListener("submit",e=>{
 e.preventDefault();if(!cart.length)return;
 const fd=new FormData(e.target);const name=fd.get("name").trim(),phone=fd.get("phone").trim(),address=fd.get("address").trim(),notes=fd.get("notes").trim();
 const lines=cart.map((item,i)=>{const p=products.find(x=>x.id===item.id);return `${i+1}. ${p.name} (${p.flavor})\n   ${item.qty} x ${rupiah(p.price)} = ${rupiah(p.price*item.qty)}`;});
 const message=`HALO BANANA CRUNCH, SAYA INGIN MEMESAN:\n\n${lines.join("\n\n")}\n\nTOTAL: ${rupiah(cartTotal())}\n\nDATA PEMESAN\nNama: ${name}\nNo. HP: ${phone}\nAlamat: ${address}\nCatatan: ${notes||"-"}\n\nMohon konfirmasi pesanan dan informasi pengirimannya. Terima kasih.`;
 if(!/^62\d{8,13}$/.test(WHATSAPP_NUMBER)){alert("Nomor WhatsApp Business belum diatur. Buka file script.js dan ganti WHATSAPP_NUMBER dengan nomor penjual berawalan 62.");return;}
 window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,"_blank");
});
renderProducts();renderCart();updateCartCount();
