<div class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                         <span aria-hidden="true">&times;</span>
                    </button>
            </div>

            <div class="modal-body">
                <p>Modal body text goes here.</p>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-primary">Save changes</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>


export const func = (parentEl, data)=>{
    const modalParent = document.createElement('DIV');
    const modalDialog = document.createElement('DIV');
    const modalContent = document.createElement('DIV');
    const headerFive = document.createElement('H5');
    const closeModal = document.createElement('BUTTON');
    const closeModalIcon= document.createElement('SPAN');
    const modalBody = document.createElement('DIV');
    const modalFooter = document.createElement('DIV');
    const confirmButton = document.createElement('BUTTON');
    const deniedButton = document.createElement('BUTTON');


    modalParent.className = 'modal';

    modalParent.setAttribute('tabindex', '-1');

    modalParent.setAttribute('role', 'dialog');


    modalDialog.className = 'modal-dialog';

    modalDialog.setAttribute('role', 'document');


    modalContent.className = 'modal-header';


    headerFive.className = 'modal-title';
    headerFive.innerText = data.title;


    closeModal.className = 'close';

    closeModal.setAttribute('type','button');
    closeModal.setAttribute('data-dismiss','modal');
    closeModal.setAttribute('aria-label','Close');


    closeModalIcon.setAttribute = ('aria-hidden','true');

    closeModalIcon.innerHTML = '&times;';


    modalBody.className = 'modal-body';
    modalBody.innerText = data.body;


    modalFooter.className = 'modal-footer';


    confirmButton.className = 'btn btn-primary';
    confirmButton.setAttribute('type','button');
    confirmButton.innerText = 'Yes';



    deniedButton.className = 'btn btn-secondary';
    deniedButton.setAttribute('type','button');
    deniedButton.setAttribute('data-dismiss','modal');
    deniedButton.innerText = 'NO!!!!'


    // modalfooter > modalbody > modaltitle > modalcontent > modaldialog > modal > return modal to func and delete cats append

    
}