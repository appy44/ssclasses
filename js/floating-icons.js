const bg = document.querySelector(".background-icons");

const ICONS = [
    "📚","📖","✏️","🖊️",
    "🖌️","🎨","📐","📏",
    "🌍","⭐","🎒","🎓",
    "➕","➖","🏆","✖️",
    "🚀","🎵","🏅","🧭",
    "➗","🧮","🧬","🔭",
    "⚛️"
];

const objects = [];

let animationFrame = null;
let resizeTimer = null;

function rand(min,max){
    return Math.random()*(max-min)+min;
}

function createIcons(){

    bg.innerHTML="";

    objects.length=0;

    const isMobile = window.innerWidth < 768;

    const COUNT = isMobile ? 25 : 50;

    for(let i=0;i<COUNT;i++){

        const el=document.createElement("div");

        el.className="story-item";

        el.innerHTML=ICONS[Math.floor(Math.random()*ICONS.length)];

        const size=isMobile
            ? rand(12,20)
            : rand(20,35);

        el.style.fontSize=size+"px";
        el.style.opacity=rand(.2,.5);

        bg.appendChild(el);

        objects.push({

            el,

            x:rand(0,window.innerWidth-size),

            y:rand(0,window.innerHeight-size),

            vx:rand(.15,.45)*(Math.random()<.5?-1:1),

            vy:rand(.15,.45)*(Math.random()<.5?-1:1),

            angle:rand(0,360),

            rotateSpeed:rand(-.2,.2),

            size

        });

    }

}

createIcons();

function animate(){

    const w=window.innerWidth;
    const h=window.innerHeight;

    objects.forEach(o=>{

        o.x+=o.vx;
        o.y+=o.vy;

        if(o.x<0){

            o.x=0;
            o.vx*=-1;

        }

        if(o.x>w-o.size){

            o.x=w-o.size;
            o.vx*=-1;

        }

        if(o.y<0){

            o.y=0;
            o.vy*=-1;

        }

        if(o.y>h-o.size){

            o.y=h-o.size;
            o.vy*=-1;

        }

        o.y+=Math.sin(Date.now()/1200+o.x*.01)*0.2;

        o.angle+=o.rotateSpeed;

        o.el.style.transform=
        `translate(${o.x}px,${o.y}px)
         rotate(${o.angle}deg)`;

    });

    // Collision Detection

    for(let i=0;i<objects.length;i++){

        for(let j=i+1;j<objects.length;j++){

            const a=objects[i];
            const b=objects[j];

            const dx=b.x-a.x;
            const dy=b.y-a.y;

            const dist=Math.sqrt(dx*dx+dy*dy)||1;

            const minDist=(a.size+b.size)/2;

            if(dist<minDist){

                const nx=dx/dist;
                const ny=dy/dist;

                const overlap=minDist-dist;

                a.x-=nx*overlap*.5;
                a.y-=ny*overlap*.5;

                b.x+=nx*overlap*.5;
                b.y+=ny*overlap*.5;

                const force=0.4;

                a.vx-=nx*force;
                a.vy-=ny*force;

                b.vx+=nx*force;
                b.vy+=ny*force;

                const MAX_SPEED=0.8;

                a.vx=Math.max(-MAX_SPEED,Math.min(MAX_SPEED,a.vx));
                a.vy=Math.max(-MAX_SPEED,Math.min(MAX_SPEED,a.vy));

                b.vx=Math.max(-MAX_SPEED,Math.min(MAX_SPEED,b.vx));
                b.vy=Math.max(-MAX_SPEED,Math.min(MAX_SPEED,b.vy));

                impactSpark((a.x+b.x)/2,(a.y+b.y)/2);

                a.rotateSpeed+=rand(-0.2,0.2);
                b.rotateSpeed+=rand(-0.2,0.2);

            }

        }

    }

    animationFrame=requestAnimationFrame(animate);

}

animate();
// ----------------------------
// Golden particles
// ----------------------------

function particle(){

    const p=document.createElement("div");

    p.className="particle";

    p.style.left="50%";
    p.style.top="50%";

    const angle=Math.random()*Math.PI*2;
    const dist=150+Math.random()*350;

    p.style.setProperty("--x",Math.cos(angle)*dist+"px");
    p.style.setProperty("--y",Math.sin(angle)*dist+"px");

    p.style.animationDuration=(3+Math.random()*4)+"s";

    bg.appendChild(p);

    setTimeout(()=>{
        p.remove();
    },7000);

}

const particleInterval = setInterval(particle,150);

// ----------------------------
// Impact Spark
// ----------------------------

function impactSpark(x,y){

    for(let i=0;i<6;i++){

        const p=document.createElement("div");

        p.className="particle";

        p.style.left=x+"px";
        p.style.top=y+"px";

        const angle=Math.random()*Math.PI*2;
        const dist=20+Math.random()*40;

        p.style.setProperty("--x",Math.cos(angle)*dist+"px");
        p.style.setProperty("--y",Math.sin(angle)*dist+"px");

        p.style.animationDuration=".8s";

        bg.appendChild(p);

        setTimeout(()=>{
            p.remove();
        },800);

    }

}

// ----------------------------
// Resize Fix
// ----------------------------

window.addEventListener("resize",()=>{

    document.body.classList.add("resizing");

    clearTimeout(resizeTimer);

    resizeTimer=setTimeout(()=>{

        // Stop animation
        if(animationFrame){
            cancelAnimationFrame(animationFrame);
        }

        // Remove all old icons
        document.querySelectorAll(".story-item").forEach(e=>e.remove());

        // Reset objects
        objects.length=0;

        // Create fresh layout
        createIcons();

        // Restart animation
        animate();

        document.body.classList.remove("resizing");

    },250);

});

// ----------------------------
// Page Visibility Optimization
// ----------------------------

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        if(animationFrame){
            cancelAnimationFrame(animationFrame);
        }

    }else{

        animate();

    }

});