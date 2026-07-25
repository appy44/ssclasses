// =========================
// Sunayana Security Layer
// =========================

(function(){

const MESSAGE="✨ Something Beautiful is Taking Shape ✨";

function toast(){

    let t=document.getElementById("ssc-toast");

    if(!t){

        t=document.createElement("div");

        t.id="ssc-toast";

        document.body.appendChild(t);

    }

    t.innerHTML=MESSAGE;

    t.classList.add("show");

    clearTimeout(t.timer);

    t.timer=setTimeout(()=>{

        t.classList.remove("show");

    },2500);

}

// Right Click

document.addEventListener("contextmenu",(e)=>{

    e.preventDefault();

    toast();

});

// Copy Cut Paste

["copy","cut","paste"].forEach(type=>{

    document.addEventListener(type,(e)=>{

        e.preventDefault();

        toast();

    });

});

// Drag

document.addEventListener("dragstart",(e)=>{

    e.preventDefault();

});

// Keyboard

document.addEventListener("keydown",(e)=>{

    const key=e.key.toUpperCase();

    if(

        key==="F12" ||

        (e.ctrlKey && e.shiftKey && ["I","J","C"].includes(key)) ||

        (e.ctrlKey && key==="U") ||

        (e.ctrlKey && key==="S") ||

        (e.ctrlKey && key==="A") ||

        (e.ctrlKey && key==="P")

    ){

        e.preventDefault();

        toast();

    }

});

// Long Press Mobile

let timer;

document.addEventListener("touchstart",()=>{

    timer=setTimeout(toast,600);

});

document.addEventListener("touchend",()=>{

    clearTimeout(timer);

});

document.addEventListener("touchmove",()=>{

    clearTimeout(timer);

});

})();

