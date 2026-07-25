const bg = document.querySelector(".background-icons");

const ICONS = [
    "📚","📖","✏️","🖊️",
    "🖌️","🎨","📐","📏",
    "🌍","⭐","🎒","🎓",
	"➕","➖","🏆","✖️",
	"🚀","🎵","🏅","🎶",
	"🧭","🌙","☀","➗",
	"🔬","🧪","⚗️","🧫",
	"🧮","🧬","🔭","🧲",
	"⚛️","🌡️"
];

const objects = [];

const isMobile = window.innerWidth < 768;

const COUNT = isMobile ? 10 : 25;

function rand(min,max){
    return Math.random()*(max-min)+min;
}

// Create Icons

for(let i=0;i<COUNT;i++){

    const el=document.createElement("div");

    el.className="story-item";

    el.innerHTML=ICONS[Math.floor(Math.random()*ICONS.length)];

	const isMobile = window.innerWidth < 768;

	const size = isMobile
		? rand(12, 20)
		: rand(20, 35);

    el.style.fontSize=size+"px";

    el.style.opacity=rand(.2,0.5);

    bg.appendChild(el);

    objects.push({

        el,

        x:rand(0,window.innerWidth),

        y:rand(0,window.innerHeight),

        vx:rand(.15,.45)*(Math.random()<.5?-1:1),

        vy:rand(.15,.45)*(Math.random()<.5?-1:1),

        angle:rand(0,360),

        rotateSpeed:rand(-.2,.2),

        size

    });

}

// Animation

function animate(){

    const w=window.innerWidth;

    const h=window.innerHeight;

    objects.forEach(o=>{

        o.x+=o.vx;

        o.y+=o.vy;

        // Bounce

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

        // Floating wave

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

        const dist=Math.sqrt(dx*dx+dy*dy);

        const minDist=(a.size+b.size)/2;

        if(dist<minDist){

            // Normal vector

            const nx=dx/dist;
            const ny=dy/dist;

            // Push apart

            const overlap=minDist-dist;

            a.x-=nx*overlap*.5;
            a.y-=ny*overlap*.5;

            b.x+=nx*overlap*.5;
            b.y+=ny*overlap*.5;

            // Swap velocity

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
            // Small rotation impact

            a.rotateSpeed+=rand(-0.2,0.2);
            b.rotateSpeed+=rand(-0.2,0.2);

        }

    }

}
    requestAnimationFrame(animate);

}

animate();

window.addEventListener("resize",()=>{

    objects.forEach(o=>{

        o.x=Math.min(o.x,window.innerWidth-o.size);

        o.y=Math.min(o.y,window.innerHeight-o.size);

    });

});

// Golden particles

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

    setTimeout(()=>p.remove(),7000);

}

setInterval(particle,150);

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

        setTimeout(()=>p.remove(),800);

    }

}