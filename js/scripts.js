'use strict'

//-------------------------------------------------------------------------------------------------------------------------------------------//


// FUNÇÃO QUE MOSTRA OU OCULTA O MENU NA VERSÃO MOBILE

const hbMenu = document.querySelector('.hbMenu');
const navMenu = document.querySelector('.navMenu');
const iconClose = document.querySelector('.iconClose');

hbMenu.addEventListener('click', function () {
    navMenu.classList.add('show');
});

iconClose.addEventListener('click', function () {
    navMenu.classList.remove('show');
});





//-------------------------------------------------------------------------------------------------------------------------------------------//


// FUNÇÃO QUE TROCA AS IMAGENS NOS BOTÕES DA VERSÃO MOBILE

const previousIcon = document.querySelector('.previousIcon');
const nextIcon = document.querySelector('.nextIcon');
const product = document.querySelector('.product');

previousIcon.addEventListener('click', function () {
    let currentSrc = getIndexImage();
    currentSrc--;
    if (currentSrc < 1) {
        currentSrc = 4;
    }
    renderImage(currentSrc);
});

nextIcon.addEventListener('click', function () {
    let currentSrc = getIndexImage();
    currentSrc++;
    if (currentSrc > 4) {
        currentSrc = 1;
    }
    renderImage(currentSrc);
});

