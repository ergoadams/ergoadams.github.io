# Kompleksarvude sisukord  
1. [Teooria](#teooria)
2. [Ülesanded](#ülesanded)

## Teooria  

### Hulk  
**Hulk** on kaasaegse matemaatika algmõiste, mida ei saa defineerida sellest üldisemate mõistete kaudu. Hulk on mingite objektide terviklik kogum, mille objektid on omavahel eristatavad. Iga objekti korral on võimalik otsustada, kas see kuulub vaadeldavasse hulka või mitte.  
  
Neid objekte, mis moodustavad mingi hulga nimetame me hulga **elementideks**.  
  
Hulk loetakse kirjeldatuks, kui on teada omadused, mis on selle hulga kõikidel elementidel ja ainult neil.  
  
Olgu $\Bbb{C}$ reaalarvude järjestatud paarid hulk, s.o  
$\Bbb{C} = \\{ (x,y) \text{ | } x \in \Bbb{R} \text{ & } y \in \Bbb{R}\\}$  
  
### Kompleksarvude hulk  
Hulka $\Bbb{C}$ nimetatakse **kompleksarvude hulgaks**, kui sellel hulgan on defineeritud elementide võrdus, liitmine ja korrutamine järgmiselt:  
* iga kaks paari on võrdsed  
    $(x_1,y_1)=(x_2,y_2) \iff x_1=x_2 \text{ & } y_1=y_2$  
* iga kahe paari summa  
    $(x_1,y_1)+(x_2,y_2)=(x_1+x_2,y_1+y_2)$  
* iga kahe paari korrutis  
    $(x_1,y_1) \cdot (x_2,y_2)=(x_1 x_2 - y_1 y_2,x_1 y_2+x_2 y_1)$  
  
Hulga $\Bbb{C}$ elemente nimetatakse **kompleksarvudeks**  
  
Kasutades kompleksarvude liitmise ja korrutamise tehteid võime mistahes kompleksarvu $z = (x,y)$ esitada kujul  
    $z = (x,y) = (x,0) + (y,0)(0,1)$  
Arvupaarid, mille teine element on võrdne nulliga, käituvad defineeritud tehete korral sarnaselt reaalarvudege. Tõepoolest:  
    $\begin{align}(x_1,0)+(x_2,0)&=(x_1+x_2,0),\\\\  
    (x_1,0)\cdot (x_2,0)&=(x_1\cdot x_2,0)\end{align}$  
Defineerime üksühese kujutuse  
    $\varphi: \Bbb{C}\to\Bbb{R}\text{  }(x,0)\mapsto x$  
See kujutus $\varphi$ samastab paari $(x,0)$ ja reaalarvu x, s.o  
    $(x,0) \equiv x$  
    $z = (x,y) = (x,0) + (y,0)(0,1)$  
Viimases avaldises erilist kompleksarvu, ehk paari $(0,1)$ nimetatakse **imaginaarühikuks** ja tähistatakse  
$i=(0,1)$  
### Kompleksarvu algebraline kuju  
Arvutame  
$i^2=(0,1)^2=(0,1)(0,1)=(-1,0)=-1$  
Kasutades tähistusi $(x,0)\equiv x$ ja $(y,0)\equiv y$ ning $(0,1)=i$ saame  
$z=(x,y)=x+iy$   
Viimast nimetatakse **kompleksarvu algebraliseks kujuks**.  
  
Olgu antud kompleksarv  
$z=(x,y)=x+iy$  
Defineerime kaks funktsiooni:  
$\text{Re}:\Bbb{C}\to\Bbb{R} \text{   } z=x+iy\mapsto x=\text{Re}(z)$  
ja  
$\text{Im}:\Bbb{C}\to\Bbb{R} \text{   } z=x+iy\mapsto y=\text{Im}(z)$  
Nende funktsioonide väärtusi nimetatakse vastavalt **kompleksarvu reaalosaks** ja **imaginaarosaks**.  
$\text{Re}(2-3i)=2$  
$\text{Im}(2-3i)=-3$  

### Komplekstasand  
Tasandi igat punkti saame kirjeldada kahe koordinaadiga, s.o arvupaariga $(x,y)$.  
  
TODO: Siin peaks komplekstasandi joonis olema  
  
Tasandit, mille igale punktile $(x,y)$ on vastavusse seatud kompleksarv $z=(x,y)=x+iy$ nimetatakse **komplekstasandiks**.  
  
### Kaaskompleksarv  
Kompleksarvu $z=(x,y)$ **kaaskompleksarvuks** nimetatakse kompleksarvu  
    $\bar{z} = (x,-y)=x-iy$  
Arvutame korrutise  
    $z\bar{z}=(x,y)(x,-y)=(x^2+y^2,0)=x^2+y^2$,  
millest järeldub, et see korrutis on positiivne reaalarv, s.o $z\bar{z} \in \Bbb{R}$.  
Viimasest võrdusest järeldub, et  
    $z\bar{z}=0 \iff x=y=0$  
  
### Pöördkompleksarv  
Nullist erineva kompleksarvu $z=(x,y)$ **pöördkompleksarvuks** nimetatakse kompleksarvu  
    $z^{-1}=\frac{1}{x^2+y^2}(x,-y)$  
Arvutame kompleksarvu $z$ ja tema pöördarvu $z^{-1}$ korrutise:  
    $zz^{-1}=\frac{1}{x^2+y^2}(x,y)(x,-y)=\frac{1}{x^2+y^2}(x^2+y^2,0)=(1,0)=1$  
  
### Kompleksarvude jagamine  
Kompleksarvude $z_1$ ja $z_2 \neq 0$ jagatiseks nimetatakse kompleksarvu  
    $\frac{z_1}{z_2}=z_1z_2^{-1}$  
Olgu $z_1=(x_1,y_1)$ ja $z_2=(x_2,y_2)$ kaks kompleksarvu, siis  
    $\frac{z_1}{z_2}=z_1z_2^{-1}=(x_1,y_1)\cdot \frac{1}{x_2^2+y_2^2}(x_2,-y_2)=$
    $= \frac{1}{x_2^2+y_2^2}(x_1,y_1)(x_2,-y_2)=\frac{z_1\bar{z_2}}{z_2\bar{z_2}}$  
Siit järeldub, et kompleksarvude $z_1$ ja $z_2$ jagatise leidmiseks tuleb murdu $\frac{z_1}{z_2}$ laiendada nimetaja kaaskompleksarvuga $\bar{z_2}$.  

### Tehted algebralisel kujul antud kompleksarvudega  
Olgu antud algebralisel kujul kaks kompleksarvu  
    $z_1=x_1+i_y1$ ja $z_2=x_2+iy_2$,  
siis:  
    $z_1=z_2\iff x_1=x_2 \\& y_1=y_2$  
    $z_1+z_2=(x_1+x_2)+i(y_1+y_2)$  
    $z_1z_2=(x_1x_2-y_1y_2)+i(x_1y_2+x_2y_1)$  
    $\frac{z_1}{z_2}=\frac{z_1\bar{z_2}}{z_2\bar{z_2}}=\frac{x_1x_2+y_1y_2}{x_2^2+y_2^2}+i\frac{x_2y_1-x_1y_2}{x_2^2+y_2^2}$  
  
### Tehete omadused  
**Liitmise kommutatiivsus**:  
    $\forall z_1\in \Bbb{C}\text{, }\forall z_2\in\Bbb{C} \text{ korral } z_1+z_2=z_2+z_1$  
Tõestus:  
    $z_1+z_2=(x_1,y_1)+(x_2,y_2)\stackrel{\text{def}}{=}(x_1+x_2,y_1+y_2)=$
    $=(x_2+x_1,y_2+y_1)\stackrel{\text{def}}{=}(x_2,y_2)+(x_1,y_1)=z_2+z_1$  
  
**Korrutamise kommutatiivsus**:  
    $\forall z_1\in \Bbb{C}\text{, }\forall z_2\in\Bbb{C} \text{ korral } z_1\cdot z_2=z_2\cdot z_1$  
Tõestus:  
    $z_1\cdot z_2=(x_1,y_1)\cdot (x_2,y_2)\stackrel{\text{def}}{=}(x_1x_2-y_1y_2,x_1y_2+x_2y_1)=$
    $=(x_2x_1-y_2y_1,y_2x_1+y_1x_2)\stackrel{\text{def}}{=}(x_2,y_2)\cdot (x_1,y_1)=z_2\cdot z_1$  
  
**Liitmise assotsiatiivsus**:  
    $\forall z_1\in \Bbb{C}\text{, }\forall z_2\in\Bbb{C}\text{, }\forall z_3\in\Bbb{C}\text{ korral } z_1+(z_2+z_3)=(z_1+z_2)+z_3$  
**Korrutamise assotsiatiivsus**:  
    $\forall z_1\in \Bbb{C}\text{, }\forall z_2\in\Bbb{C}\text{, }\forall z_3\in\Bbb{C}\text{ korral } z_1\cdot (z_2\cdot z_3)=(z_1\cdot z_2)\cdot z_3$  
**Distributiivsus**:  
    $\forall z_1\in \Bbb{C}\text{, }\forall z_2\in\Bbb{C}\text{, }\forall z_3\in\Bbb{C}\text{ korral } z_1\cdot (z_2+z_3)=z_1\cdot z_2 + z_1\cdot z_3$  
  
### Kaaskompleksarvude omadused  
$\overline{z_1+z_2}=\bar{z_1}+\bar{z_2}$  
$\overline{z_1\cdot z_2}=\bar{z_1}\cdot \bar{z_2}$  
$\overline{\frac{z_1}{z_2}}=\frac{\bar{z_1}}{\bar{z_2}}$  
  
### Komplekstasand  
Kompleksarve saab kujutada komplekstasandil punktidena. Selleks kasutasime tasandil ristkoordinaatide süsteemi, kus tasandi igal punktil on kaks reaalarvulist koordinaati.  
  
TODO: Joonis uuesti  
  
Tasandi igat punkti saame kirjeldada kahe koordinaadiga, s.o arvupaariga $(x,y)$  
  
### Polaarkoordinaadid  
Tasandi punktide kirjeldamiseks võime valida ka teistsuguse koordinaatide süsteemi. Selleks fikseerime tasandil punktist $\text{O}$ väljuva kiire.  
  
TODO: Polaarkoordinaatide joonis 1  
  
Nüüd saame tasandi punkti $\text{X}$ kirjeldamiseks kasutada samuti kahte reaalarvu:  
$\rho$ - punktide $\text{O}$ ja $\text{X}$ vaheline kaugus  
$\varphi$ - nurk kiire ja sirglõigu $\text{OX}$ vahel  
  
TODO: Polaarkoordinaatide joonis 2  
  
Tasandi igale punktile $\text{X}$ saame vastavusse seada kaks koordinaati, ehk $X(\rho,\varphi)$. Selliselt konstrueeritud punkti $\text{X}$ koordinaate nimetatakse **polaarkoordinaatideks**.  
  
Punkti $\text{X}$ koordinaati $\rho$ nimetatakse **polaarraadiuseks**, koordinaati $\varphi$ **polaarnurgaks**. Punkti $\text{O}$ nimetatakse **pooluseks** ja sellest väljuvat kiirt **polaarteljeks**.  
  
TODO: jälle joonis  
  
### Polaarkoordinaatide määramispiirkond  
Tasandi ühekordseks katmiseks polaarkoordinaatidega, peavad need omandama väärtused  
    $0\le \rho \lt \infty$ ja $-\pi \lt \varphi \le \pi$  
Vastavalt kokkuleppele loetakse nurgad, mida mõõdetakse kellaosuti liikumisele vastassuunas, **positiivseks** ja kellaosuti liikumise suunas mõõdetud nurgad loetakse **negatiivseks**.  
  
### Polaarkoordinaatide võrk  
  
TODO: võrgu joonis  
  
**NB! Koordinaatide alguspunkti koordinaadid ei ole üheselt määratud!**  
  
### Polaar- ja ristkoordinaatide vaheline seos  
  
TODO: joonis  
  
Seome komplekstasandiga polaarkoodinaadid nii, et koordinaatide alguspunkt $\text{O}$ on pooluseks ja reaaltelje positiivne suund määrab polaartelje.  
Joonisel olevast täisnurksest kolmnurgast leiame üleminekuvalemid polaarkoordinaatidelt ristkoordinaatidele   
$\begin{cases} x=\rho \cos \varphi\\\\
y = \rho \sin \varphi\end{cases}$  
  
TODO: ikka joonised  

### Kompleksarvu trigonomeetriline kuju  
Kompleksarvu algebralisest kujust leiame:  
    $z=x+iy=\rho\cos\varphi + i\rho\sin\varphi=\rho(\cos\varphi+i\sin\varphi)$  
    $z=x+iy=\rho(\cos\varphi+i\sin\varphi)$  
Seda nimetatakse **kompleksarvu trigonomeetriliseks kujuks**.  
Polaarraadiust $\rho$ nimetatakse kompleksarvu $z$ **mooduliks** ja nurka $\varphi$ **argumendiks** ning tähistatakse $\varphi=\text{Arg}(z)$.  
  
### Kompleksarvu moodul  
  
TODO: joonis  
  
$z=x+iy=\rho(\cos\varphi+i\sin\varphi)$  
Pythagorase teoreemi põhjal:  
$\rho=|z|=\sqrt{z\bar{z}}=\sqrt{x^2+y^2}$  
  
### Kompleksarvu argumendi peaväärtus  
  
TODO: joonis  
  
$z=x+iy=\rho(\cos\varphi+i\sin\varphi)$  
Kompleksarvu $z$ argumenti, mis kuulub poollõiku $(-\pi,\pi]$ nimetatakse **argumendi peaväärtuseks** ja tähistatakse $\text{arg}(z)$, seega  
$-\pi \lt \text{arg}(z) \le \pi$  
  
### Kompleksarvu argument  
Järelikult:  
$\text{Arg}(z)=\text{arg}(z)+2k\pi, \text{ kus } k\in\Bbb{Z}$  
Kokkuvõtteks võime sõnastada:  
Kaks trigonomeetrilisel kujul esitatud kompleksarvu on võrdsed parajasti siis, kui  
* nende kompleksarvude moodulid on võrdsed  
* nende kompleksarvude argumentide vahe on $2\pi$ kordne  
  
### Kaaskompleksarv  
Olgu antud kompleksarv $z=\rho(\cos\varphi+i\sin\varphi)$.  
Sellele kompleksarvule vastav kaaskompleksarv on  
$\bar{z}=\rho(\cos\varphi-i\sin\varphi)=\rho(\cos(-\varphi)+i\sin(-\varphi))$  
  
TODO: joonis  
  
### Korrutamine trigonomeetrilisel kujul  
Olgu kaks kompleksarvu antud trigonomeetrilisel kujul:  
$z_1=\rho_1(\cos\varphi_1+i\sin\varphi_1), z_2=\rho_2(\cos\varphi_2+i\sin\varphi_2)$  
Arvutame nende korrutise  
$z_1z_2=\rho_1\rho_2(cos\varphi_1+i\sin\varphi_1)(\cos\varphi_2+i\sin\varphi_2)=$  
$=\rho_1\rho_2((\cos\varphi_1\cos\varphi_2-\sin\varphi_1\sin\varphi_2)+i(\cos\varphi_1\sin\varphi_2+\sin\varphi_1\cos\varphi_2))=$  
$\rho_1\rho_2(\cos(\varphi_1+\varphi_2)+i\sin(\varphi_1+\varphi_2))$  
Reegel:  
$z_1z_2=\rho_1\rho_2(\cos(\varphi_1+\varphi_2)+i\sin(\varphi_1+\varphi_2))$  
  
### Jagamine ja astendamine naturaalarvulise astendajaga  
Olgu kaks kompleksarvu antud trigonomeetrilisel kujul:  
$z_1=\rho_1(\cos\varphi_1+i\sin\varphi_1), z_2=\rho_2(\cos\varphi_2+i\sin\varphi_2)$  
Jagamise reegel (**NB! eksamil tuletada**)  
$\frac{z_1}{z_2}=\frac{\rho_1}{\rho_2}(\cos(\varphi_1-\varphi_2)+i\sin(\varphi_1-\varphi_2))$  
  
Kui $z=\rho(\cos\varphi+i\sin\varphi)$  
$ z^n=\underbrace{\rho\cdot\ldots\cdot\rho}\_{n\text{ tegurit}} (\cos(\underbrace{\varphi + \ldots + \varphi}\_{n\text{ liidetavat}})+i\sin(\underbrace{\varphi + \ldots + \varphi}\_{n\text{ liidetavat}}))$  
Reegel  
$z^n=\rho^n(\cos(n\varphi)+i\sin(n\varphi)) \text{  } n \gt 0$  
  
### Astendamine täisarvulise astendajaga  
Oletame, et $n=-m$, kus $m$ on positiivne täisarv. Siis  
$z^n=\rho^n(\cos\varphi+i\sin\varphi)^n=\rho^{-m}(\cos\varphi+i\sin\varphi)^{-m}=$  
$\frac{1}{\rho^m(\cos\varphi+i\sin\varphi)^m}=\frac{1}{\rho^m(\cos(m\varphi)+i\sin(m\varphi))}=$  
$=\frac{1}{\rho^m}(\cos(m\varphi)-i\sin(m\varphi))=\rho^{-m}(\cos(-m\varphi)+i\sin(-m\varphi))=$  
$=\rho^n(\cos(n\varphi)+i\sin(n\varphi))$  
Kokkuvõtteks:  
$z^n=\rho^n(\cos(n\varphi)+i\sin(n\varphi))\text{,  }n\in \Bbb{Z}$  
  
### Moivre'i valem ja kompleksarvude juurimine  
Erijuhul, kui $\rho=1$, siis  
$z=\cos\varphi+i\sin\varphi$  
ning astendamise valemist järeldub reegel (Moivre'i valem):  
$(\cos\varphi+i\sin\varphi)^n=\cos(n\varphi)+i\sin(n\varphi)$  
Kompleksarvu $z$ **n-astme juureks** ($n \in \Bbb{N}$) nimetatakse niisugust kompleksarvu $\omega$, mille korral $\omega^n=z$, s.o  
$\sqrt[n]{z}=\omega \iff \omega^n=z$  
Olgu  
$z=\rho(\cos\varphi+i\sin\varphi)$ ja $\omega=\rho_1(\cos\varphi_1+i\sin\varphi_1)$  
Siis tingimusest $z=\omega^n$ saame:  
$z=\rho(\cos\varphi+i\sin\varphi)=\rho_1^n(\cos(n\varphi_1)+i\sin(n\varphi_1))=\omega^n$  
Kaks trigonomeetrilisel kujul esitatud kompleksarvu on võrdsed parajasti siis, kui  
* nende kompleksarvude moodulid on võrdsed  
* nende kompleksarvude argumentide vahe on $2\pi$ kordne  
Seega  
$\rho_1^n=\rho\text{,  }n\varphi_1-\varphi=2k\pi\text{, kus } k \in \Bbb{Z}$,  
millest  
$\rho_1=\sqrt[n]{\rho}\text{,  } \varphi_1=\frac{\varphi+2k\pi}{n}\text{, kus } k\in\Bbb{Z}$  
$\varphi_1?\frac{\varphi+2k\pi}{n}\text{, kus }k\in\\{0,1,2,\ldots,n-1,n,n+1,\ldots\\}$  
$k=0\text{   }\varphi_1=\frac{\varphi}{n}$  
$k=1\text{   }\varphi_1=\frac{\varphi+2\pi}{n}$  
$\dots\dots\dots\text{   }\dots\dots\dots\dots\dots\dots$  
$k=n\text{   }\varphi_1=\frac{\varphi+2n\pi}{n}=\frac{\varphi}{n}+2\pi$  
$k=n+1\text{   }\varphi_1=\frac{\varphi+2(n+1)\pi}{n}=\frac{\varphi+2\pi}{n}+2\pi$  
$\dots\dots\dots\text{   }\dots\dots\dots\dots\dots\dots$  
Kokkuvõtteks, kui $z=\rho(\cos\varphi+i\sin\varphi)$, siis  
$\sqrt[n]{z}=\sqrt[n]{\rho}(\cos\frac{\varphi+2k\pi}{n}+i\sin\frac{\varphi+2k\pi}{n})\text{,  }k\in\\{0,1,2,\ldots,n-1\\}$  
  
### Kompleksarvu eksponentkuju  
Matemaatilise analüüsi kursusel näidatakse, et pidevalt diferentseeruv funktioon $f(x)$ on esitatav Maclaurini reana.  
Näiteks:  
$e^x=1+x+\frac{1}{2!}x^2+\frac{1}{3!}x^3+\frac{1}{4!}x^4+\frac{1}{5!}x^5+\ldots=\displaystyle \sum\_{n=0}^\infty \frac{1}{n!}x^n$  
$\cos x=1-\frac{1}{2!}x^2+\frac{1}{4!}x^4-\ldots=\displaystyle \sum\_{n=0}^\infty (-1)^n \frac{x^{2n}}{2n!}$  
$\sin x=x-\frac{1}{3!}x^3+\frac{1}{5!}x^5-\ldots=\displaystyle \sum\_{n=0}^\infty (-1)^n \frac{x^{2n+1}}{(2n+1)!}$  
  
### Euleri valem  
Asendame $e^x$ Maclaurini reas oleva muutuja $x$ imaginaararvuga $i\varphi$, saame kompleksarvude summa:  
$e^{i\varphi}=1+\frac{1}{1!}i\varphi+\frac{1}{2!}(i\varphi)^2+\frac{1}{3!}(i\varphi)^3+\frac{1}{4!}(i\varphi)^4+\frac{1}{5!}(i\varphi)^5+\ldots$  
Teisendame paremal pool oleva kompleksarvu algebralisele kujule  
$e^{i\varphi}=\underbrace{(1-\frac{1}{2!}\varphi^2+\frac{1}{4!}\varphi^4-\ldots)}\_{\cos\varphi}+i\underbrace{(\varphi-\frac{1}{3!}\varphi^3+\frac{1}{5!}\varphi^5-\ldots)}\_{\sin\varphi}$  
Euleri valem  
$e^{i\varphi}=\cos\varphi+i\sin\varphi$  
Kasutades kompleksarvu trigonomeetrilist kuju ja Euleri valemit  
$z=\rho(\cos\varphi+i\sin\varphi)=\rho e^{i\varphi}$  
Kompleksarvu eksponentkuju  
$z=\rho e^{i\varphi}$  
  
### Tehted eksponentkujul antud kompleksarvudega  
Olgu kompleksarvud $z_1$ ja $z_2$ esitatud eksponentkujul:  
$z_1=\rho_1 e^{i\varphi_1}$ ja $z_2=\rho_2 e^{i\varphi_2}$  
$\begin{align} z_1z_2 & = \rho_1\rho_2 e^{i(\varphi_1+\varphi_2)} \\\\
\frac{z_1}{z_2} & = \frac{\rho_1}{\rho_2}e^{i(\varphi_1.\varphi_2)}\text{,  }z_2 \ne 0 \\\\
z^n & = \rho^n e^{in\varphi}\text{,  }n\in\Bbb{Z} \\\\
\sqrt[n]{z} & = \sqrt[n]{\rho}e^{\frac{\varphi+2k\pi}{n}}\text{,  }k\in\{0,1,2,\ldots,n-1\}\end{align}$  

## Ülesanded  
$\text{Kasutades Euleri valemit avaldada }\sin^3 x\text{ kordsete nurkade kaudu}$  
$e^{ix}=\cos x+i\sin x$  
$e^{-ix}=\cos x-i\sin x$  
$\cos x= \frac{1}{2}(e^{ix}+e^{-ix})$  
$\sin x= \frac{1}{2i}(e^{ix}-e^{-ix})$  
  
$\begin{align} sin^3x & = \frac{1}{(2i)^3}(e^{ix}-e^{-ix})^3 \\\\
& = -\frac{1}{8i}(e^{3ix}-3e^{2ix}e^{-ix}+3e^{ix}e^{-2ix}-e^{-3ix}) \\\\
& = \frac{i}{8}(e^{3ix}-3e^{ix}+e^{-ix}-e^{-3ix}) \\\\
& = \frac{i}{8}(\cos 3x + i\sin 3x-3\cos x-3i\sin x+3\cos x-3i\sin x-\cos 3x+i\sin 3x) \\\\
& = \frac{i}{8}(2i\sin 3x-6i\sin x) \\\\
& = \frac{1}{4}(-\sin 3x+3\sin x)\end{align}$  
  
$\sin^3 x=\frac{1}{4}(3\sin x-\sin 3x)$