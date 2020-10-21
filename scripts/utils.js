//Функция открытия и закрытия модалки
export const toggleModal = (modal) => { 
    modal.classList.toggle('modal_is-open');   
    if (modal.classList.contains('modal_is-open') === false){ 
        document.removeEventListener('keydown', closeModalByEsc);
        modal.removeEventListener('click', closeModalByOverlay);         
    } else{                    
        document.addEventListener('keydown', closeModalByEsc);
        modal.addEventListener('click', closeModalByOverlay); 
    } 
} 

//Функция закртыия модалки по клику на оверлей
const closeModalByOverlay = (evt) => {
    if (evt.target.classList.contains('modal__overlay')){
        toggleModal(evt.target.parentElement);        
    }       
};

//Функция закртыия модалки по клику на Esc
const closeModalByEsc = (evt) => {
    const modal = document.querySelector('.modal_is-open')
    if (evt.key === "Escape") {
        toggleModal(modal);        
    };
    
};