function getIndexImage(e) {
    let currentSrc = parseFloat(product.src.split('//').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
    return currentSrc;
}

function renderImage(currentSrc) {
    product.src = `./images/image-product-${currentSrc}.jpg`;
}




//-------------------------------------------------------------------------------------------------------------------------------------------//

// FUNÇÃO DAS FOTOS DAS THUMBS

const picThumbs = document.querySelectorAll('.picThumbs');

picThumbs.forEach(element => {
    element.addEventListener('click', function () {
        let currentSrc = parseFloat(element.src.split('//').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
        product.src = `./images/image-product-${currentSrc}.jpg`;

    })

});






//-------------------------------------------------------------------------------------------------------------------------------------------//


// FUNÇÃO DO BOTÃO DE QUANTIDADE DE ITENS QUE AUMENTA OU DIMINUI 

const btnPlus = document.querySelector('.iconPlus');
const btnMinus = document.querySelector('.iconMinus');
const addNumber = document.querySelector('.addNumber');


btnPlus.addEventListener('click', function () {
    const currentValue = parseFloat(addNumber.innerHTML);
    addNumber.innerHTML = currentValue + 1;
});

btnMinus.addEventListener('click', function () {
    const currentValue = parseFloat(addNumber.innerHTML);
    if (currentValue <= 0) {
        addNumber.innerHTML = 0
    } else {
        addNumber.innerHTML = currentValue - 1;

    }
});




//-------------------------------------------------------------------------------------------------------------------------------------------//


// FUNÇÃO QUE ATUALIZA A QUANTIDADE DE ITENS NO CARRINHO DE COMPRAS

const btnAdd = document.querySelector('.btnAdd');
const quantities = document.querySelector('.quantities');
const empty = document.querySelector('.empty');
const productsInCart = document.querySelector('.productsInCart');
const btnCheckout = document.querySelector('.btnCheckout');


btnAdd.addEventListener('click', function () {
    const quantitiesNumber = parseFloat(document.querySelector('.addNumber').innerHTML);
    if (quantitiesNumber === 0) {

        empty.style.display = 'block';
        productsInCart.style.display = 'none';
        btnCheckout.style.display = 'none';
        quantities.innerHTML = "";

    } else {
        quantities.innerHTML = quantitiesNumber;
        empty.style.display = 'none';
        productsInCart.style.display = 'block';
        btnCheckout.style.display = 'block';
    }

    renderCart();

})

function renderCart() {
    const unitsItem = document.querySelector('.unitsItem');
    const totalItem = document.querySelector('.totalItem');
    const priceItem = parseFloat(document.querySelector('.priceItem').innerHTML.replace('$', ''));
    const totalPurchase = "$" + (priceItem * parseFloat(quantities.innerHTML)).toFixed(2);

    unitsItem.innerHTML = parseFloat(quantities.innerHTML);
    totalItem.innerHTML = totalPurchase;
}



//-------------------------------------------------------------------------------------------------------------------------------------------//


// FUNÇÃO QUE DELETA OS ITENS NO CARRINHO DE COMPRAS


const iconDelete = document.querySelector('.iconDelete');

iconDelete.addEventListener('click', removeItem);

function removeItem() {
    const unitsItem = document.querySelector('.unitsItem');
    unitsItem.innerHTML = unitsItem.innerHTML - 1

    if (parseFloat(unitsItem.innerHTML) === 0) {

        empty.style.display = 'block';
        productsInCart.style.display = 'none';
        btnCheckout.style.display = 'none';
        quantities.innerHTML = "";

    } else {
        empty.style.display = 'none';
        productsInCart.style.display = 'block';
        btnCheckout.style.display = 'block';

        const totalItem = document.querySelector('.totalItem');
        const priceItem = parseFloat(document.querySelector('.priceItem').innerHTML.replace('$', ''));
        const totalPurchase = "$" + (priceItem * parseFloat(unitsItem.innerHTML)).toFixed(2);

        totalItem.innerHTML = totalPurchase;

    }
}



//-------------------------------------------------------------------------------------------------------------------------------------------//


// FUNÇÃO QUE MOSTRA OU OCULTA O MODAL DO CARRINHO DE COMPRAS

const divCart = document.querySelector('.divCart');
const containerCart = document.querySelector('.containerCart');


divCart.addEventListener('click', function (e) {
    containerCart.classList.toggle('open');

});




//-------------------------------------------------------------------------------------------------------------------------------------------//

// FUNÇÃO QUE ADICIONA A CONDIÇÃO DE APARECER O BACKGROUND PAGE / MODAL APENAS NA VERSAO DESKTOP

const backgroundPage = document.querySelector('.backgroundPage');
const imgProduct = document.querySelector('.product');
const products = document.querySelector('.products');

imgProduct.addEventListener('click', showBackgroundPage);

function showBackgroundPage() {
    if (window.innerWidth >= 1440) {

        if (backgroundPage.childElementCount == 1) {
            const newMode = products.cloneNode(true);
            backgroundPage.appendChild(newMode);
            const bkgBtnClose = document.querySelector('.bkgBtnClose');
            bkgBtnClose.addEventListener('click', closeBackgroundPage);

            const allPicsThumbsBkg = backgroundPage.querySelectorAll('.picThumbs');

            allPicsThumbsBkg.forEach(element => {
                element.addEventListener('click', renderImageProductBkg)
            });
        }
        backgroundPage.classList.remove('show');
    }

    function renderImageProductBkg(e) {
        let bkgSrcImg = e.target.src.split('//').pop().split('/').pop().replace('.jpg', '').replace('image-product-', '').replace('-thumbnail', '');
        const bkgProductImg = backgroundPage.querySelector('.product');
        bkgProductImg.src = `./images/image-product-${bkgSrcImg}.jpg`;
    }




    //-------------------------------------------------------------------------------------------------------------------------------------------//

    // FUNÇÃO QUE ALTERA AS IMAGENS NSO BOTÕES DO BACKGROUND PAGE / MODAL

    const bkgPreviousIcon = backgroundPage.querySelector('.iconPrevious');
    const bkgNextIcon = backgroundPage.querySelector('.iconNext');

    bkgPreviousIcon.addEventListener('click', function () {
        let currentSrcBkg = getIndexImageBkg();
        currentSrcBkg--
        if (currentSrcBkg < 1) {
            currentSrcBkg = 4;

        }
        renderImageProductBkg2(currentSrcBkg);

    })

    bkgNextIcon.addEventListener('click', function () {
        let currentSrcBkg = getIndexImageBkg();
        currentSrcBkg++
        if (currentSrcBkg > 4) {
            currentSrcBkg = 1;
        }
        renderImageProductBkg2(currentSrcBkg);

    })

    function getIndexImageBkg(e) {
        const bkgProductImg = backgroundPage.querySelector('.product');
        let currentSrcBkg = parseFloat(bkgProductImg.src.split('//').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
        return currentSrcBkg;
    }


    function renderImageProductBkg2(currentSrcBkg) {
        const bkgProductImg = backgroundPage.querySelector('.product');
        bkgProductImg.src = `./images/image-product-${currentSrcBkg}.jpg`;
        chosenPic();
    };

}



//-------------------------------------------------------------------------------------------------------------------------------------------//

// FUNÇÃO QUE FECHA O MODAL / BACKGROUND PAGE

function closeBackgroundPage() {
    backgroundPage.classList.add('show');
}




//-------------------------------------------------------------------------------------------------------------------------------------------//

// FUNÇÃO QUE FORMATA A FOTO DA THUMB ESCOLHIDA

const arrPicThumbs = document.querySelectorAll('.picThumbs');

arrPicThumbs.forEach(pic => {
    pic.addEventListener('click', chosenPic);
});

function chosenPic(e) {
    arrPicThumbs.forEach(pic => {
        pic.classList.remove('chosen')
    });
    e.currentTarget.classList.add('chosen')
}




//-------------------------------------------------------------------------------------------------------------------------------------------//

// FUNÇÃO EFEITO MAQUINA DE ESCREVER NO NOME DO AUTOR DA PAGINA (MEU NOME)

const nameAuthor = document.querySelector('.name');

function typeWriter(el) {
    const textArray = el.innerHTML.split('');
    el.innerHTML = '';

    textArray.forEach((letter, i) => {
        setTimeout(() => (el.innerHTML += letter), 95 * i)
    });
    setInterval(() => typeWriter(el), 8000);
}

typeWriter(nameAuthor);





//-------------------------------------------------------------------------------------------------------------------------------------------//

// FUNÇÃO DO REFRESH DA PAGINA NO LOGO DA EMPRESA


const logoImg = document.querySelector('.logoImg');

logoImg.addEventListener('click', () => {
    location.reload();
});




//-------------------------------------------------------------------------------------------------------------------------------------------//

// FUNÇÃO DO MODO DARK

const imgAvatar = document.querySelector('.imgAvatar');
const body = document.querySelector('body');
const hide = document.querySelector('.hide');

imgAvatar.addEventListener('click', () => {
    body.classList.toggle('dark');
});


imgAvatar.addEventListener('mouseover', function () {
    hide.style.display = 'block';
});

imgAvatar.addEventListener('mouseout', function () {
    hide.style.display = 'none';

});
